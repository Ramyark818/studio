
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
import type { Placement } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

interface EditPlacementDialogProps {
    placement: Placement;
    onUpdatePlacement: (updatedPlacement: Placement) => void;
}

export default function EditPlacementDialog({ placement, onUpdatePlacement }: EditPlacementDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedPlacement = {
        ...placement,
        companyName: formData.get('companyName') as string,
        jobDescription: formData.get('jobDescription') as string,
        recruitingBranches: formData.get('recruitingBranches') as string,
        vacancies: parseInt(formData.get('vacancies') as string, 10),
        requiredSkills: (formData.get('requiredSkills') as string).split(',').map(s => s.trim()),
        recruitmentProcess: formData.get('recruitmentProcess') as string,
        requiredCgpa: parseFloat(formData.get('requiredCgpa') as string),
        backlogsAllowed: formData.get('backlogsAllowed') === 'on',
        driveDate: formData.get('driveDate') as string,
    };

    if (Object.values(updatedPlacement).every(field => field !== null && field !== '' && !isNaN(updatedPlacement.vacancies) && !isNaN(updatedPlacement.requiredCgpa))) {
        onUpdatePlacement(updatedPlacement);
        toast.success('Placement details updated successfully!');
        setOpen(false);
    } else {
        toast.error('Please fill out all fields correctly.');
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
          <DialogTitle>Edit Placement Drive</DialogTitle>
          <DialogDescription>
            Make changes to the placement details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <ScrollArea className="h-[60vh] pr-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" name="companyName" defaultValue={placement.companyName} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jobDescription">Job Description</Label>
                        <Input id="jobDescription" name="jobDescription" defaultValue={placement.jobDescription} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="recruitingBranches">Recruiting Branches</Label>
                        <Input id="recruitingBranches" name="recruitingBranches" defaultValue={placement.recruitingBranches} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vacancies">Number of Vacancies</Label>
                        <Input id="vacancies" name="vacancies" type="number" defaultValue={placement.vacancies} required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
                        <Input id="requiredSkills" name="requiredSkills" defaultValue={placement.requiredSkills.join(', ')} required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="recruitmentProcess">Recruitment Process</Label>
                        <Input id="recruitmentProcess" name="recruitmentProcess" defaultValue={placement.recruitmentProcess} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="requiredCgpa">Required CGPA</Label>
                        <Input id="requiredCgpa" name="requiredCgpa" type="number" step="0.1" defaultValue={placement.requiredCgpa} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="driveDate">Date of Drive</Label>
                        <Input id="driveDate" name="driveDate" type="date" defaultValue={placement.driveDate} required />
                    </div>
                    <div className="flex items-center space-x-2 pt-4 col-span-2">
                        <Checkbox id="backlogsAllowed" name="backlogsAllowed" defaultChecked={placement.backlogsAllowed} />
                        <Label htmlFor="backlogsAllowed">Backlogs Allowed</Label>
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
