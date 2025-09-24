
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
import { FilePenLine, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface Faculty {
    _id: string;
    facultyId: string;
    name: string;
    email: string;
    department: string;
    designation: string;
    expertise: string[];
    qualifications: string[];
    experience: number;
    joiningDate: string;
}

interface EditFacultyDialogProps {
    faculty: Faculty;
    onUpdateFaculty: (facultyId: string, updatedData: any) => Promise<boolean>;
}

export default function EditFacultyDialog({ faculty, onUpdateFaculty }: EditFacultyDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const updatedData = {
        name: formData.get('name') as string,
        department: formData.get('department') as string,
        designation: formData.get('designation') as string,
        experience: parseInt(formData.get('experience') as string) || 0,
    };

    // Validate required fields
    if (!updatedData.name || !updatedData.department || !updatedData.designation) {
        toast.error('Please fill out all required fields.');
        setIsLoading(false);
        return;
    }

    try {
        const success = await onUpdateFaculty(faculty._id, updatedData);
        if (success) {
            setOpen(false); // Close popup immediately on success
        }
    } catch (error) {
        console.error('Error updating faculty:', error);
    } finally {
        setIsLoading(false);
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
              <Input id="facultyId" defaultValue={faculty.facultyId} className="col-span-3" disabled />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input id="designation" name="designation" defaultValue={faculty.designation} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience (years)
              </Label>
              <Input id="experience" name="experience" type="number" defaultValue={faculty.experience} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
             <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
