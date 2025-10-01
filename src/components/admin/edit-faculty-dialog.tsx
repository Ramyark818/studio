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
  contact: {
    phone: string;
    office: string;
  };
  publications?: string[];
  awards?: string[];
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

    // Parse array fields from newline or comma-separated strings
    const expertiseStr = formData.get('expertise') as string;
    const qualificationsStr = formData.get('qualifications') as string;
    const publicationsStr = formData.get('publications') as string;
    const awardsStr = formData.get('awards') as string;

    // Helper function to parse array input (supports both newlines and commas)
    const parseArrayInput = (str: string): string[] => {
      if (!str) return [];
      return str
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter((item) => item);
    };

    const updatedData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
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
      joiningDate: (formData.get('joiningDate') as string) || faculty.joiningDate,
    };

    // Validate required fields
    if (
      !updatedData.name ||
      !updatedData.email ||
      !updatedData.department ||
      !updatedData.designation ||
      !updatedData.contact.phone ||
      !updatedData.contact.office
    ) {
      toast.error('Please fill out all required fields.');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedData.email)) {
      toast.error('Please enter a valid email address.');
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Faculty Member</DialogTitle>
          <DialogDescription>
            Make changes to the faculty member's details. All fields marked with * are required. For
            array fields, enter one item per line or separate with commas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Faculty ID */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="facultyId" className="text-right">
                Faculty ID
              </Label>
              <Input
                id="facultyId"
                defaultValue={faculty.facultyId}
                className="col-span-3"
                disabled
              />
            </div>

            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={faculty.name}
                className="col-span-3"
                required
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={faculty.email}
                className="col-span-3"
                required
              />
            </div>

            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department *
              </Label>
              <Input
                id="department"
                name="department"
                defaultValue={faculty.department}
                className="col-span-3"
                required
              />
            </div>

            {/* Designation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation *
              </Label>
              <Input
                id="designation"
                name="designation"
                defaultValue={faculty.designation}
                className="col-span-3"
                required
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={faculty.contact?.phone || ''}
                className="col-span-3"
                required
              />
            </div>

            {/* Office */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="office" className="text-right">
                Office *
              </Label>
              <Input
                id="office"
                name="office"
                defaultValue={faculty.contact?.office || ''}
                className="col-span-3"
                required
              />
            </div>

            {/* Experience */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience *
              </Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                min="0"
                defaultValue={faculty.experience}
                className="col-span-3"
                required
              />
            </div>

            {/* Qualifications */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="qualifications" className="mt-2 text-right">
                Qualifications
              </Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                defaultValue={faculty.qualifications?.join('\n') || ''}
                placeholder="One per line:&#10;PhD in Computer Science&#10;M.Tech in AI"
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Expertise */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="expertise" className="mt-2 text-right">
                Expertise
              </Label>
              <Textarea
                id="expertise"
                name="expertise"
                defaultValue={faculty.expertise?.join('\n') || ''}
                placeholder="One per line:&#10;Artificial Intelligence&#10;Machine Learning"
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Publications */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="publications" className="mt-2 text-right">
                Publications
              </Label>
              <Textarea
                id="publications"
                name="publications"
                defaultValue={faculty.publications?.join('\n') || ''}
                placeholder="One per line:&#10;Paper title, Journal name, Year"
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Awards */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="awards" className="mt-2 text-right">
                Awards
              </Label>
              <Textarea
                id="awards"
                name="awards"
                defaultValue={faculty.awards?.join('\n') || ''}
                placeholder="One per line:&#10;Best Teacher Award 2024"
                className="col-span-3 min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Joining Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="joiningDate" className="text-right">
                Joining Date
              </Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                defaultValue={
                  faculty.joiningDate
                    ? new Date(faculty.joiningDate).toISOString().split('T')[0]
                    : ''
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
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
