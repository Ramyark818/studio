'use client';

import PageHeader from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';

export default function UploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your document has been sent for faculty approval.");
    // Reset form logic
    const form = e.currentTarget;
    if (form) {
      form.reset();
    }
    setFileName(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };


  return (
    <>
      <PageHeader
        title="Upload Records"
        description="Submit your academic documents for faculty approval."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Submit Document for Faculty Approval</CardTitle>
          <CardDescription>
            Upload supporting documents for your experiences, achievements, or other records to be officially approved and added to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select>
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Select a document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="club-activity">Club Activity</SelectItem>
                    <SelectItem value="volunteering">Volunteering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-title">Document Title</Label>
                <Input id="document-title" placeholder="e.g., Summer Internship at TechCorp" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">File</Label>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 p-2 rounded-md border border-input bg-muted/50 hover:bg-muted">
                  <UploadCloud className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                      {fileName || 'Choose File'}
                  </span>
                  <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </div>
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea id="comments" placeholder="Add any relevant notes for the faculty reviewer..." />
            </div>
            <Button type="submit">
              Submit for Approval
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
