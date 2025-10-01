import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  credits: number;
  facultyId: mongoose.Types.ObjectId;
  enrolledStudents: mongoose.Types.ObjectId[];
  maxCapacity: number;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    room: string;
  };
  syllabus?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    enrolledStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    schedule: {
      days: [
        {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
      ],
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      room: {
        type: String,
        required: true,
      },
    },
    syllabus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);
