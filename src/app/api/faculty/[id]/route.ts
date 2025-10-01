import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import User from '@/models/User';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const faculty = await Faculty.findById(id)
      .populate('userId', 'name email avatarUrl');
    
    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }
    
    return successResponse(faculty);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      email,
      department,
      designation,
      expertise,
      qualifications,
      experience,
      contact,
      publications,
      awards,
      joiningDate
    } = body;
    
    // Find existing faculty
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }
    
    // If email is being changed, check if it's already in use
    if (email && email !== faculty.email) {
      const existingFaculty = await Faculty.findOne({ email, _id: { $ne: id } });
      if (existingFaculty) {
        return errorResponse('Email already in use by another faculty member', 409);
      }
      
      // Update user email as well
      await User.findByIdAndUpdate(faculty.userId, { email, name });
    } else if (name) {
      // Update user name if changed
      await User.findByIdAndUpdate(faculty.userId, { name });
    }
    
    // Update faculty
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        name,
        email,
        department,
        designation,
        expertise: expertise || [],
        qualifications: qualifications || [],
        experience: experience || 0,
        contact: contact || faculty.contact,
        publications: publications || [],
        awards: awards || [],
        joiningDate: joiningDate ? new Date(joiningDate) : faculty.joiningDate
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email avatarUrl');
    
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
    
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return errorResponse('Faculty not found', 404);
    }
    
    // Delete associated user
    await User.findByIdAndDelete(faculty.userId);
    
    // Delete faculty
    await Faculty.findByIdAndDelete(id);
    
    return successResponse(null, 'Faculty deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
