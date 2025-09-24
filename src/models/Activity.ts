import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  studentId: mongoose.Types.ObjectId;
  title: string;
  category: 'Conference' | 'Workshop' | 'Certification' | 'Internship' | 'Club Activity' | 'Competition' | 'Volunteering' | 'Other';
  description: string;
  date: Date;
  credits: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  fileUrl?: string;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Conference', 'Workshop', 'Certification', 'Internship', 'Club Activity', 'Competition', 'Volunteering', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Pending'
  },
  fileUrl: {
    type: String
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  approvedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);