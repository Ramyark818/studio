import { NextRequest } from 'next/server';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import seedDatabase from '@/scripts/seed-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { confirmSeed } = body;
    
    if (!confirmSeed) {
      return errorResponse('Please confirm database seeding by setting confirmSeed to true', 400);
    }
    
    await seedDatabase();
    
    return successResponse(
      {
        message: 'Database seeded successfully',
        loginCredentials: {
          admin: { email: 'admin@sankalan.com', password: 'admin123' },
          faculty: { email: 'faculty@sankalan.com', password: 'faculty123' },
          student: { email: 'student@sankalan.com', password: 'student123' }
        }
      },
      'Database seeded with demo data successfully',
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  return successResponse({
    message: 'Database seeding endpoint',
    instructions: 'Send a POST request with { "confirmSeed": true } to seed the database with demo data',
    warning: 'This will clear all existing data and replace it with demo data'
  });
}