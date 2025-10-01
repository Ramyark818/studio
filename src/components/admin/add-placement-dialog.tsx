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
import type { Placement } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';

interface AddPlacementDialogProps {
  onAddPlacement: (newPlacement: Omit<Placement, 'id'>) => void;
}

export default function AddPlacementDialog({ onAddPlacement }: AddPlacementDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPlacement = {
      companyName: formData.get('companyName') as string,
      jobDescription: formData.get('jobDescription') as string,
      recruitingBranches: formData.get('recruitingBranches') as string,
      vacancies: parseInt(formData.get('vacancies') as string, 10),
      requiredSkills: (formData.get('requiredSkills') as string).split(',').map((s) => s.trim()),
      recruitmentProcess: formData.get('recruitmentProcess') as string,
      requiredCgpa: parseFloat(formData.get('requiredCgpa') as string),
      backlogsAllowed: formData.get('backlogsAllowed') === 'on',
      driveDate: formData.get('driveDate') as string,
    };

    if (
      Object.values(newPlacement).every(
        (field) =>
          field !== null &&
          field !== '' &&
          !isNaN(newPlacement.vacancies) &&
          !isNaN(newPlacement.requiredCgpa)
      )
    ) {
      onAddPlacement(newPlacement);
      toast.success('New placement drive added successfully!');
      setOpen(false);
      const form = e.currentTarget;
      if (form) {
        form.reset();
      }
    } else {
      toast.error('Please fill out all fields correctly.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Placement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Placement Drive</DialogTitle>
          <DialogDescription>
            Enter the details for the new placement. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Input id="jobDescription" name="jobDescription" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recruitingBranches">Recruiting Branches</Label>
              <Input id="recruitingBranches" name="recruitingBranches" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vacancies">Number of Vacancies</Label>
              <Input id="vacancies" name="vacancies" type="number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
              <Input id="requiredSkills" name="requiredSkills" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recruitmentProcess">Recruitment Process</Label>
              <Input id="recruitmentProcess" name="recruitmentProcess" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredCgpa">Required CGPA</Label>
              <Input id="requiredCgpa" name="requiredCgpa" type="number" step="0.1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driveDate">Date of Drive</Label>
              <Input id="driveDate" name="driveDate" type="date" required />
            </div>
            <div className="col-span-2 flex items-center space-x-2 pt-4">
              <Checkbox id="backlogsAllowed" name="backlogsAllowed" />
              <Label htmlFor="backlogsAllowed">Backlogs Allowed</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Placement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
