import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import Admin from '../models/Admin';
import Faculty from '../models/Faculty';
import Student from '../models/Student';
import Activity from '../models/Activity';
import ClassModel from '../models/Class';
import Placement from '../models/Placement';

dotenv.config({ path: '.env.local' });

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ Missing MONGODB_URI in environment variables.');
  process.exit(1);
}

const uri = mongoUri as string;

const adminSeedData = [
  {
    adminId: 'ADM2025001',
    name: 'System Administrator',
    email: 'admin@sankalan.com',
    password: 'admin123',
    phone: '+91-9000000000',
    avatarUrl: 'https://picsum.photos/seed/admin1/200/200',
  },
];

const facultySeedBase = [
  {
    facultyId: 'FAC2025001',
    name: 'Prof. Priya Sharma',
    email: 'faculty@sankalan.com',
    department: 'Computer Science',
    designation: 'Professor',
    expertise: ['Machine Learning', 'Data Science', 'Artificial Intelligence'],
    qualifications: ['Ph.D. Computer Science', 'M.Tech Computer Science'],
    experience: 12,
    contact: { phone: '+91-9876543210', office: 'CS-301' },
    publications: [
      'Machine Learning in Healthcare: A Comprehensive Review',
      'Deep Learning for Natural Language Processing',
      'AI Ethics and Social Implications',
    ],
    awards: ['Best Teacher Award 2024', 'Research Excellence Award 2023'],
    joiningDate: new Date('2012-07-01'),
  },
  {
    facultyId: 'FAC2025002',
    name: 'Dr. Amit Patel',
    email: 'amit.patel@sankalan.com',
    department: 'Electronics and Communication',
    designation: 'Associate Professor',
    expertise: ['Digital Signal Processing', 'VLSI Design', 'Embedded Systems'],
    qualifications: ['Ph.D. Electronics', 'M.E. Electronics'],
    experience: 9,
    contact: { phone: '+91-9876543211', office: 'EC-201' },
    publications: ['Advanced VLSI Design Techniques', 'IoT Applications in Smart Cities'],
    awards: ['Innovation Award 2024'],
    joiningDate: new Date('2016-08-15'),
  },
  {
    facultyId: 'FAC2025003',
    name: 'Dr. Neha Agarwal',
    email: 'neha.agarwal@sankalan.com',
    department: 'Information Technology',
    designation: 'Associate Professor',
    expertise: ['Cloud Computing', 'DevOps', 'Distributed Systems'],
    qualifications: ['Ph.D. Information Technology', 'M.Tech Information Technology'],
    experience: 10,
    contact: { phone: '+91-9876543212', office: 'IT-105' },
    publications: ['Scalable Cloud Architectures', 'DevOps Automation Strategies'],
    awards: ['Outstanding Researcher 2022'],
    joiningDate: new Date('2014-01-10'),
  },
  {
    facultyId: 'FAC2025004',
    name: 'Prof. Vikram Sinha',
    email: 'vikram.sinha@sankalan.com',
    department: 'Mechanical Engineering',
    designation: 'Professor',
    expertise: ['Thermal Engineering', 'Robotics'],
    qualifications: ['Ph.D. Mechanical Engineering', 'M.Tech Mechanical Engineering'],
    experience: 15,
    contact: { phone: '+91-9876543213', office: 'ME-210' },
    publications: ['Advanced Robotics in Manufacturing', 'Thermal Systems Optimization'],
    awards: ['Lifetime Achievement Award 2023'],
    joiningDate: new Date('2010-05-20'),
  },
  {
    facultyId: 'FAC2025005',
    name: 'Dr. Kavita Iyer',
    email: 'kavita.iyer@sankalan.com',
    department: 'Civil Engineering',
    designation: 'Assistant Professor',
    expertise: ['Structural Engineering', 'Sustainable Design'],
    qualifications: ['Ph.D. Civil Engineering', 'M.E. Structural Engineering'],
    experience: 7,
    contact: { phone: '+91-9876543214', office: 'CE-112' },
    publications: ['Green Building Materials', 'Earthquake Resistant Structures'],
    awards: ['Young Scientist Award 2024'],
    joiningDate: new Date('2018-09-05'),
  },
  {
    facultyId: 'FAC2025006',
    name: 'Prof. Sameer Deshpande',
    email: 'sameer.deshpande@sankalan.com',
    department: 'Computer Science',
    designation: 'Professor',
    expertise: ['Cybersecurity', 'Network Security', 'Blockchain'],
    qualifications: ['Ph.D. Computer Science', 'M.Tech Information Security'],
    experience: 13,
    contact: { phone: '+91-9876543215', office: 'CS-215' },
    publications: ['Blockchain for Secure Transactions', 'Zero Trust Networks'],
    awards: ['Cybersecurity Excellence Award 2023'],
    joiningDate: new Date('2011-11-18'),
  },
  {
    facultyId: 'FAC2025007',
    name: 'Dr. Radhika Menon',
    email: 'radhika.menon@sankalan.com',
    department: 'Electrical Engineering',
    designation: 'Associate Professor',
    expertise: ['Power Systems', 'Smart Grids'],
    qualifications: ['Ph.D. Electrical Engineering', 'M.E. Power Systems'],
    experience: 11,
    contact: { phone: '+91-9876543216', office: 'EE-307' },
    publications: ['Smart Grid Architectures', 'Renewable Energy Integration'],
    awards: ['Best Paper Award 2022'],
    joiningDate: new Date('2013-03-12'),
  },
  {
    facultyId: 'FAC2025008',
    name: 'Prof. Manish Gupta',
    email: 'manish.gupta@sankalan.com',
    department: 'Electronics and Communication',
    designation: 'Professor',
    expertise: ['Signal Processing', 'Communication Systems'],
    qualifications: ['Ph.D. Electronics', 'M.Tech Communication Systems'],
    experience: 14,
    contact: { phone: '+91-9876543217', office: 'EC-315' },
    publications: ['Next-Gen Communication Protocols', 'Signal Processing Techniques'],
    awards: ['Distinguished Faculty Award 2024'],
    joiningDate: new Date('2009-12-01'),
  },
  {
    facultyId: 'FAC2025009',
    name: 'Dr. Sneha Kulkarni',
    email: 'sneha.kulkarni@sankalan.com',
    department: 'Information Technology',
    designation: 'Assistant Professor',
    expertise: ['UI/UX Design', 'Human Computer Interaction'],
    qualifications: ['Ph.D. Human Computer Interaction', 'M.Des Interaction Design'],
    experience: 6,
    contact: { phone: '+91-9876543218', office: 'IT-204' },
    publications: ['Inclusive Design Principles', 'UX Metrics for Enterprise Apps'],
    awards: ['Design Innovator Award 2023'],
    joiningDate: new Date('2019-06-25'),
  },
  {
    facultyId: 'FAC2025010',
    name: 'Prof. Arvind Rao',
    email: 'arvind.rao@sankalan.com',
    department: 'Computer Science',
    designation: 'Professor',
    expertise: ['Software Engineering', 'Agile Methodologies'],
    qualifications: ['Ph.D. Software Engineering', 'M.E. Computer Engineering'],
    experience: 16,
    contact: { phone: '+91-9876543219', office: 'CS-118' },
    publications: ['Scalable Agile Practices', 'Software Quality Assurance Frameworks'],
    awards: ['Teacher of the Year 2024'],
    joiningDate: new Date('2008-04-08'),
  },
];

