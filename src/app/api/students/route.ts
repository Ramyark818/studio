import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
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
            { studentId: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    
    const students = await Student.find(filter)
      .populate('userId', 'name email avatarUrl')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Student.countDocuments(filter);
    
    return successResponse({
      students,
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
      course,
      department,
      dateOfBirth,
      gender,
      caste,
      tenthMarks,
      twelfthMarks,
      feesPaid = false,
      documentsSubmitted = false,
      enrollmentYear,
      address,
      contact
    } = body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('User with this email already exists', 409);
    }
    
    // Generate student ID
    const currentYear = new Date().getFullYear();
    const studentCount = await Student.countDocuments();
    const studentId = `STU${currentYear}${(studentCount + 1).toString().padStart(4, '0')}`;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'student123', 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });
    
    const savedUser = await user.save();
    
    // Create student
    const student = new Student({
      userId: savedUser._id,
      studentId,
      name,
      email,
      course,
      department,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      caste,
      tenthMarks,
      twelfthMarks,
      feesPaid,
      documentsSubmitted,
      enrollmentYear: enrollmentYear || currentYear,
      address,
      contact
    });
    
    const savedStudent = await student.save();
    await savedStudent.populate('userId', 'name email avatarUrl');
    
    return successResponse(savedStudent, 'Student created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}