import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Users,
  UploadCloud,
  Bot,
  ShieldCheck,
  UserCog,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import VisitorCounter from '@/components/common/visitor-counter';

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Role-Based Dashboards',
    description:
      'Custom dashboards for Students, Faculty, and Admins with relevant quick stats and overviews.',
  },
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: 'Data Upload & Management',
    description: 'Easily upload and manage academic records and related documentation.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'AI Student Assistant',
    description: 'Get instant help with our AI-powered chat agent for all your inquiries.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Certificate Verification',
    description: 'A secure and reliable way to verify the authenticity of student certificates.',
  },
  {
    icon: <UserCog className="h-10 w-10 text-primary" />,
    title: 'User & Class Control',
    description:
      'Comprehensive tools for administrators to manage users, classes, and permissions.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Profile Management',
    description: 'Students can easily update and maintain their academic and personal profiles.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center bg-card px-4 shadow-sm lg:px-6">
        <div className="mx-auto flex w-full max-w-screen-xl items-center">
          <Link href="#" className="flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="ml-2 font-headline text-xl font-bold">SANKALAN</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2 sm:gap-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                  Centralized Digital System for Student Activity
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The all-in-one platform for students, faculty, and administrators to streamline
                  academic processes and enhance collaboration.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-primary/5 py-12 md:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-xl px-4 md:px-6">
            <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features for Everyone
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Powerful tools designed for every role in your institution.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="grid gap-1 rounded-lg border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-4">
                    {feature.icon}
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
              <GraduationCap className="h-8 w-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold">SANKALAN</span>
            </Link>
            <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-300 sm:mb-0">
              <li>
                <Link href="#" className="me-4 hover:underline md:me-6">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="me-4 hover:underline md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="me-4 hover:underline md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-400 sm:text-center">
              © {new Date().getFullYear()}{' '}
              <Link href="/" className="hover:underline">
                SANKALAN
              </Link>
              . All Rights Reserved.
            </span>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300 sm:mt-0 sm:justify-center sm:gap-6">
              <VisitorCounter />
              <p className="text-sm text-gray-400">
                Last Updated:{' '}
                {new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
