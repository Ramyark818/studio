
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
import { Textarea } from '@/components/ui/textarea';
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
    
    // Parse array fields from newline or comma-separated strings
    const expertiseStr = formData.get('expertise') as string;
    const qualificationsStr = formData.get('qualifications') as string;
    const publicationsStr = formData.get('publications') as string;
    const awardsStr = formData.get('awards') as string;
    
    // Helper function to parse array input (supports both newlines and commas)
    const parseArrayInput = (str: string): string[] => {
      if (!str) return [];
      // Split by newlines first, then by commas, trim and filter empty
      return str.split(/[\n,]+/).map(item => item.trim()).filter(item => item);
    };
    
    const newFacultyData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string || 'faculty123',
        department: formData.get('department') as string,
        designation: formData.get('designation') as string,
        experience: parseInt(formData.get('experience') as string) || 0,
        expertise: parseArrayInput(expertiseStr),
        qualifications: parseArrayInput(qualificationsStr),
        publications: parseArrayInput(publicationsStr),
        awards: parseArrayInput(awardsStr),
        contact: {
            phone: formData.get('phone') as string,
            office: formData.get('office') as string,
        },
        joiningDate: formData.get('joiningDate') as string || new Date().toISOString()
    };

    // Validate required fields
    if (!newFacultyData.name || !newFacultyData.email || !newFacultyData.department || 
        !newFacultyData.designation || !newFacultyData.contact.phone || !newFacultyData.contact.office) {
        toast.error('Please fill out all required fields.');
        setIsLoading(false);
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newFacultyData.email)) {
        toast.error('Please enter a valid email address.');
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>
            Enter the details for the new faculty member. All fields marked with * are required.
            For array fields, enter one item per line or separate with commas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input id="name" name="name" placeholder="e.g., Dr. Jane Smith" className="col-span-3" required />
            </div>
            
            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input id="email" name="email" type="email" placeholder="jane.smith@university.edu" className="col-span-3" required />
            </div>
            
            {/* Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" name="password" type="password" placeholder="Leave blank for default (faculty123)" className="col-span-3" />
            </div>
            
            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department *
              </Label>
              <Input id="department" name="department" placeholder="e.g., Computer Science" className="col-span-3" required />
            </div>
            
            {/* Designation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation *
              </Label>
              <Input id="designation" name="designation" placeholder="e.g., Professor, Associate Professor" className="col-span-3" required />
            </div>
            
            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone *
              </Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., +1 234 567 8900" className="col-span-3" required />
            </div>
            
            {/* Office */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="office" className="text-right">
                Office *
              </Label>
              <Input id="office" name="office" placeholder="e.g., Room 301, CS Building" className="col-span-3" required />
            </div>
            
            {/* Experience */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience *
              </Label>
              <Input id="experience" name="experience" type="number" min="0" placeholder="Years of experience" className="col-span-3" required />
            </div>
            
            {/* Qualifications */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="qualifications" className="text-right mt-2">
                Qualifications
              </Label>
              <Textarea 
                id="qualifications" 
                name="qualifications" 
                placeholder="One per line:&#10;PhD in Computer Science&#10;M.Tech in AI" 
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>
            
            {/* Expertise */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="expertise" className="text-right mt-2">
                Expertise
              </Label>
              <Textarea 
                id="expertise" 
                name="expertise" 
                placeholder="One per line:&#10;Artificial Intelligence&#10;Machine Learning&#10;Data Science" 
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>
            
            {/* Publications */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="publications" className="text-right mt-2">
                Publications
              </Label>
              <Textarea 
                id="publications" 
                name="publications" 
                placeholder="One per line:&#10;Paper title, Journal name, Year&#10;Another publication..." 
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>
            
            {/* Awards */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="awards" className="text-right mt-2">
                Awards
              </Label>
              <Textarea 
                id="awards" 
                name="awards" 
                placeholder="One per line:&#10;Best Teacher Award 2024&#10;Research Excellence Award 2023" 
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>
            
            {/* Joining Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="joiningDate" className="text-right">
                Joining Date
              </Label>
              <Input id="joiningDate" name="joiningDate" type="date" className="col-span-3" />
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
