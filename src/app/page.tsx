import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, UserCheck, UploadCloud, Bot, CheckCircle, Users, UserCog } from 'lucide-react';

const features = [
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Role-Based Dashboards',
    description: 'Custom dashboards for Students, Faculty, and Admins with relevant quick stats and overviews.',
  },
  {
    icon: <UploadCloud className="h-8 w-8 text-primary" />,
    title: 'Data Upload & Management',
    description: 'Easily upload and manage academic records and related documentation.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Student Assistant',
    description: 'Get instant help with our AI-powered chat agent for all your inquiries.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Certificate Verification',
    description: 'A secure and reliable way to verify the authenticity of student certificates.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'User & Class Control',
    description: 'Comprehensive tools for administrators to manage users, classes, and permissions.',
  },
  {
    icon: <UserCog className="h-8 w-8 text-primary" />,
    title: 'Profile Management',
    description: 'Students can easily update and maintain their academic and personal profiles.',
  },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline">StuHub</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/login">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                  Centralized Digital System for Student Activity
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  StuHub is the all-in-one platform for students, faculty, and administrators to streamline academic processes and enhance collaboration.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">
                Features for Everyone
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Powerful tools designed for every role in your institution.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-start p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 StuHub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
