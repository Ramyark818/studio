import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
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
            { adminId: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const admins = await Admin.find(filter)
      .select('-password') // Exclude password from results
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Admin.countDocuments(filter);

    return successResponse({
      admins,
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
    const { name, email, password, phone } = body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return errorResponse('Admin with this email already exists', 409);
    }

    // Generate admin ID
    const currentYear = new Date().getFullYear();
    const adminCount = await Admin.countDocuments();
    const adminId = `ADM${currentYear}${(adminCount + 1).toString().padStart(3, '0')}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'admin123', 10);

    // Create admin
    const admin = new Admin({
      adminId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      phone,
    });

    const savedAdmin = await admin.save();

    // Remove password from response
    const adminResponse = savedAdmin.toObject();
    delete adminResponse.password;

    return successResponse(adminResponse, 'Admin created successfully', 201);
  } catch (error) {
    return handleApiError(error);
  }
}