const studentNames = [
  'Jane Doe',
  'Arjun Singh',
  'Meera Gupta',
  'Rahul Verma',
  'Ananya Reddy',
  'Sahil Kapoor',
  'Aditi Rao',
  'Ishaan Mehta',
  'Pooja Sharma',
  'Karan Malhotra',
  'Simran Kaur',
  'Nikhil Bansal',
  'Riya Desai',
  'Varun Mishra',
  'Sneha Pillai',
  'Aditya Joshi',
  'Khushi Patel',
  'Dev Sharma',
  'Tanya Arora',
  'Yashwant Reddy',
  'Neelima Das',
];

const studentSeedBase = studentNames.map((name, index) => {
  const seq = index + 1;
  const formattedIndex = seq.toString().padStart(3, '0');

  const courses = [
    'B.Tech Computer Science',
    'B.Tech Information Technology',
    'B.Tech Electronics and Communication',
    'B.Tech Mechanical Engineering',
    'B.Tech Civil Engineering',
  ];

  const departments = ['School of Engineering', 'School of Computing', 'School of Technology'];

  const course = courses[index % courses.length];
  const department = departments[index % departments.length];

  return {
    studentId: `STU2025${formattedIndex}`,
    name,
    email:
      seq === 1
        ? 'student@sankalan.com'
        : `${name.toLowerCase().replace(/[^a-z]/g, '.')}.${seq}@sankalan.com`,
    password: 'student123',
    course,
    department,
    dateOfBirth: new Date(2002, index % 12, (index % 28) + 1),
    gender: index % 2 === 0 ? 'Female' : 'Male',
    feesPaid: index % 3 !== 0,
    caste: index % 4 === 0 ? 'OBC' : 'General',
    documentsSubmitted: index % 5 !== 0,
    tenthMarks: `${88 + (index % 7)}%`,
    twelfthMarks: `${84 + (index % 6)}%`,
    cgpa: 7.5 + (index % 4) * 0.4,
    semester: `Semester ${(index % 8) + 1}`,
    enrollmentYear: 2021 + (index % 2),
    address: {
      street: `${100 + seq} Knowledge Park`,
      city: ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi'][index % 5],
      state: ['Karnataka', 'Telangana', 'Maharashtra', 'Maharashtra', 'Delhi'][index % 5],
      zipCode: `56${(100 + index).toString().padStart(3, '0')}`,
    },
    contact: {
      phone: `+91-98${(70000000 + index * 1111).toString().padStart(8, '0')}`,
      emergencyContact: `+91-99${(80000000 + index * 2222).toString().padStart(8, '0')}`,
    },
  };
});

