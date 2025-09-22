'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Role = 'student' | 'admin' | 'faculty';

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
  const [role, setRole] = useState<Role>('student');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = dummyCredentials[role];

    if (user && user.email === email && user.password === password) {
      toast({
        title: "Login Successful",
        description: `Redirecting to ${role} dashboard...`,
      });
      router.push(user.path);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials for the selected role. Please try again.",
      });
    }
  };

  const autofillForm = (selectedRole: Role) => {
    setRole(selectedRole);
    setEmail(dummyCredentials[selectedRole].email);
    setPassword(dummyCredentials[selectedRole].password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary p-3 mb-4">
               <GraduationCap className="h-8 w-8 text-primary-foreground" />
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
            <CardDescription>Select your role and enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => autofillForm('student')}>
                  Login as Student
                </Button>
                <Button variant="outline" size="sm" onClick={() => autofillForm('admin')}>
                  Login as Admin
                </Button>
                <Button variant="outline" size="sm" onClick={() => autofillForm('faculty')}>
                  Login as Faculty
                </Button>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
      </div>
    </div>
  );
}
