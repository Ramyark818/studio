'use client';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { mockFacultyClasses, mockClassStudents } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { generateClassSummaryReport, generateAttendanceReport } from '@/lib/reports';
import toast from 'react-hot-toast';
import type { FacultyClass } from '@/lib/types';

function ClassDetails({ classDetails }: { classDetails: FacultyClass }) {
  const students = mockClassStudents;

  const handleSaveAttendance = () => {
    toast.success("Attendance for today has been saved successfully!");
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
              <CardTitle>Class Attendance</CardTitle>
              <CardDescription>View enrolled students and mark attendance for today's class. Current date: {new Date().toLocaleDateString()}</CardDescription>
            </div>
             <Button onClick={handleSaveAttendance}>Save Attendance</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center w-[100px]">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Switch id={`attendance-${student.id}`} aria-label={`Mark ${student.name} as present`} defaultChecked />
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
            <Button variant="outline" onClick={() => generateClassSummaryReport(classDetails)}>
              <FileDown className="mr-2 h-4 w-4" />
              Download Class Summary
            </Button>
            <Button variant="outline" onClick={() => generateAttendanceReport(classDetails)}>
               <FileDown className="mr-2 h-4 w-4" />
              Download Attendance Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function ClassDetailsPage() {
  const params = useParams();
  const code = params.code as string;
  const classDetails = mockFacultyClasses.find(c => c.courseCode === code);

  if (!classDetails) {
    return (
      <>
        <PageHeader title="Class Not Found" description="The class you are looking for does not exist." />
        <p>Please check the course code and try again.</p>
      </>
    );
  }

  return <ClassDetails classDetails={classDetails} />;
}
