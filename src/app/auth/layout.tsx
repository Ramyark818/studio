import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import VisitorCounter from '@/components/common/visitor-counter';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="flex h-16 w-full items-center border-b bg-background px-4 lg:px-6">
        <div className="mx-auto flex w-full max-w-screen-xl items-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">SANKALAN</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">{children}</main>
      <footer className="bg-gray-800 text-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
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
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <VisitorCounter />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
