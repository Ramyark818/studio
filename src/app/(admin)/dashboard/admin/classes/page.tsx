'use client';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockFacultyClasses } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import AddClassDialog from '@/components/admin/add-class-dialog';

export default function ClassManagementPage() {
  const classes = mockFacultyClasses;
  
  return (
    <>
      <PageHeader
        title="Class Management"
        description="Manage all classes across the institution."
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Classes</CardTitle>
            <CardDescription>View, edit, or add new classes.</CardDescription>
          </div>
          <AddClassDialog />
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Enrolled Students</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map(cls => (
                  <TableRow key={cls.courseCode}>
                    <TableCell>{cls.courseCode}</TableCell>
                    <TableCell>{cls.courseName}</TableCell>
                    <TableCell>{cls.enrolledStudents}</TableCell>
                    <TableCell>{cls.semester}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit</Button>
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
