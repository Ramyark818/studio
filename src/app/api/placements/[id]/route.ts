import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Placement from '@/models/Placement';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    const placement = await Placement.findById(id);

    if (!placement) {
      return errorResponse('Placement not found', 404);
    }

    return successResponse(placement);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const placement = await Placement.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!placement) {
      return errorResponse('Placement not found', 404);
    }

    return successResponse(placement, 'Placement updated successfully');
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

    const placement = await Placement.findById(id);

    if (!placement) {
      return errorResponse('Placement not found', 404);
    }

    await Placement.findByIdAndDelete(id);

    return successResponse(null, 'Placement deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
