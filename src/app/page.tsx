import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpenCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary p-3 mb-4">
               <BookOpenCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold font-headline text-foreground">
            StuHub
            </h1>
            <p className="mt-2 text-muted-foreground">
            Your centralized hub for academic and co-curricular excellence.
            </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@example.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button asChild type="submit" className="w-full">
                <Link href="/dashboard">Login</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
