import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  userId: mongoose.Types.ObjectId;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  expertise: string[];
  qualifications: string[];
  experience: number;
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

const FacultySchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  facultyId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  expertise: [{
    type: String
  }],
  qualifications: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    office: {
      type: String,
      required: true
    }
  },
  publications: [{
    type: String
  }],
  awards: [{
    type: String
  }],
  joiningDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);