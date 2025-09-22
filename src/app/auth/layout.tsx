import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline">StuHub</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="flex justify-center py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} StuHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
