
'use client';
import { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockPlacements } from '@/lib/data';
import type { Placement } from '@/lib/types';
import EditPlacementDialog from '@/components/admin/edit-placement-dialog';
import { Badge } from '@/components/ui/badge';

export default function PlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>(mockPlacements);

  const handleUpdatePlacement = (updatedPlacement: Placement) => {
    setPlacements(prev => prev.map(p => p.id === updatedPlacement.id ? updatedPlacement : p));
  };

  return (
    <>
      <PageHeader
        title="Placements"
        description="Manage placement drives and student placements."
      />
      <Card>
        <CardHeader>
            <CardTitle>Upcoming Placement Drives</CardTitle>
            <CardDescription>View and manage all scheduled placement drives.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Branches</TableHead>
                            <TableHead>Vacancies</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Process</TableHead>
                            <TableHead>CGPA</TableHead>
                            <TableHead>Backlogs</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {placements.map(placement => (
                            <TableRow key={placement.id}>
                                <TableCell className="font-medium">{placement.companyName}</TableCell>
                                <TableCell>{placement.jobDescription}</TableCell>
                                <TableCell>{placement.recruitingBranches}</TableCell>
                                <TableCell>{placement.vacancies}</TableCell>
                                <TableCell>{placement.requiredSkills.join(', ')}</TableCell>
                                <TableCell>{placement.recruitmentProcess}</TableCell>
                                <TableCell>{placement.requiredCgpa}</TableCell>
                                <TableCell>
                                     <Badge variant={placement.backlogsAllowed ? 'default' : 'secondary'}>
                                        {placement.backlogsAllowed ? 'Yes' : 'No'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{placement.driveDate}</TableCell>
                                <TableCell className="text-right">
                                    <EditPlacementDialog placement={placement} onUpdatePlacement={handleUpdatePlacement} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
