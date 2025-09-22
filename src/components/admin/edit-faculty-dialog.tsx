
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

interface Faculty {
    id: string;
    name: string;
    department: string;
}

interface EditFacultyDialogProps {
    faculty: Faculty;
    onUpdateFaculty: (updatedFaculty: Faculty) => void;
}

export default function EditFacultyDialog({ faculty, onUpdateFaculty }: EditFacultyDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedFaculty = {
        ...faculty,
        name: formData.get('name') as string,
        department: formData.get('department') as string,
    };

    if (updatedFaculty.name && updatedFaculty.department) {
        onUpdateFaculty(updatedFaculty);
        toast.success('Faculty member updated successfully!');
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Faculty Member</DialogTitle>
          <DialogDescription>
            Make changes to the faculty member's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="facultyId" className="text-right">
                Faculty ID
              </Label>
              <Input id="facultyId" defaultValue={faculty.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" defaultValue={faculty.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input id="department" name="department" defaultValue={faculty.department} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
             <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
