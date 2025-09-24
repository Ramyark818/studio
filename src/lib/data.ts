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
    name: 'Lakshminarayana BG',
    avatarUrl: 'https://picsum.photos/seed/avatar2/200/200',
    major: 'Electronics and Communication',
    degree: 'Bachelor of Engineering',
  },
  summary: "Pursuing a Bachelor's degree in Electronics and Communication at University BDT College of Engineering, with a solid grounding in emerging technologies. Demonstrates proficiency in web development, Industrial IoT, Cloud Computing and Generative AI, complemented by hands-on project experience. Committed to applying technical expertise to develop innovative solutions in fast-paced, technology-focused environments.",
  education: [
      {
          institution: "University BDT College of Engineering",
          degree: "Bachelor of Engineering",
          period: "December 2023 - present",
          details: "Electronics and Communication - 8.033 CGPA"
      },
      {
          institution: "Government Polytechnic College, Harihar",
          degree: "Diploma",
          period: "December 2020 - August 2023",
          details: "Electronics and Communication - 9.2 CGPA"
      },
      {
          institution: "MKET's LK High School, Harihar",
          degree: "SSLC",
          period: "May 2017 - September 2020",
          details: "92.6%"
      }
  ],
  contact: [
     {
      type: 'Email',
      handle: 'lnbg720@gmail.com',
      url: 'mailto:lnbg720@gmail.com',
    },
    {
      type: 'Phone',
      handle: '+91-7204000742',
      url: 'tel:+917204000742',
    },
    {
      type: 'Address',
      handle: 'Harihar, Davangere - 577601',
      url: '#',
    },
    {
      type: 'LinkedIn',
      handle: 'in/lnbg',
      url: 'https://linkedin.com/in/lnbg',
    },
    {
      type: 'GitHub',
      handle: 'bgmanu2426',
      url: 'https://github.com/bgmanu2426',
    },
     {
      type: 'Website',
      handle: 'https://lnbg.in',
      url: 'https://lnbg.in',
    },
    {
      type: 'Other',
      handle: 'bgmanu',
      url: '#',
    }
  ],
  interests: ['Playing Chess', 'Playing video games or E-Sports'],
  skills: [
    {
        category: 'Backend Development',
        skills: ['Nodejs', 'Expressjs', 'Flask', 'FastAPI', 'MySQL', 'MongoDB', 'Django', 'Redis', 'Bunjs']
    },
    {
        category: 'Frontend Development',
        skills: ['JavaScript', 'TypeScript', 'Reactjs', 'TailwindCSS', 'ShadCn', 'Nextjs']
    },
    {
        category: 'Generative AI',
        skills: ['LangChain', 'LangGraph', 'LangFuse', 'MCP', 'OpenAI', 'QdrantDB', 'Neo4j', 'GuardRails']
    },
    {
        category: 'Industrial Internet of Things',
        skills: ['Arduino', 'Espressif', 'Raspberry Pi', 'Network Protocols', 'AWS', 'Azure']
    }
  ],
  awards: ["Pratibha Puraskara - 2021 (KAVMS)", "Pratibha Puraskara - 2023 (KAVMS)", "VTU Yukti (Quiz) - Winner (VTU Belagavi)"],
  certifications: ["Generative AI using Python (ChaiCode, May 2025)", "Introduction To Industry 4.0 and Industrial Internet Of Things (NPTEL, May 2025)", "Geoprocessing using Python (Indian Institute of Remote Sensing - ISRO, August 2023)"],
  projects: ['Smart Library Management System - Developed a Smart Library Management System with RFID authentication, MH-ET3 Live barcode scanning, and an intuitive web interface for streamlined inventory and resource management.', 'AI based SGPA and CGPA calculator - Developed an AI-powered web and mobile app for SGPA calculation under the VTU scheme, utilizing OCR for accurate text extraction and generating detailed, visually appealing reports.'],
  publications: [],
  voluntaryWork: ['UBDT College of Engineering - Joint Secretary (Technical) (January 2025 - September 2025)'],
  languages: [
      { name: 'Kannada', proficiency: 'Native or bilingual proficiency'},
      { name: 'English', proficiency: 'Professional working proficiency'},
      { name: 'Hindi', proficiency: 'Professional working proficiency'},
  ]
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
