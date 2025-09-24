import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Activity from '@/models/Activity';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { status, approvedBy, rejectionReason } = body;
    
    const activity = await Activity.findById(params.id);
    
    if (!activity) {
      return errorResponse('Activity not found', 404);
    }
    
    const updateData: any = { ...body };
    
    if (status === 'Approved') {
      updateData.approvedBy = approvedBy;
      updateData.approvedAt = new Date();
      updateData.rejectionReason = undefined;
    } else if (status === 'Rejected') {
      updateData.rejectionReason = rejectionReason;
      updateData.approvedBy = undefined;
      updateData.approvedAt = undefined;
    }
    
    const updatedActivity = await Activity.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('studentId', 'name studentId email')
      .populate('approvedBy', 'name facultyId');
    
    return successResponse(updatedActivity, 'Activity updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    
    const activity = await Activity.findById(params.id);
    
    if (!activity) {
      return errorResponse('Activity not found', 404);
    }
    
    await Activity.findByIdAndDelete(params.id);
    
    return successResponse(null, 'Activity deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}