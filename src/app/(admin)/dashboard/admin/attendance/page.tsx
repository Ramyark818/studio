'use client';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { mockFacultyList } from '@/lib/data';
import toast from 'react-hot-toast';

export default function FacultyAttendancePage() {
  const handleSaveAttendance = () => {
    toast.success("Faculty attendance for today has been saved successfully!");
  }

  return (
    <>
      <PageHeader
        title="Faculty Attendance"
        description="Manage faculty attendance records."
      />
      <Card>
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
    </>
  );
}
