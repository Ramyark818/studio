'use client';
import PageHeader from '@/components/common/page-header';
import OverviewCard from '@/components/dashboard/overview-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { mockFacultyList } from '@/lib/data';
import { Users, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import FacultyAttendanceChart from '@/components/admin/faculty-attendance-chart';

export default function FacultyAttendancePage() {
  const totalFaculty = mockFacultyList.length;
  // Dummy percentages for display
  const presentPercentage = 88; 
  const absentPercentage = 12;

  const handleSaveAttendance = () => {
    toast.success("Faculty attendance for today has been saved successfully!");
  }

  return (
    <>
      <PageHeader
        title="Faculty Attendance"
        description="View and manage faculty attendance records."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <OverviewCard icon={Users} title="Total Faculty" value={totalFaculty} description="All departments" />
        <OverviewCard icon={UserCheck} title="Present Today" value={`${presentPercentage}%`} description="Faculty marked as present" />
        <OverviewCard icon={UserX} title="Absent Today" value={`${absentPercentage}%`} description="Faculty marked as absent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <FacultyAttendanceChart />
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Daily Attendance</CardTitle>
              <CardDescription>Mark attendance for {new Date().toLocaleDateString()}</CardDescription>
            </div>
            <Button onClick={handleSaveAttendance}>Save Attendance</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faculty ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center w-[100px]">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFacultyList.map(faculty => (
                    <TableRow key={faculty.id}>
                      <TableCell className="font-medium">{faculty.id}</TableCell>
                      <TableCell>{faculty.name}</TableCell>
                      <TableCell>{faculty.department}</TableCell>
                      <TableCell className="text-center">
                        <Switch id={`attendance-${faculty.id}`} aria-label={`Mark ${faculty.name} as present`} defaultChecked />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
