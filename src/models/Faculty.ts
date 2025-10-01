import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  facultyId: string;
  name: string;
  email: string;
  password: string;
  role: 'faculty';
  department: string;
  designation: string;
  expertise: string[];
  qualifications: string[];
  experience: number;
  avatarUrl?: string;
  contact: {
    phone: string;
    office: string;
  };
  publications?: string[];
  awards?: string[];
  joiningDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema: Schema = new Schema(
  {
    facultyId: {
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
      default: 'faculty',
      immutable: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    expertise: [
      {
        type: String,
      },
    ],
    qualifications: [
      {
        type: String,
        required: true,
      },
    ],
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    avatarUrl: {
      type: String,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      office: {
        type: String,
        required: true,
      },
    },
    publications: [
      {
        type: String,
      },
    ],
    awards: [
      {
        type: String,
      },
    ],
    joiningDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
