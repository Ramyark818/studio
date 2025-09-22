'use client';
import Link from 'next/link';
import PageHeader from '@/components/common/page-header';
import OverviewCard from '@/components/dashboard/overview-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockFacultyClasses } from '@/lib/data';
import { Book, Users, Percent, BarChart } from 'lucide-react';
import AttendanceChart from '@/components/faculty/attendance-chart';
import MarksDistributionChart from '@/components/faculty/marks-distribution-chart';

export default function FacultyDashboardPage() {
  const facultyClasses = mockFacultyClasses;
  const totalStudents = facultyClasses.reduce((sum, cls) => sum + cls.enrolledStudents, 0);

  return (
    <>
      <PageHeader
        title="Faculty Dashboard"
        description="Your teaching and student overview."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <OverviewCard icon={Book} title="Classes Taught" value={facultyClasses.length} description="Current Semester" />
        <OverviewCard icon={Users} title="Total Students" value={totalStudents} description="Across all classes" />
        <OverviewCard icon={Percent} title="Avg. Attendance" value="88%" description="Across all classes" />
        <OverviewCard icon={BarChart} title="Avg. Score" value="76/100" description="Across all classes" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttendanceChart />
        <MarksDistributionChart />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
          <CardDescription>A list of your currently assigned classes. Click a class to view details.</CardDescription>
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
