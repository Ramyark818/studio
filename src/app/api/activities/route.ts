import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Activity from '@/models/Activity';
import Student from '@/models/Student';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (studentId) {
      filter.studentId = studentId;
    }

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    const activities = await Activity.find(filter)
      .populate('studentId', 'name studentId email')
      .populate('approvedBy', 'name facultyId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Activity.countDocuments(filter);

    return successResponse({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { studentId, title, category, description, date, credits, fileUrl } = body;

    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return errorResponse('Student not found', 404);
    }

    const activity = new Activity({
      studentId,
      title,
      category,
      description,
      date: new Date(date),
      credits,
      fileUrl,
      status: 'Pending',
      submittedAt: new Date(),
    });

    const savedActivity = await activity.save();
    await savedActivity.populate('studentId', 'name studentId email');

    return successResponse(savedActivity, 'Activity submitted successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
