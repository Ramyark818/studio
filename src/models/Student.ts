import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  studentId: string;
  name: string;
  email: string;
  password: string;
  role: 'student';
  course: string;
  department: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  feesPaid: boolean;
  caste: string;
  documentsSubmitted: boolean;
  tenthMarks: string;
  twelfthMarks: string;
  cgpa?: number;
  semester?: string;
  enrollmentYear: number;
  avatarUrl?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact?: {
    phone: string;
    emergencyContact: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'student',
      immutable: true,
    },
    course: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    feesPaid: {
      type: Boolean,
      default: false,
    },
    caste: {
      type: String,
      required: true,
    },
    documentsSubmitted: {
      type: Boolean,
      default: false,
    },
    tenthMarks: {
      type: String,
      required: true,
    },
    twelfthMarks: {
      type: String,
      required: true,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },
    semester: {
      type: String,
    },
    enrollmentYear: {
      type: Number,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    contact: {
      phone: String,
      emergencyContact: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
