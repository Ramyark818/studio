'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Role = 'student' | 'admin' | 'faculty';

const dummyCredentials = {
  student: { email: 'student@sankalan.com', password: 'student123', path: '/dashboard' },
  admin: { email: 'admin@sankalan.com', password: 'admin123', path: '/dashboard/admin' },
  faculty: { email: 'faculty@sankalan.com', password: 'faculty123', path: '/dashboard/faculty' },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | ''>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role) {
      toast.error('Please select a role.');
      return;
    }

    const user = dummyCredentials[role];

    if (user && user.email === email && user.password === password) {
      toast.success('Login Sucessful');
      router.push(user.path);
    } else {
      toast.error('Invalid credentials for the selected role. Please try again.');
    }
  };

  const autofillForm = (selectedRole: Role) => {
    setRole(selectedRole);
    setEmail(dummyCredentials[selectedRole].email);
    setPassword(dummyCredentials[selectedRole].password);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Login to SANKALAN</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50 focus:bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted/50 focus:bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                <SelectTrigger id="role" className="bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Demo Accounts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => autofillForm('student')}>
            Student
          </Button>
          <Button variant="outline" size="sm" onClick={() => autofillForm('faculty')}>
            Faculty
          </Button>
          <Button variant="outline" size="sm" onClick={() => autofillForm('admin')}>
            Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
