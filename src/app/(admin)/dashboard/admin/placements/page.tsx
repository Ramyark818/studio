'use client';
import { useState, useMemo } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockPlacements } from '@/lib/data';
import type { Placement } from '@/lib/types';
import EditPlacementDialog from '@/components/admin/edit-placement-dialog';
import { Badge } from '@/components/ui/badge';
import AddPlacementDialog from '@/components/admin/add-placement-dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function PlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>(mockPlacements);
  const [companySearch, setCompanySearch] = useState('');

  const handleUpdatePlacement = (updatedPlacement: Placement) => {
    setPlacements((prev) => prev.map((p) => (p.id === updatedPlacement.id ? updatedPlacement : p)));
  };

  const handleAddPlacement = (newPlacement: Omit<Placement, 'id'>) => {
    const newId = `PLC${(placements.length + 1).toString().padStart(3, '0')}`;
    setPlacements((prev) => [...prev, { ...newPlacement, id: newId }]);
  };

  const filteredPlacements = useMemo(() => {
    return placements.filter((placement) =>
      placement.companyName.toLowerCase().includes(companySearch.toLowerCase())
    );
  }, [placements, companySearch]);

  return (
    <>
      <PageHeader
        title="Placements"
        description="Manage placement drives and student placements."
      />
      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Upcoming Placement Drives</CardTitle>
            <CardDescription>View and manage all scheduled placement drives.</CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="relative sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by company..."
                className="pl-8"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
              />
            </div>
            <AddPlacementDialog onAddPlacement={handleAddPlacement} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
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
                {filteredPlacements.map((placement) => (
                  <TableRow key={placement.id}>
                    <TableCell className="whitespace-nowrap font-medium">
                      {placement.companyName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{placement.jobDescription}</TableCell>
                    <TableCell>{placement.recruitingBranches}</TableCell>
                    <TableCell>{placement.vacancies}</TableCell>
                    <TableCell>{placement.requiredSkills.join(', ')}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {placement.recruitmentProcess}
                    </TableCell>
                    <TableCell>{placement.requiredCgpa}</TableCell>
                    <TableCell>
                      <Badge variant={placement.backlogsAllowed ? 'default' : 'secondary'}>
                        {placement.backlogsAllowed ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{placement.driveDate}</TableCell>
                    <TableCell className="text-right">
                      <EditPlacementDialog
                        placement={placement}
                        onUpdatePlacement={handleUpdatePlacement}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPlacements.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      No placements found for your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
