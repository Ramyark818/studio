'use client';
import Link from 'next/link';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockFacultyClasses } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function FacultyClassesPage() {
  const facultyClasses = mockFacultyClasses;

  return (
    <>
      <PageHeader
        title="My Classes"
        description="A list of your currently assigned classes. Click a class to view details."
      />
      <Card>
        <CardHeader>
          <CardTitle>All Assigned Classes</CardTitle>
          <CardDescription>Select a class to manage attendance and view student details.</CardDescription>
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
                {facultyClasses.map((cls) => (
                  <TableRow key={cls.courseCode}>
                    <TableCell className="font-medium">{cls.courseCode}</TableCell>
                    <TableCell>{cls.courseName}</TableCell>
                    <TableCell>{cls.enrolledStudents}</TableCell>
                    <TableCell>{cls.semester}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm">
                        <Link href={`/dashboard/faculty/class/${cls.courseCode}`}>
                          View Class
                        </Link>
                      </Button>
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
