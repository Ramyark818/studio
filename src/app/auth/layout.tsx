import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b w-full">
        <div className="w-full max-w-screen-xl mx-auto flex items-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-headline">SANKALAN</span>
            </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-400 sm:text-center">© {new Date().getFullYear()} <Link href="/" className="hover:underline">SANKALAN</Link>. All Rights Reserved.
                </span>
                <div className="flex flex-wrap items-center mt-4 text-sm font-medium text-gray-300 sm:justify-center sm:mt-0">
                    <Link href="#" className="hover:underline me-4 md:me-6">Terms & Conditions</Link>
                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
