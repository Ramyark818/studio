import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { getUserFromRequest, getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Try to get user from middleware headers first, then from token
    let user = getUserFromRequest(request);

    if (!user) {
      user = getUserFromToken(request);
    }

    if (!user) {
      return errorResponse('Authentication required', 401);
    }

    let student;

    if (user.role === 'admin') {
      // Admin can view any student portfolio by providing studentId in query params
      const { searchParams } = new URL(request.url);
      const studentId = searchParams.get('studentId');

      if (studentId) {
        student = await Student.findById(studentId).populate('userId');
      } else {
        return errorResponse('Student ID required for admin access', 400);
      }
    } else if (user.role === 'student') {
      // Students can only view their own portfolio
      student = await Student.findOne({ userId: user.userId }).populate('userId');
    } else {
      return errorResponse('Access denied', 403);
    }

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    // Transform student data to portfolio format
    const portfolio = {
      id: student._id,
      user: {
        name: student.name,
        major: student.course,
        degree: student.course,
        email: student.email,
        avatarUrl: student.userId?.avatarUrl,
      },
      summary: `${student.course} student at ${student.department} with ${student.cgpa} CGPA`,
      contact: [
        { type: 'Email', handle: student.email },
        { type: 'Phone', handle: student.contact?.phone || '' },
        {
          type: 'Address',
          handle: `${student.address?.street || ''}, ${student.address?.city || ''}`,
        },
      ],
      education: [
        {
          degree: student.course,
          school: student.department,
          year: student.enrollmentYear,
          gpa: student.cgpa,
        },
      ],
      skills: [
        {
          category: 'Academic',
          skills: [`10th Marks: ${student.tenthMarks}`, `12th Marks: ${student.twelfthMarks}`],
        },
      ],
      projects: [],
      certifications: [],
      awards: [],
      interests: [],
      languages: [],
      voluntaryWork: [],
      publications: [],
    };

    return successResponse(portfolio, 'Portfolio retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Try to get user from middleware headers first, then from token
    let user = getUserFromRequest(request);

    if (!user) {
      user = getUserFromToken(request);
    }

    if (!user) {
      return errorResponse('Authentication required', 401);
    }

    const portfolioData = await request.json();

    let student;

    if (user.role === 'admin') {
      // Admin can update any student portfolio by providing studentId
      const studentId = portfolioData.studentId;
      if (!studentId) {
        return errorResponse('Student ID required for admin updates', 400);
      }
      student = await Student.findById(studentId);
    } else if (user.role === 'student') {
      // Students can only update their own portfolio
      student = await Student.findOne({ userId: user.userId });
    } else {
      return errorResponse('Access denied', 403);
    }

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    // Update student fields from portfolio data
    const updateData: any = {};

    if (portfolioData.name) updateData.name = portfolioData.name;
    if (portfolioData.email) updateData.email = portfolioData.email;
    if (portfolioData.major || portfolioData.course) {
      updateData.course = portfolioData.major || portfolioData.course;
      updateData.department = portfolioData.major || portfolioData.course;
    }

    // Update contact information
    if (portfolioData.phone && student.contact) {
      updateData['contact.phone'] = portfolioData.phone;
    }

    // Update address information
    if (portfolioData.address && student.address) {
      const addressParts = portfolioData.address.split(', ');
      if (addressParts.length >= 2) {
        updateData['address.street'] = addressParts[0];
        updateData['address.city'] = addressParts[1];
      }
    }

    // Update the student record
    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('userId');

    if (!updatedStudent) {
      return errorResponse('Failed to update portfolio', 500);
    }

    return successResponse(
      {
        studentId: updatedStudent._id,
        message: 'Portfolio updated successfully',
        updatedFields: Object.keys(updateData),
      },
      'Portfolio updated successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
