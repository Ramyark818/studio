import mongoose, { Schema, Document } from 'mongoose';

export interface IPlacement extends Document {
  companyName: string;
  jobDescription: string;
  recruitingBranches: string[];
  vacancies: number;
  requiredSkills: string[];
  recruitmentProcess: string;
  requiredCgpa: number;
  backlogsAllowed: boolean;
  driveDate: Date;
  applicationDeadline: Date;
  packageOffered: {
    min: number;
    max: number;
  };
  jobLocation: string[];
  eligibilityCriteria: string[];
  companyWebsite?: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  appliedStudents: mongoose.Types.ObjectId[];
  selectedStudents?: mongoose.Types.ObjectId[];
  status: 'Active' | 'Completed' | 'Cancelled';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PlacementSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  recruitingBranches: [{
    type: String,
    required: true
  }],
  vacancies: {
    type: Number,
    required: true,
    min: 1
  },
  requiredSkills: [{
    type: String,
    required: true
  }],
  recruitmentProcess: {
    type: String,
    required: true
  },
  requiredCgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  backlogsAllowed: {
    type: Boolean,
    default: false
  },
  driveDate: {
    type: Date,
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  packageOffered: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  jobLocation: [{
    type: String,
    required: true
  }],
  eligibilityCriteria: [{
    type: String
  }],
  companyWebsite: {
    type: String
  },
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  appliedStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  selectedStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Placement || mongoose.model<IPlacement>('Placement', PlacementSchema);