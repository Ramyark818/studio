import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    const student = await Student.findById(id).select('-password');

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    return successResponse(student);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    // If password is being updated, hash it
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    // Check if email is being changed and if it's already in use
    if (body.email) {
      const existingStudent = await Student.findOne({
        email: body.email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingStudent) {
        return errorResponse('Email already in use', 409);
      }
      body.email = body.email.toLowerCase();
    }

    const student = await Student.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    return successResponse(student, 'Student updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    return successResponse(null, 'Student deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
