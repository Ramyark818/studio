import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
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
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return errorResponse('Invalid credentials', 401);
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return errorResponse('Invalid credentials', 401);
    }
    
    // Get additional profile data based on role
    let profileData = null;
    
    if (user.role === 'student') {
      profileData = await Student.findOne({ userId: user._id });
    } else if (user.role === 'faculty') {
      profileData = await Faculty.findOne({ userId: user._id });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
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
        role: user.role,
        avatarUrl: user.avatarUrl
      },
      profile: profileData
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
    demoCredentials: {
      admin: { email: 'admin@sankalan.com', password: 'admin123' },
      faculty: { email: 'faculty@sankalan.com', password: 'faculty123' },
      student: { email: 'student@sankalan.com', password: 'student123' }
    }
  });
}