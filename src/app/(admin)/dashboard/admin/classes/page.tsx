
'use client';
import { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockFacultyClasses } from '@/lib/data';
import AddClassDialog from '@/components/admin/add-class-dialog';
import type { FacultyClass } from '@/lib/types';
import EditClassDialog from '@/components/admin/edit-class-dialog';

export default function ClassManagementPage() {
  const [classes, setClasses] = useState<FacultyClass[]>(mockFacultyClasses);
  
  const handleAddClass = (newClass: Omit<FacultyClass, 'enrolledStudents'>) => {
    setClasses(prev => [...prev, { ...newClass, enrolledStudents: 0 }]);
  };

  const handleUpdateClass = (updatedClass: FacultyClass) => {
    setClasses(prev => prev.map(c => c.courseCode === updatedClass.courseCode ? updatedClass : c));
  };

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
          <AddClassDialog onAddClass={handleAddClass} />
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
                      <EditClassDialog classData={cls} onUpdateClass={handleUpdateClass} />
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
