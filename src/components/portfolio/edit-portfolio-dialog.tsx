'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FilePenLine, Loader2 } from 'lucide-react';
import type { Portfolio } from '@/lib/types';
import toast from 'react-hot-toast';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { authClient } from '@/lib/auth';

const portfolioSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  major: z.string().min(1, 'Major is required'),
  degree: z.string().min(1, 'Degree is required'),
  summary: z.string().min(1, 'Summary is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  github: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  interests: z.string(),
  skills: z.string(),
  awards: z.string(),
  certifications: z.string(),
  projects: z.string(),
  publications: z.string(),
  voluntaryWork: z.string(),
  languages: z.string(),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

interface EditPortfolioDialogProps {
  portfolio: Portfolio;
  onPortfolioUpdate?: (updatedData: any) => void;
}

export default function EditPortfolioDialog({
  portfolio,
  onPortfolioUpdate,
}: EditPortfolioDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      name: portfolio.user.name,
      major: portfolio.user.major,
      degree: portfolio.user.degree,
      summary: portfolio.summary,
      email: portfolio.contact.find((c) => c.type === 'Email')?.handle || '',
      phone: portfolio.contact.find((c) => c.type === 'Phone')?.handle || '',
      address: portfolio.contact.find((c) => c.type === 'Address')?.handle || '',
      website: portfolio.contact.find((c) => c.type === 'Website')?.url || '',
      linkedin: portfolio.contact.find((c) => c.type === 'LinkedIn')?.url || '',
      github: portfolio.contact.find((c) => c.type === 'GitHub')?.url || '',
      interests: portfolio.interests.join(', '),
      skills: portfolio.skills.flatMap((cat) => cat.skills).join(', '),
      awards: portfolio.awards.join('\n'),
      certifications: portfolio.certifications.join('\n'),
      projects: portfolio.projects.join('\n'),
      publications: portfolio.publications.join('\n'),
      voluntaryWork: portfolio.voluntaryWork.join('\n'),
      languages: portfolio.languages.map((l) => `${l.name} (${l.proficiency})`).join('\n'),
    },
  });

  const onSubmit = async (data: PortfolioFormValues) => {
    setIsLoading(true);

    try {
      const token = authClient.getToken();

      if (!token) {
        toast.error('Authentication required');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Portfolio updated successfully!');
        setOpen(false); // Close popup immediately on success

        // Notify parent component if callback provided
        if (onPortfolioUpdate) {
          onPortfolioUpdate(data);
        }
      } else {
        toast.error(result.message || 'Failed to update portfolio');
      }
    } catch (error) {
      console.error('Error updating portfolio:', error);
      toast.error('Error updating portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilePenLine className="mr-2 h-4 w-4" />
          Edit Portfolio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief professional summary..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Major</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Computer Science Major" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bachelor of Science..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@sankalan.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91-9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 University Ave, Tech City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-website.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter skills separated by commas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests / Hobbies</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter interests separated by commas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter each language on a new line, e.g., English (Professional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter each certification on a new line" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="awards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Awards</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter each award on a new line" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projects</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter each project on a new line" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publications</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter each publication on a new line" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voluntaryWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voluntary Work</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter each voluntary work on a new line"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-6">
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
