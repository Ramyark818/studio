import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    const admin = await Admin.findById(id).select('-password');

    if (!admin) {
      return errorResponse('Admin not found', 404);
    }

    return successResponse(admin);
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
      const existingAdmin = await Admin.findOne({
        email: body.email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingAdmin) {
        return errorResponse('Email already in use', 409);
      }
      body.email = body.email.toLowerCase();
    }

    const admin = await Admin.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!admin) {
      return errorResponse('Admin not found', 404);
    }

    return successResponse(admin, 'Admin updated successfully');
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

    // Check if this is the last admin
    const adminCount = await Admin.countDocuments();
    if (adminCount <= 1) {
      return errorResponse('Cannot delete the last admin account', 403);
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return errorResponse('Admin not found', 404);
    }

    return successResponse(null, 'Admin deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
