import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import User from '@/models/User';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const filter = search 
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { facultyId: { $regex: search, $options: 'i' } },
            { department: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    
    const faculty = await Faculty.find(filter)
      .populate('userId', 'name email avatarUrl')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Faculty.countDocuments(filter);
    
    return successResponse({
      faculty,
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
      joiningDate
    } = body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('User with this email already exists', 409);
    }
    
    // Generate faculty ID
    const currentYear = new Date().getFullYear();
    const facultyCount = await Faculty.countDocuments();
    const facultyId = `FAC${currentYear}${(facultyCount + 1).toString().padStart(3, '0')}`;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'faculty123', 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'faculty'
    });
    
    const savedUser = await user.save();
    
    // Create faculty
    const faculty = new Faculty({
      userId: savedUser._id,
      facultyId,
      name,
      email,
      department,
      designation,
      expertise: expertise || [],
      qualifications: qualifications || [],
      experience: experience || 0,
      contact: contact || {},
      publications: publications || [],
      awards: awards || [],
      joiningDate: new Date(joiningDate || Date.now())
    });
    
    const savedFaculty = await faculty.save();
    await savedFaculty.populate('userId', 'name email avatarUrl');
    
    return successResponse(savedFaculty, 'Faculty created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}