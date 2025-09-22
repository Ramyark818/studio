import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { mockFacultyClasses, mockClassStudents } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export default function ClassDetailsPage({ params }: { params: { code: string } }) {
  const classDetails = mockFacultyClasses.find(c => c.courseCode === params.code);
  const students = mockClassStudents;

  if (!classDetails) {
    return (
      <>
        <PageHeader title="Class Not Found" description="The class you are looking for does not exist." />
        <p>Please check the course code and try again.</p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`${classDetails.courseCode}: ${classDetails.courseName}`}
        description={`Manage attendance, view student profiles, and generate reports for your class.`}
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Class Roster & Attendance</CardTitle>
              <CardDescription>Mark attendance for today's class. Current date: {new Date().toLocaleDateString()}</CardDescription>
            </div>
             <Button>Save Attendance</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox id={`attendance-${student.id}`} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" size="sm">View Profile</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and download reports for this class.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Download Class Summary
            </Button>
            <Button variant="outline">
               <FileDown className="mr-2 h-4 w-4" />
              Download Attendance Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
