'use client';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockClassStudents, mockFacultyProfile } from '@/lib/data';

const students = mockClassStudents.slice(0, 3).map(s => ({...s, course: 'B.Tech CS'}));
const faculty = [
    {id: 'FAC001', name: mockFacultyProfile.name, department: 'Computer Science' }
]

export default function UserManagementPage() {
  return (
    <>
      <PageHeader
        title="User Management"
        description="Manage student and faculty accounts."
      />
      <Card>
        <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>View, edit, or remove student and faculty members.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="students">
                <TabsList>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                   <div className="rounded-lg border mt-4">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                   </div>
                </TabsContent>
                <TabsContent value="faculty">
                  <div className="rounded-lg border mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Faculty ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faculty.map(fac => (
                                <TableRow key={fac.id}>
                                    <TableCell>{fac.id}</TableCell>
                                    <TableCell>{fac.name}</TableCell>
                                    <TableCell>{fac.department}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
