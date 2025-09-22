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
  category: 'Conference' | 'Workshop' | 'Certification' | 'Internship' | 'Club Activity' | 'Competition' | 'Volunteering';
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
  icon: LucideIcon;
  active?: boolean;
};

export type Portfolio = {
    user: {
        name: string;
        avatarUrl: string;
        major: string;
        degree: string;
    },
    contact: {
        type: 'LinkedIn' | 'GitHub';
        handle: string;
        url: string;
    }[];
    interests: string[];
    skills: string[];
    achievements: string[];
    projects: string[];
    publications: string[];
    voluntaryWork: string[];
}

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
