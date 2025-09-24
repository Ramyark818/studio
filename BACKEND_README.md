# Student Database Management System - Backend MVP

This document describes the backend implementation for the Student Database Management System built for the hackathon MVP.

## 🏗️ Architecture Overview

This is a **Next.js Full-Stack Application** with:
- **Frontend**: React/Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes with RESTful endpoints
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Environment**: Clacky cloud development environment

## 📊 Database Models

### Core Collections

1. **Users** - Authentication and role management
   - Fields: name, email, password, role, avatarUrl
   - Roles: admin, faculty, student

2. **Students** - Complete student profiles
   - Fields: studentId, personal details, academic info, contact details
   - Links to User collection

3. **Faculty** - Faculty member profiles  
   - Fields: facultyId, department, qualifications, expertise
   - Links to User collection

4. **Activities** - Student extracurricular activities
   - Fields: title, category, description, credits, status
   - Links to Student and Faculty (for approval)

5. **Classes** - Course management
   - Fields: courseCode, courseName, schedule, enrolled students
   - Links to Faculty and Students

6. **Placements** - Job placement opportunities
   - Fields: company details, requirements, applications
   - Links to Students and Admin users

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - User login with JWT token generation

### Students
- `GET /api/students` - Get all students (with pagination & search)
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get specific student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### Faculty  
- `GET /api/faculty` - Get all faculty members
- `POST /api/faculty` - Create new faculty member

### Activities
- `GET /api/activities` - Get activities (filterable by student/status/category)
- `POST /api/activities` - Submit new activity
- `PUT /api/activities/[id]` - Update/approve/reject activity
- `DELETE /api/activities/[id]` - Delete activity

### Placements
- `GET /api/placements` - Get placement opportunities
- `POST /api/placements` - Create new placement

### Database Management
- `GET /api/seed` - Get seeding instructions
- `POST /api/seed` - Seed database with demo data

## 🔧 Setup & Configuration

### Environment Variables
```env
MONGODB_URI=mongodb://admin:QWahRexK@127.0.0.1:27017/student_db?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

### Dependencies Installed
```json
{
  "mongoose": "^7.x",
  "bcryptjs": "^2.x", 
  "jsonwebtoken": "^9.x",
  "@types/bcryptjs": "^2.x",
  "@types/jsonwebtoken": "^9.x"
}
```

## 📁 Project Structure

```
src/
├── app/
│   └── api/                    # API Routes
│       ├── auth/login/         # Authentication
│       ├── students/           # Student CRUD
│       ├── faculty/            # Faculty CRUD  
│       ├── activities/         # Activity management
│       ├── placements/         # Placement management
│       └── seed/               # Database seeding
├── models/                     # MongoDB Mongoose models
│   ├── User.ts
│   ├── Student.ts
│   ├── Faculty.ts
│   ├── Activity.ts
│   ├── Class.ts
│   └── Placement.ts
├── lib/
│   ├── mongodb.ts              # Database connection
│   ├── api-client.ts           # Frontend API client
│   └── api-response.ts         # Response utilities
├── data/
│   └── demo-data.json          # Demo dataset
└── scripts/
    └── seed-database.ts        # Database seeding script
```

## 🎯 Demo Data

The system includes comprehensive demo data:
- **5 Students** with complete profiles from different departments
- **2 Faculty Members** with expertise and qualifications
- **8 Activities** in various categories (approved/pending/rejected)
- **3 Classes** with enrollment data
- **2 Active Placements** with application tracking
- **User accounts** for each role with authentication

### Default Login Credentials
```
Admin:   admin@sankalan.com   / admin123
Faculty: faculty@sankalan.com / faculty123  
Student: student@sankalan.com / student123
```

## 🚀 Quick Start

### 1. Seed the Database
Navigate to **Admin Panel > Database Seed** or use API:
```bash
curl -X POST http://localhost:9002/api/seed \
  -H "Content-Type: application/json" \
  -d '{"confirmSeed": true}'
```

### 2. Test Authentication
```bash
curl -X POST http://localhost:9002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@sankalan.com", "password": "student123"}'
```

### 3. Access Student Data
```bash
curl -X GET http://localhost:9002/api/students
```

## 🔍 Features Implemented

### Core Functionality
✅ **User Management** - Create, read, update, delete users by role  
✅ **Student Profiles** - Comprehensive student information management  
✅ **Activity Tracking** - Submit, approve, and track student activities  
✅ **Faculty Management** - Faculty profiles and course assignments  
✅ **Placement Portal** - Job opportunities and application tracking  
✅ **Authentication** - JWT-based secure login system  

### Admin Features  
✅ **Dashboard** - Overview of system statistics  
✅ **User Management** - Manage students and faculty accounts  
✅ **Database Seeding** - Initialize system with demo data  
✅ **Activity Approval** - Review and approve/reject student activities  

### Student Features
✅ **Profile Management** - View and update personal information  
✅ **Activity Submission** - Submit extracurricular activities for approval  
✅ **Performance Tracking** - View academic performance metrics  
✅ **Placement Applications** - Browse and apply for job opportunities  

### Faculty Features  
✅ **Class Management** - View assigned classes and enrolled students  
✅ **Activity Review** - Approve/reject student activity submissions  
✅ **Student Progress** - Monitor student performance and attendance  

## 🔄 API Response Format

All API endpoints follow a consistent response format:
```json
{
  "success": true/false,
  "message": "Description of result",
  "data": {}, // Response data (if successful)
  "error": "" // Error details (if failed)
}
```

## 📈 Scalability Considerations

- **Pagination**: All list endpoints support pagination parameters
- **Search**: Student and faculty endpoints support search functionality
- **Filtering**: Activities can be filtered by status, category, and student
- **Relationships**: Proper MongoDB relationships with population
- **Indexing**: Ready for database indexing on frequently queried fields

## 🛡️ Security Features

- **Password Hashing**: Bcrypt encryption for user passwords
- **JWT Tokens**: Secure authentication with expiration
- **Input Validation**: Mongoose schema validation
- **Role-based Access**: User roles for access control
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment Ready

The system is designed for easy deployment:
- Environment configuration via `.env.local`
- Docker-compatible setup
- Cloud-ready MongoDB connection
- Scalable Next.js architecture

## 📞 Support

For questions about the backend implementation:
- Check the API endpoints using the provided curl commands
- Review the demo data in `/src/data/demo-data.json`
- Test functionality using the admin seeding interface
- Examine the Mongoose models for data structure details

---

**Note**: This is an MVP implementation focused on core functionality for the hackathon. The system provides a solid foundation that can be extended with additional features like file uploads, real-time notifications, advanced analytics, and more comprehensive role-based permissions.