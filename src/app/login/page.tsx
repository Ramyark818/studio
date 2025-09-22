'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpenCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const dummyCredentials = {
  student: { email: 'student@stuhub.com', password: 'student123', path: '/dashboard' },
  admin: { email: 'admin@stuhub.com', password: 'admin123', path: '/dashboard/admin' },
  faculty: { email: 'faculty@stuhub.com', password: 'faculty123', path: '/dashboard' },
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = Object.values(dummyCredentials).find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push(user.path);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary p-3 mb-4">
               <BookOpenCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold font-headline text-foreground">
              Welcome to StuHub
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
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="user@example.edu" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Dummy Credentials</AlertTitle>
          <AlertDescription>
            <ul className="text-sm list-disc pl-5 space-y-1 mt-2">
              <li><b>Student:</b> student@stuhub.com / student123</li>
              <li><b>Admin:</b> admin@stuhub.com / admin123</li>
              <li><b>Faculty:</b> faculty@stuhub.com / faculty123</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
