
'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { Student } from '@/app/(admin)/dashboard/admin/users/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

interface AddStudentDialogProps {
    onAddStudent: (newStudentData: any) => Promise<boolean>;
}

export default function AddStudentDialog({ onAddStudent }: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    const newStudentData = {
        name: formData.get('name') as string,
        email: `${(formData.get('name') as string).toLowerCase().replace(/\s+/g, '.')}@student.edu`,
        course: formData.get('course') as string,
        department: formData.get('course') as string, // Use course as department for now
        dateOfBirth: formData.get('dateOfBirth') as string,
        feesPaid: formData.get('feesPaid') === 'on',
        caste: formData.get('caste') as string,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        documentsSubmitted: formData.get('documentsSubmitted') === 'on',
        tenthMarks: formData.get('tenthMarks') as string,
        twelfthMarks: formData.get('twelfthMarks') as string,
        enrollmentYear: new Date().getFullYear(),
        semester: '1st',
        cgpa: 0
    };

    // Validate required fields
    const requiredFields = ['name', 'course', 'dateOfBirth', 'caste', 'gender', 'tenthMarks', 'twelfthMarks'];
    const missingFields = requiredFields.filter(field => !newStudentData[field as keyof typeof newStudentData]);
    
    if (missingFields.length > 0) {
        toast.error('Please fill out all required fields.');
        setIsLoading(false);
        return;
    }

    try {
        const success = await onAddStudent(newStudentData);
        if (success) {
            setOpen(false); // Close popup immediately on success
            e.currentTarget.reset();
        }
    } catch (error) {
        console.error('Error adding student:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="e.g., John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" name="course" placeholder="e.g., B.Tech CS" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caste">Caste</Label>
                <Input id="caste" name="caste" placeholder="e.g., General" required />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenthMarks">10th Marks</Label>
                <Input id="tenthMarks" name="tenthMarks" placeholder="e.g., 90%" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="twelfthMarks">12th Marks</Label>
                <Input id="twelfthMarks" name="twelfthMarks" placeholder="e.g., 85%" required />
              </div>
              <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="feesPaid" name="feesPaid" />
                  <Label htmlFor="feesPaid">Fees Paid</Label>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="documentsSubmitted" name="documentsSubmitted" />
                  <Label htmlFor="documentsSubmitted">Documents Submitted</Label>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
