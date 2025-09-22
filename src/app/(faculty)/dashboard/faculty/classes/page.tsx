'use client';
import Link from 'next/link';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockFacultyClasses } from '@/lib/data';

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Enrolled Students</TableHead>
                <TableHead>Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultyClasses.map((cls) => (
                 <TableRow key={cls.courseCode} className="cursor-pointer hover:bg-muted/50">
                   <TableCell className="font-medium p-0">
                     <Link href={`/dashboard/faculty/class/${cls.courseCode}`} className="block w-full h-full p-4">
                       {cls.courseCode}
                     </Link>
                   </TableCell>
                   <TableCell className="p-0">
                      <Link href={`/dashboard/faculty/class/${cls.courseCode}`} className="block w-full h-full p-4">
                        {cls.courseName}
                      </Link>
                   </TableCell>
                   <TableCell className="p-0">
                      <Link href={`/dashboard/faculty/class/${cls.courseCode}`} className="block w-full h-full p-4">
                        {cls.enrolledStudents}
                      </Link>
                   </TableCell>
                   <TableCell className="p-0">
                      <Link href={`/dashboard/faculty/class/${cls.courseCode}`} className="block w-full h-full p-4">
                        {cls.semester}
                      </Link>
                   </TableCell>
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
