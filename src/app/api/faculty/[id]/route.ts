import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    const faculty = await Faculty.findById(id).select('-password');

    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }

    return successResponse(faculty);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      email,
      password,
      department,
      designation,
      expertise,
      qualifications,
      experience,
      contact,
      publications,
      awards,
      joiningDate,
    } = body;

    // Find existing faculty
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }

    // If email is being changed, check if it's already in use
    if (email && email.toLowerCase() !== faculty.email) {
      const existingFaculty = await Faculty.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingFaculty) {
        return errorResponse('Email already in use by another faculty member', 409);
      }
    }

    // Hash password if provided
    const updateData: any = {
      name,
      email: email?.toLowerCase(),
      department,
      designation,
      expertise: expertise || [],
      qualifications: qualifications || [],
      experience: experience || 0,
      contact: contact || faculty.contact,
      publications: publications || [],
      awards: awards || [],
      joiningDate: joiningDate ? new Date(joiningDate) : faculty.joiningDate,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update faculty
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    return successResponse(updatedFaculty, 'Faculty updated successfully');
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

    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }

    return successResponse(null, 'Faculty deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
