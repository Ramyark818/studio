import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import User from '@/models/User';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const student = await Student.findById(id)
      .populate('userId', 'name email avatarUrl');
    
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
    
    const student = await Student.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email avatarUrl');
    
    if (!student) {
      return errorResponse('Student not found', 404);
    }
    
    // Update user name and email if changed
    if (body.name || body.email) {
      await User.findByIdAndUpdate(student.userId, {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email })
      });
    }
    
    return successResponse(student, 'Student updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const student = await Student.findById(id);
    
    if (!student) {
      return errorResponse('Student not found', 404);
    }
    
    // Delete associated user
    await User.findByIdAndDelete(student.userId);
    
    // Delete student
    await Student.findByIdAndDelete(id);
    
    return successResponse(null, 'Student deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}