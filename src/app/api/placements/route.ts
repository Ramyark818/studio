import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Placement from '@/models/Placement';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { jobDescription: { $regex: search, $options: 'i' } },
        { recruitingBranches: { $regex: search, $options: 'i' } }
      ];
    }
    
    const placements = await Placement.find(filter)
      .populate('createdBy', 'name email')
      .populate('appliedStudents', 'name studentId')
      .populate('selectedStudents', 'name studentId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Placement.countDocuments(filter);
    
    return successResponse({
      placements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const placement = new Placement({
      ...body,
      driveDate: new Date(body.driveDate),
      applicationDeadline: new Date(body.applicationDeadline),
      appliedStudents: [],
      selectedStudents: []
    });
    
    const savedPlacement = await placement.save();
    await savedPlacement.populate('createdBy', 'name email');
    
    return successResponse(savedPlacement, 'Placement created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}