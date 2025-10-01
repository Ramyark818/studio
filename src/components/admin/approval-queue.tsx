'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockActivities } from '@/lib/data';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApprovalQueue() {
  const pendingActivities = mockActivities.filter((a) => a.status === 'Pending');

  const handleApprove = (activityTitle: string) => {
    toast.success(`'${activityTitle}' has been approved.`);
  };

  const handleReject = (activityTitle: string) => {
    toast.error(`'${activityTitle}' has been rejected.`);
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingActivities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">Jane Doe</TableCell>
              <TableCell>{activity.title}</TableCell>
              <TableCell>{activity.category}</TableCell>
              <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600 hover:text-green-700"
                  onClick={() => handleApprove(activity.title)}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Approve</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleReject(activity.title)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {pendingActivities.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No pending approvals.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
