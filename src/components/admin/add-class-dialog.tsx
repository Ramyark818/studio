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
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface AddClassDialogProps {
  onAddClass: (newClass: { courseCode: string; courseName: string; semester: string }) => void;
}

export default function AddClassDialog({ onAddClass }: AddClassDialogProps) {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClass = {
      courseCode: formData.get('courseCode') as string,
      courseName: formData.get('courseName') as string,
      semester: formData.get('semester') as string,
    };

    if (newClass.courseCode && newClass.courseName && newClass.semester) {
      onAddClass(newClass);
      toast.success('New class added successfully!');
      setOpen(false);
      const form = e.currentTarget;
      if (form) {
        form.reset();
      }
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Enter the details for the new class. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseCode" className="text-right">
                Course Code
              </Label>
              <Input
                id="courseCode"
                name="courseCode"
                placeholder="e.g., CS501"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseName" className="text-right">
                Course Name
              </Label>
              <Input
                id="courseName"
                name="courseName"
                placeholder="e.g., Advanced AI"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Input
                id="semester"
                name="semester"
                placeholder="e.g., Fall 2024"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
