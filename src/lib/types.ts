import type { LucideIcon } from 'lucide-react';

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  course: string;
  department: string;
};

export type ActivityStatus = 'Approved' | 'Pending' | 'Rejected';

export type Activity = {
  id: string;
  title: string;
  category:
    | 'Conference'
    | 'Workshop'
    | 'Certification'
    | 'Internship'
    | 'Club Activity'
    | 'Competition'
    | 'Volunteering'
    | 'Other';
  date: string;
  credits: number;
  status: ActivityStatus;
  description: string;
  fileUrl?: string;
};

export type PerformanceData = {
  semester: string;
  sgpa: number;
  cgpa: number;
};

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  details: string;
};

export type CategorizedSkills = {
  category: string;
  skills: string[];
};

export type Language = {
  name: string;
  proficiency: string;
};

export type Portfolio = {
  user: {
    name: string;
    avatarUrl: string;
    major: string;
    degree: string;
  };
  summary: string;
  education: Education[];
  contact: {
    type: 'LinkedIn' | 'GitHub' | 'Email' | 'Phone' | 'Address' | 'Website' | 'Other';
    handle: string;
    url: string;
  }[];
  interests: string[];
  skills: CategorizedSkills[];
  awards: string[];
  certifications: string[];
  projects: string[];
  publications: string[];
  voluntaryWork: string[];
  languages: Language[];
};

export type FacultyClass = {
  courseCode: string;
  courseName: string;
  enrolledStudents: number;
  semester: string;
};

export type FacultyProfile = {
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  phone: string;
  office: string;
  expertise: string[];
  publications: string[];
  awards: string[];
};

export type ClassStudent = {
  id: string;
  name: string;
};

export type Student = ClassStudent & {
  course: string;
  dateOfBirth: string;
  feesPaid: boolean;
  caste: string;
  gender: 'Male' | 'Female' | 'Other';
  documentsSubmitted: boolean;
  tenthMarks: string;
  twelfthMarks: string;
};

export type Faculty = {
  id: string;
  name: string;
  department: string;
};

export type Placement = {
  id: string;
  companyName: string;
  jobDescription: string;
  recruitingBranches: string;
  vacancies: number;
  requiredSkills: string[];
  recruitmentProcess: string;
  requiredCgpa: number;
  backlogsAllowed: boolean;
  driveDate: string;
};