const hashPasswords = async <T extends { password: string }>(data: T[]) =>
  Promise.all(
    data.map(async (item) => ({
      ...item,
      password: await bcrypt.hash(item.password, 10),
    }))
  );

async function seedDatabase() {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing data...');
    await Promise.all([
      Activity.deleteMany({}),
      ClassModel.deleteMany({}),
      Placement.deleteMany({}),
      Admin.deleteMany({}),
      Faculty.deleteMany({}),
      Student.deleteMany({}),
    ]);

    console.log('🔐 Hashing passwords...');
    const [adminSeedHashed, facultySeedHashed, studentSeedHashed] = await Promise.all([
      hashPasswords(adminSeedData),
      hashPasswords(facultySeedBase.map((faculty) => ({ ...faculty, password: 'faculty123' }))),
      hashPasswords(studentSeedBase),
    ]);

    console.log('📦 Inserting admin data...');
    const adminDocs = await Admin.insertMany(adminSeedHashed);

    console.log('📦 Inserting faculty data...');
    const facultyDocs = await Faculty.insertMany(facultySeedHashed);

    console.log('📦 Inserting student data...');
    const studentDocs = await Student.insertMany(studentSeedHashed);

    const primaryAdmin = adminDocs[0];

    const getStudentIds = (indices: number[]) =>
      indices.filter((index) => studentDocs[index]).map((index) => studentDocs[index]._id);

    const classSeedData = [
      {
        courseCode: 'CS450',
        courseName: 'Advanced Algorithms',
        department: 'Computer Science',
        semester: 'Fall 2025',
        credits: 4,
        facultyId: facultyDocs[0]._id,
        enrolledStudents: getStudentIds([0, 1, 2, 3, 4, 5, 6, 7]),
        maxCapacity: 50,
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '09:00',
          endTime: '10:30',
          room: 'CS-101',
        },
        syllabus:
          'Advanced sorting algorithms, graph algorithms, dynamic programming, complexity analysis, approximation algorithms, randomized algorithms.',
      },
      {
        courseCode: 'CS210',
        courseName: 'Data Structures',
        department: 'Computer Science',
        semester: 'Fall 2025',
        credits: 3,
        facultyId: facultyDocs[0]._id,
        enrolledStudents: getStudentIds([0, 1, 4, 5, 8, 9, 10, 12]),
        maxCapacity: 60,
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '11:00',
          endTime: '12:30',
          room: 'CS-102',
        },
        syllabus:
          'Arrays, linked lists, stacks, queues, trees, graphs, hashing, time-space analysis, and introduction to algorithmic paradigms.',
      },
      {
        courseCode: 'EC301',
        courseName: 'Digital Signal Processing',
        department: 'Electronics and Communication',
        semester: 'Fall 2025',
        credits: 4,
        facultyId: facultyDocs[1]._id,
        enrolledStudents: getStudentIds([2, 3, 6, 11, 13, 16]),
        maxCapacity: 40,
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '14:00',
          endTime: '15:30',
          room: 'EC-201',
        },
        syllabus:
          'Discrete-time signals, Z-transforms, digital filter design, FFT algorithms, multirate signal processing.',
      },
      {
        courseCode: 'IT305',
        courseName: 'Cloud Computing Architecture',
        department: 'Information Technology',
        semester: 'Fall 2025',
        credits: 3,
        facultyId: facultyDocs[2]._id,
        enrolledStudents: getStudentIds([4, 7, 8, 14, 15, 17, 19]),
        maxCapacity: 55,
        schedule: {
          days: ['Wednesday', 'Friday'],
          startTime: '10:45',
          endTime: '12:15',
          room: 'IT-204',
        },
        syllabus:
          'Cloud service models, virtualization, microservices, DevOps automation, container orchestration, distributed storage.',
      },
    ];

    const placementSeedData = [
      {
        companyName: 'TechSolutions Inc.',
        jobDescription:
          'Software Developer role focusing on full-stack development with React, Node.js, and cloud-native deployments.',
        recruitingBranches: ['Computer Science', 'Information Technology'],
        vacancies: 5,
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
        recruitmentProcess: 'Online Test → Technical Interview → HR Interview',
        requiredCgpa: 7.5,
        backlogsAllowed: false,
        driveDate: new Date('2025-04-15T00:00:00.000Z'),
        applicationDeadline: new Date('2025-04-10T00:00:00.000Z'),
        packageOffered: {
          min: 600000,
          max: 850000,
        },
        jobLocation: ['Bengaluru', 'Mumbai'],
        eligibilityCriteria: [
          'Strong problem-solving skills',
          'No active backlogs',
          'Excellent communication abilities',
        ],
        companyWebsite: 'https://techsolutions.com',
        contactPerson: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techsolutions.com',
          phone: '+91-9876543220',
        },
        appliedStudents: getStudentIds([0, 1, 4, 5, 8, 10, 12]),
        selectedStudents: getStudentIds([0, 5]),
        status: 'Active',
        createdBy: primaryAdmin._id,
      },
      {
        companyName: 'InnovateCore Technologies',
        jobDescription:
          'Electronics Engineer role focusing on embedded systems, IoT solutions, and hardware-software co-design.',
        recruitingBranches: ['Electronics and Communication', 'Electrical Engineering'],
        vacancies: 3,
        requiredSkills: ['Embedded C', 'PCB Design', 'Microcontrollers', 'IoT Protocols'],
        recruitmentProcess:
          'Technical Test → Design Challenge → Technical Interview → HR Interview',
        requiredCgpa: 8.0,
        backlogsAllowed: true,
        driveDate: new Date('2025-04-20T00:00:00.000Z'),
        applicationDeadline: new Date('2025-04-15T00:00:00.000Z'),
        packageOffered: {
          min: 550000,
          max: 780000,
        },
        jobLocation: ['Pune', 'Hyderabad'],
        eligibilityCriteria: [
          'Hands-on project experience in embedded systems',
          'Maximum of 2 backlogs allowed',
          'Excellent circuit design knowledge',
        ],
        companyWebsite: 'https://innovatecore.com',
        contactPerson: {
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@innovatecore.com',
          phone: '+91-9876543221',
        },
        appliedStudents: getStudentIds([2, 3, 6, 11, 13]),
        selectedStudents: [],
        status: 'Active',
        createdBy: primaryAdmin._id,
      },
      {
        companyName: 'DataWave Analytics',
        jobDescription:
          'Data Analyst position working on building predictive models, dashboards, and insights for enterprise clients.',
        recruitingBranches: ['Computer Science', 'Information Technology', 'Statistics'],
        vacancies: 4,
        requiredSkills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
        recruitmentProcess: 'Case Study → Technical Interview → Client Interview',
        requiredCgpa: 7.0,
        backlogsAllowed: false,
        driveDate: new Date('2025-03-30T00:00:00.000Z'),
        applicationDeadline: new Date('2025-03-24T00:00:00.000Z'),
        packageOffered: {
          min: 580000,
          max: 820000,
        },
        jobLocation: ['Remote', 'Bengaluru'],
        eligibilityCriteria: [
          'Experience with data visualization tools',
          'Comfortable working with large datasets',
          'Good storytelling and presentation skills',
        ],
        companyWebsite: 'https://datawaveanalytics.com',
        contactPerson: {
          name: 'Anita Deshpande',
          email: 'anita.deshpande@datawaveanalytics.com',
          phone: '+91-9876543222',
        },
        appliedStudents: getStudentIds([0, 4, 8, 12, 14, 17, 18]),
        selectedStudents: getStudentIds([4, 12]),
        status: 'Completed',
        createdBy: primaryAdmin._id,
      },
    ];

    const activitySeedData = [
      {
        studentId: studentDocs[0]._id,
        title: 'International Conference on AI',
        category: 'Conference',
        description:
          'Presented a paper on novel neural network architectures at the IEEE International Conference on Artificial Intelligence.',
        date: new Date('2024-10-15T00:00:00.000Z'),
        credits: 15,
        status: 'Approved',
        fileUrl: 'https://example.com/certificates/ai-conference-jane.pdf',
        approvedBy: facultyDocs[0]._id,
        approvedAt: new Date('2024-10-20T00:00:00.000Z'),
        submittedAt: new Date('2024-10-16T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[0]._id,
        title: 'Web Development Bootcamp',
        category: 'Workshop',
        description:
          'Completed a 4-week intensive workshop on MERN stack development conducted by Tech Academy.',
        date: new Date('2024-07-22T00:00:00.000Z'),
        credits: 10,
        status: 'Approved',
        fileUrl: 'https://example.com/certificates/mern-bootcamp-jane.pdf',
        approvedBy: facultyDocs[5]._id,
        approvedAt: new Date('2024-07-25T00:00:00.000Z'),
        submittedAt: new Date('2024-07-23T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[1]._id,
        title: 'Google Cloud Certified',
        category: 'Certification',
        description: 'Associate Cloud Engineer certification from Google Cloud Platform.',
        date: new Date('2025-01-05T00:00:00.000Z'),
        credits: 20,
        status: 'Approved',
        fileUrl: 'https://example.com/certificates/gcp-arjun.pdf',
        approvedBy: facultyDocs[2]._id,
        approvedAt: new Date('2025-01-08T00:00:00.000Z'),
        submittedAt: new Date('2025-01-06T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[1]._id,
        title: 'Summer Internship at TechCorp',
        category: 'Internship',
        description:
          'Worked as a software developer intern on the core product team for 3 months, delivering new features.',
        date: new Date('2024-08-30T00:00:00.000Z'),
        credits: 40,
        status: 'Approved',
        fileUrl: 'https://example.com/certificates/techcorp-internship-arjun.pdf',
        approvedBy: facultyDocs[0]._id,
        approvedAt: new Date('2024-09-02T00:00:00.000Z'),
        submittedAt: new Date('2024-08-31T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[2]._id,
        title: 'Hackathon: Code for Good',
        category: 'Competition',
        description:
          'Participated in a 24-hour hackathon focused on social impact solutions. Team developed an app for elderly care.',
        date: new Date('2024-11-12T00:00:00.000Z'),
        credits: 10,
        status: 'Pending',
        submittedAt: new Date('2024-11-13T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[2]._id,
        title: 'Robotics Club Secretary',
        category: 'Club Activity',
        description:
          'Elected as the Robotics Club secretary for AY 2024-25 and organised five technical workshops.',
        date: new Date('2024-09-01T00:00:00.000Z'),
        credits: 5,
        status: 'Approved',
        approvedBy: facultyDocs[1]._id,
        approvedAt: new Date('2024-09-05T00:00:00.000Z'),
        submittedAt: new Date('2024-09-02T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[3]._id,
        title: 'Community Tree Plantation Drive',
        category: 'Volunteering',
        description:
          'Participated in a city-wide plantation drive that planted over 500 saplings in urban neighbourhoods.',
        date: new Date('2025-03-20T00:00:00.000Z'),
        credits: 5,
        status: 'Rejected',
        approvedBy: facultyDocs[3]._id,
        approvedAt: new Date('2025-03-25T00:00:00.000Z'),
        rejectionReason:
          'Uploaded document did not have organiser authentication. Please resubmit with correct proof.',
        submittedAt: new Date('2025-03-21T00:00:00.000Z'),
      },
      {
        studentId: studentDocs[4]._id,
        title: 'National Design Challenge',
        category: 'Competition',
        description:
          'Submitted a sustainable energy project for the National Design Challenge organised by the Ministry of Education.',
        date: new Date('2025-02-18T00:00:00.000Z'),
        credits: 15,
        status: 'Pending',
        submittedAt: new Date('2025-02-19T00:00:00.000Z'),
      },
    ];

    console.log('� Inserting class data...');
    await ClassModel.insertMany(classSeedData);

    console.log('💼 Inserting placement data...');
    await Placement.insertMany(placementSeedData);

    console.log('🏆 Inserting activity data...');
    await Activity.insertMany(activitySeedData);

    console.log('🎉 Demo data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedDatabase();
