import PageHeader from '@/components/common/page-header';
import OverviewCard from '@/components/dashboard/overview-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockFacultyClasses, mockUser } from '@/lib/data';
import { Book, Users, Calendar } from 'lucide-react';

export default function FacultyDashboardPage() {
  const facultyClasses = mockFacultyClasses;
  const totalStudents = facultyClasses.reduce((sum, cls) => sum + cls.enrolledStudents, 0);

  return (
    <>
      <PageHeader
        title="Faculty Dashboard"
        description="Your teaching and student overview."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <OverviewCard icon={Book} title="Classes Taught" value={facultyClasses.length} description="Current Semester" />
        <OverviewCard icon={Users} title="Total Students" value={totalStudents} description="Current Semester" />
        <OverviewCard icon={Calendar} title="Office Hours This Week" value="6" description="Current Semester" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
          <CardDescription>A list of your currently assigned classes.</CardDescription>
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
                <TableRow key={cls.courseCode}>
                  <TableCell className="font-medium">{cls.courseCode}</TableCell>
                  <TableCell>{cls.courseName}</TableCell>
                  <TableCell>{cls.enrolledStudents}</TableCell>
                  <TableCell>{cls.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
