# SANKALAN - Centralized Digital System for Student Activity

![SANKALAN](https://img.shields.io/badge/Smart%20India%20Hackathon-2024-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Deployed-orange)

## 🎯 Project Overview

**SANKALAN** is a comprehensive digital platform developed for the **Smart India Hackathon 2024**, designed to streamline and centralize student activity management in educational institutions. The platform serves as an all-in-one solution for students, faculty, and administrators to manage academic records, track student activities, generate compliance reports, and enhance collaboration across the institution.

### Problem Statement

Educational institutions face significant challenges in:
- Managing and tracking student activities across various categories
- Generating compliance reports for accreditation bodies (NAAC, AICTE, NIRF)
- Maintaining student portfolios and academic records
- Coordinating between students, faculty, and administrative staff
- Providing real-time assistance to students for academic queries

SANKALAN addresses these challenges by providing a unified digital ecosystem that automates activity tracking, enables seamless communication, and generates regulatory compliance reports with minimal manual intervention.

## ✨ Key Features

### 🎓 Student Features
- **Dashboard**: Personalized dashboard with CGPA tracking, activity credits, and attendance overview
- **Activity Management**: Upload and track extracurricular activities (conferences, workshops, certifications, internships, competitions, volunteering, club activities)
- **Portfolio Management**: Create and maintain comprehensive digital portfolios with education, skills, projects, certifications, and achievements
- **AI Assistant**: Intelligent chatbot powered by Google Gemini AI for instant academic and administrative support
- **Career Portal**: Access placement opportunities with detailed job descriptions, eligibility criteria, and application tracking
- **Resume Generator**: Automatically generate professional PDF resumes from portfolio data

### 👨‍🏫 Faculty Features
- **Class Management**: Manage multiple classes with course codes, enrollment tracking, and student lists
- **Activity Approval System**: Review and approve/reject student-submitted activities with feedback
- **Attendance Tracking**: Record and monitor student attendance with detailed reports
- **Student Performance Monitoring**: Track student academic performance and activity participation
- **Report Generation**: Generate class-wise attendance and performance reports in PDF format
- **Profile Management**: Maintain faculty profiles with expertise, publications, and awards

### 👔 Admin Features
- **User Management**: Complete control over student and faculty accounts with CRUD operations
- **Class Administration**: Create and manage classes, assign faculty, and track enrollments
- **Compliance Reporting**: Generate NAAC, AICTE, and NIRF reports automatically
- **Placement Management**: Post job opportunities, manage recruitment drives, and track placements
- **Analytics Dashboard**: Institution-wide analytics on student activities, performance trends, and engagement metrics
- **Seed Data Management**: Initialize and manage test data for development and demo purposes
- **Certificate Verification**: Secure system to verify the authenticity of student certificates

## 🏗️ Technical Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 15.3.3 (React 18.3.1)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.1 with custom animations
- **UI Components**: Radix UI (accessible, unstyled components)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API

#### Backend
- **Runtime**: Node.js 20
- **API Routes**: Next.js API Routes (serverless functions)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **File Storage**: Firebase Storage (planned)

#### AI Integration
- **AI Platform**: Google GenKit AI Framework
- **AI Model**: Google Gemini AI
- **Features**: 
  - Student Assistant chatbot
  - Career guidance recommendations
  - Intelligent query resolution

#### PDF Generation
- **Library**: jsPDF with jsPDF-AutoTable
- **Use Cases**: 
  - Student resumes and portfolios
  - Compliance reports (NAAC, AICTE, NIRF)
  - Class attendance reports
  - Performance reports

#### Deployment & DevOps
- **Hosting**: Firebase App Hosting
- **CI/CD**: GitHub Actions (integrated)
- **Development Environment**: Firebase Studio (IDX)
- **Version Control**: Git/GitHub

### Database Schema

The application uses MongoDB with the following collections:

- **Users**: Authentication and role-based access control
- **Students**: Student profiles with academic details
- **Faculty**: Faculty profiles and assignments
- **Activities**: Student activity submissions with approval workflow
- **Classes**: Course information and enrollments
- **Placements**: Job postings and recruitment drives

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- MongoDB database (local or Atlas)
- Firebase account (for deployment)
- Google AI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ramyark818/sankalan.git
   cd sankalan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   
   # Google AI API Key
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   
   # Firebase (optional for deployment)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:9002`

5. **Seed the database (optional)**
   Visit `http://localhost:9002/dashboard/admin/seed` (admin access required) to populate the database with sample data.

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
sankalan/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (student)/          # Student role pages
│   │   │   └── dashboard/      # Student dashboard & features
│   │   ├── (faculty)/          # Faculty role pages
│   │   │   └── dashboard/      # Faculty dashboard & features
│   │   ├── (admin)/            # Admin role pages
│   │   │   └── dashboard/      # Admin dashboard & features
│   │   ├── api/                # API routes
│   │   ├── auth/               # Authentication pages
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable React components
│   │   ├── common/             # Shared components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # UI primitives
│   ├── lib/                    # Utility functions and helpers
│   │   ├── data.ts             # Mock data for development
│   │   ├── types.ts            # TypeScript type definitions
│   │   └── reports.ts          # PDF report generation
│   ├── models/                 # Mongoose database models
│   │   ├── User.ts
│   │   ├── Student.ts
│   │   ├── Faculty.ts
│   │   ├── Activity.ts
│   │   ├── Class.ts
│   │   └── Placement.ts
│   └── ai/                     # AI integration
│       ├── genkit.ts           # GenKit configuration
│       └── flows/              # AI flows
│           ├── assistant-flow.ts
│           └── career-guide-flow.ts
├── public/                     # Static assets
├── .idx/                       # Firebase Studio configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── next.config.ts              # Next.js configuration
```

## 👥 User Roles & Access

### Student Role
- View personal dashboard with academic metrics
- Submit and track activities
- Create and manage portfolio
- Chat with AI assistant
- Browse and apply for placements
- Generate resume from portfolio

### Faculty Role
- View assigned classes
- Approve/reject student activities
- Manage attendance
- View student performance
- Generate reports
- Manage personal profile

### Admin Role
- Manage all users (students and faculty)
- Create and manage classes
- Generate compliance reports
- Post placement opportunities
- View institution-wide analytics
- System configuration and settings

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Role-Based Access Control (RBAC)**: Strict role-based permissions
- **Input Validation**: Zod schema validation for all forms
- **API Route Protection**: Middleware-based authentication checks
- **HTTPS**: Enforced secure connections in production

## 📊 Compliance & Reporting

SANKALAN generates reports compliant with:

### NAAC (National Assessment and Accreditation Council)
- Student activity tracking by category
- Credit accumulation reports
- Participation metrics

### AICTE (All India Council for Technical Education)
- Activity status and approval tracking
- Category-wise student engagement
- Compliance documentation

### NIRF (National Institutional Ranking Framework)
- Aggregated activity statistics
- Department-wise performance
- Research and innovation metrics

## 🤖 AI Features

### Student Assistant
- Powered by Google Gemini AI
- Natural language query understanding
- Real-time responses for:
  - Academic queries
  - Administrative procedures
  - Activity submission guidance
  - Career counseling
  - General institutional information

### Career Guidance
- Personalized job recommendations
- Skills gap analysis
- Interview preparation tips
- Career path suggestions

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Mode Support**: Theme toggling capability
- **Accessibility**: WCAG compliant with keyboard navigation
- **Smooth Animations**: Tailwind CSS animations for enhanced UX
- **Interactive Charts**: Real-time data visualization with Recharts
- **Modern Components**: Clean, professional design with Radix UI

## 🧪 Testing

Currently, the project includes:
- Type checking with TypeScript
- ESLint for code quality
- Manual testing procedures

*Note: Comprehensive test suite implementation is planned for future releases.*

## 🚀 Deployment

### Firebase App Hosting

1. **Configure Firebase**
   ```bash
   firebase init hosting
   ```

2. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

The application is configured with `apphosting.yaml` for automatic deployment to Firebase App Hosting.

### Environment Variables
Ensure all required environment variables are set in your Firebase project settings.

## 🛣️ Roadmap

- [ ] Enhanced analytics dashboard with more visualizations
- [ ] Mobile applications (iOS and Android)
- [ ] Real-time notifications system
- [ ] Email integration for notifications
- [ ] Advanced search and filtering
- [ ] Bulk operations for admin users
- [ ] API documentation with Swagger
- [ ] Comprehensive test coverage
- [ ] Multi-language support
- [ ] Integration with other educational platforms

## 👥 Team & Contributors

This project was developed for the Smart India Hackathon 2024.

## 📄 License

This project is proprietary software developed for the Smart India Hackathon 2024.

## 🤝 Contributing

This is a hackathon project. For any queries or contributions, please contact the development team.

## 📞 Support

For support, questions, or feedback:
- Open an issue in the GitHub repository
- Contact the development team

## 🙏 Acknowledgments

- Smart India Hackathon 2024 organizers
- Google Gemini AI for powering the AI assistant
- Next.js and Vercel teams for the amazing framework
- Firebase team for hosting and backend services
- Open source community for various libraries and tools

---

**Built with ❤️ for Smart India Hackathon 2024**
