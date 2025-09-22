
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
import { FilePenLine } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { Student } from '@/app/(admin)/dashboard/admin/users/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

interface EditStudentDialogProps {
    student: Student;
    onUpdateStudent: (updatedStudent: Student) => void;
}

export default function EditStudentDialog({ student, onUpdateStudent }: EditStudentDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedStudent = {
        ...student,
        name: formData.get('name') as string,
        course: formData.get('course') as string,
        dateOfBirth: formData.get('dateOfBirth') as string,
        feesPaid: formData.get('feesPaid') === 'on',
        caste: formData.get('caste') as string,
        gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
        documentsSubmitted: formData.get('documentsSubmitted') === 'on',
        tenthMarks: formData.get('tenthMarks') as string,
        twelfthMarks: formData.get('twelfthMarks') as string,
    };

    if (Object.values(updatedStudent).every(field => field !== null && field !== '')) {
        onUpdateStudent(updatedStudent);
        toast.success('Student updated successfully!');
        setOpen(false);
    } else {
        toast.error('Please fill out all fields.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <FilePenLine className="mr-2 h-4 w-4" />
            Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Make changes to the student's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <ScrollArea className="h-[60vh] pr-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input id="studentId" defaultValue={student.id} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={student.name} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input id="course" name="course" defaultValue={student.course} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={student.dateOfBirth} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="caste">Caste</Label>
                        <Input id="caste" name="caste" defaultValue={student.caste} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" defaultValue={student.gender} required>
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
                        <Input id="tenthMarks" name="tenthMarks" defaultValue={student.tenthMarks} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twelfthMarks">12th Marks</Label>
                        <Input id="twelfthMarks" name="twelfthMarks" defaultValue={student.twelfthMarks} required />
                    </div>
                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="feesPaid" name="feesPaid" defaultChecked={student.feesPaid} />
                        <Label htmlFor="feesPaid">Fees Paid</Label>
                    </div>
                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="documentsSubmitted" name="documentsSubmitted" defaultChecked={student.documentsSubmitted} />
                        <Label htmlFor="documentsSubmitted">Documents Submitted</Label>
                    </div>
                </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
