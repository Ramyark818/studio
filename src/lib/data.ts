import type { User, Activity, PerformanceData, Portfolio, FacultyClass, FacultyProfile, ClassStudent, Placement } from './types';

export const mockUser: User = {
  name: 'Jane Doe',
  email: 'jane.doe@sankalan.com',
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
      type: 'Email',
      handle: 'demo.student@sankalan.com',
      url: 'mailto:demo.student@sankalan.com',
    },
    {
      type: 'Phone',
      handle: '+91-9876543210',
      url: 'tel:+91-9876543210',
    },
    {
      type: 'Address',
      handle: '123 University Ave, Tech City',
      url: '#',
    },
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
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
  awards: ["Hackathon Winner: Best Use of AI", "Dean's List 2023", "Top Performer Award 2022"],
  certifications: ["Google Cloud Certified - Associate Cloud Engineer", "Certified Kubernetes Application Developer"],
  projects: ['Community Food Bank App', 'AI-Powered Resume Builder'],
  publications: ['The Future of AI in Higher Education, J. of EdTech'],
  voluntaryWork: ['Local Animal Shelter Volunteer', 'Code for Change Mentor'],
};

export const mockFacultyClasses: FacultyClass[] = [
  { courseCode: 'CS450', courseName: 'Advanced Algorithms', enrolledStudents: 35, semester: 'Fall 2024' },
  { courseCode: 'CS210', courseName: 'Data Structures', enrolledStudents: 42, semester: 'Fall 2024' },
  { courseCode: 'CS555', courseName: 'Machine Learning', enrolledStudents: 20, semester: 'Fall 2024' },
  { courseCode: 'CS101', courseName: 'Intro to Programming', enrolledStudents: 15, semester: 'Fall 2024' },
];

export const mockFacultyProfile: FacultyProfile = {
  name: 'Dr. Alan Grant',
  title: 'Professor, Department of Computer Science',
  avatarUrl: 'https://picsum.photos/seed/faculty1/200/200',
  email: 'alan.grant@sankalan.com',
  phone: '123-456-7890',
  office: 'Building 4, Room 301',
  expertise: ['Algorithms', 'Data Structures', 'Computational Theory', 'Machine Learning'],
  publications: [
    'A New Approach to Dynamic Programming, Journal of CS, 2023',
    'Complexity Theory Revisited, ACM Transactions, 2022',
  ],
  awards: [
    'Excellence in Teaching Award, 2021',
    'Best Paper Award, Int. Conference on Algorithms, 2020',
  ],
};

export const mockAdminProfile: FacultyProfile = {
    name: 'Mr. John Doe',
    title: 'System Administrator',
    avatarUrl: 'https://picsum.photos/seed/admin1/200/200',
    email: 'admin@sankalan.com',
    phone: '987-654-3210',
    office: 'Admin Block, Room 101',
    expertise: ['System Administration', 'Network Security', 'Database Management'],
    publications: [],
    awards: ['Employee of the Year, 2022'],
};

export const mockClassStudents: ClassStudent[] = [
  { id: 'STU001', name: 'Alice Johnson' },
  { id: 'STU002', name: 'Bob Williams' },
  { id: 'STU003', name: 'Charlie Brown' },
  { id: 'STU004', name: 'Diana Miller' },
  { id: 'STU005', name: 'Ethan Davis' },
];

export const mockFacultyList = [
    { id: 'FAC001', name: 'Dr. Alan Grant', department: 'Computer Science' },
    { id: 'FAC002', name: 'Dr. Ellie Sattler', department: 'Mechanical Engineering' },
    { id: 'FAC003', name: 'Dr. Ian Malcolm', department: 'Electrical Engineering' },
    { id: 'FAC004', name: 'Dr. John Hammond', department: 'Civil Engineering' },
    { id: 'FAC005', name: 'Dr. Henry Wu', department: 'Business' },
];

export const mockPlacements: Placement[] = [
    {
      id: 'PLC001',
      companyName: 'Tech Innovators Inc.',
      jobDescription: 'Software Development Engineer',
      recruitingBranches: 'CS, IT, ECE',
      vacancies: 5,
      requiredSkills: ['React', 'Node.js', 'Python'],
      recruitmentProcess: 'Online Test, Technical Interview, HR Interview',
      requiredCgpa: 7.5,
      backlogsAllowed: false,
      driveDate: '2024-10-15',
    },
    {
      id: 'PLC002',
      companyName: 'Data Solutions LLC',
      jobDescription: 'Data Analyst',
      recruitingBranches: 'All Branches',
      vacancies: 3,
      requiredSkills: ['SQL', 'Tableau', 'Statistics'],
      recruitmentProcess: 'Aptitude Test, Group Discussion, Interview',
      requiredCgpa: 6.5,
      backlogsAllowed: true,
      driveDate: '2024-10-20',
    },
];
