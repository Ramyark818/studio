import type { User, Activity, PerformanceData, Portfolio } from './types';

export const mockUser: User = {
  name: 'Jane Doe',
  email: 'jane.doe@university.edu',
  avatarUrl: 'https://picsum.photos/seed/avatar1/200/200',
  course: 'B.Tech in Computer Science',
  department: 'School of Engineering',
};

export const mockActivities: Activity[] = [
  {
    id: 'act001',
    title: 'International Conference on AI',
    category: 'Conference',
    date: '2023-10-15',
    credits: 15,
    status: 'Approved',
    description: 'Presented a paper on novel neural network architectures.',
    fileUrl: '#',
  },
  {
    id: 'act002',
    title: 'Web Development Bootcamp',
    category: 'Workshop',
    date: '2023-07-22',
    credits: 10,
    status: 'Approved',
    description: 'Completed a 4-week intensive workshop on MERN stack.',
  },
  {
    id: 'act003',
    title: 'Google Cloud Certified',
    category: 'Certification',
    date: '2024-01-05',
    credits: 20,
    status: 'Approved',
    description: 'Associate Cloud Engineer certification.',
  },
  {
    id: 'act004',
    title: 'Summer Internship at TechCorp',
    category: 'Internship',
    date: '2023-08-30',
    credits: 40,
    status: 'Approved',
    description: 'Worked as a software developer intern on the core product team.',
    fileUrl: '#',
  },
  {
    id: 'act005',
    title: 'Hackathon: Code for Good',
    category: 'Competition',
    date: '2023-11-12',
    credits: 10,
    status: 'Pending',
    description: 'Participated in a 24-hour hackathon, awaiting results and certificate.',
  },
  {
    id: 'act006',
    title: 'Robotics Club Secretary',
    category: 'Club Activity',
    date: '2023-09-01',
    credits: 5,
    status: 'Approved',
    description: 'Elected as the secretary for the academic year 2023-24.',
  },
  {
    id: 'act007',
    title: 'Community Tree Plantation Drive',
    category: 'Volunteering',
    date: '2024-03-20',
    credits: 5,
    status: 'Rejected',
    description: 'Participated in a local community service event. Uploaded incorrect documentation.',
  },
  {
    id: 'act008',
    title: 'National Design Challenge',
    category: 'Competition',
    date: '2024-02-18',
    credits: 15,
    status: 'Pending',
    description: 'Submitted a project for the National Design Challenge organized by the Ministry of Education.',
  },
];

export const mockPerformance: PerformanceData[] = [
  { semester: 'Sem 1', sgpa: 8.5, cgpa: 8.5 },
  { semester: 'Sem 2', sgpa: 8.8, cgpa: 8.65 },
  { semester: 'Sem 3', sgpa: 9.1, cgpa: 8.8 },
  { semester: 'Sem 4', sgpa: 8.9, cgpa: 8.82 },
  { semester: 'Sem 5', sgpa: 9.3, cgpa: 8.92 },
  { semester: 'Sem 6', sgpa: 9.5, cgpa: 9.01 },
];

export const mockPortfolio: Portfolio = {
  user: {
    name: 'Demo Student',
    avatarUrl: 'https://picsum.photos/seed/avatar2/200/200',
    major: 'Computer Science Major',
    degree: 'Bachelor of Science in Computer Science',
  },
  contact: [
    {
      type: 'LinkedIn',
      handle: 'linkedin.com/in/demostudent',
      url: 'https://linkedin.com/in/demostudent',
    },
    {
      type: 'GitHub',
      handle: 'github.com/demostudent',
      url: 'https://github.com/demostudent',
    },
  ],
  interests: ['AI in Education', 'Hiking', 'Chess'],
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  achievements: ["Hackathon Winner: Best Use of AI", "Dean's List 2023"],
  projects: ['Community Food Bank App'],
  publications: ['The Future of AI in Higher Education, J. of EdTech'],
  voluntaryWork: ['Local Animal Shelter Volunteer'],
};
