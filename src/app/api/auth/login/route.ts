import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import Student from '@/models/Student';
import Faculty from '@/models/Faculty';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    const emailLower = email.toLowerCase();

    // Try to find admin first
    let user = await Admin.findOne({ email: emailLower });
    let role = 'admin';

    // If not found, try to find student
    if (!user) {
      user = await Student.findOne({ email: emailLower });
      role = 'student';
    }

    // If not found, try to find faculty
    if (!user) {
      user = await Faculty.findOne({ email: emailLower });
      role = 'faculty';
    }

    if (!user) {
      return errorResponse('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: role,
        name: user.name,
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Prepare response data
    const responseData = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
        avatarUrl: user.avatarUrl,
      },
    };

    return successResponse(responseData, 'Login successful');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  return successResponse({
    message: 'Authentication endpoint',
    instructions: 'Send a POST request with email and password to login',
    note: 'Admin, student, and faculty accounts must be created through the admin panel or database seeding',
  });
}
