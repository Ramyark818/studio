
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

interface AddFacultyDialogProps {
    onAddFaculty: (newFacultyData: any) => Promise<boolean>;
}

export default function AddFacultyDialog({ onAddFaculty }: AddFacultyDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const newFacultyData = {
        name: formData.get('name') as string,
        email: `${(formData.get('name') as string).toLowerCase().replace(/\s+/g, '.')}@faculty.edu`,
        department: formData.get('department') as string,
        designation: formData.get('designation') as string,
        experience: parseInt(formData.get('experience') as string) || 0,
        expertise: [],
        qualifications: [],
        joiningDate: new Date().toISOString()
    };

    // Validate required fields
    if (!newFacultyData.name || !newFacultyData.department || !newFacultyData.designation) {
        toast.error('Please fill out all required fields.');
        setIsLoading(false);
        return;
    }

    try {
        const success = await onAddFaculty(newFacultyData);
        if (success) {
            setOpen(false); // Close popup immediately on success
            const form = e.currentTarget;
            if (form) {
              form.reset();
            }
        }
    } catch (error) {
        console.error('Error adding faculty:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>
            Enter the details for the new faculty member. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" placeholder="e.g., Dr. Jane Smith" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input id="department" name="department" placeholder="e.g., Computer Science" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input id="designation" name="designation" placeholder="e.g., Professor" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience (years)
              </Label>
              <Input id="experience" name="experience" type="number" placeholder="e.g., 5" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Faculty
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
