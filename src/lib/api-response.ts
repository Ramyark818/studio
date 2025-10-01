import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export function successResponse<T>(
  data: T,
  message = 'Operation successful',
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status = 400,
  error?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}

export function handleApiError(error: any): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error.name === 'ValidationError') {
    return errorResponse('Validation failed', 400, error.message);
  }

  if (error.code === 11000) {
    return errorResponse('Duplicate entry found', 409, 'Resource already exists');
  }

  return errorResponse('Internal server error', 500, error.message);
}
