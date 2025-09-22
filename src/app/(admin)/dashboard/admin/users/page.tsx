
'use client';
import { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClassStudents, mockFacultyProfile } from '@/lib/data';
import AddStudentDialog from '@/components/admin/add-student-dialog';
import AddFacultyDialog from '@/components/admin/add-faculty-dialog';
import EditStudentDialog from '@/components/admin/edit-student-dialog';
import EditFacultyDialog from '@/components/admin/edit-faculty-dialog';
import type { ClassStudent } from '@/lib/types';

interface Student extends ClassStudent {
    course: string;
}
interface Faculty {
    id: string;
    name: string;
    department: string;
}

export default function UserManagementPage() {
    const [students, setStudents] = useState<Student[]>(mockClassStudents.slice(0, 3).map(s => ({...s, course: 'B.Tech CS'})));
    const [faculty, setFaculty] = useState<Faculty[]>([
        {id: 'FAC001', name: mockFacultyProfile.name, department: 'Computer Science' }
    ]);

    const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
        const newId = `STU${(students.length + 1).toString().padStart(3, '0')}`;
        setStudents(prev => [...prev, { ...newStudent, id: newId }]);
    };

    const handleUpdateStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    };

    const handleAddFaculty = (newFaculty: Omit<Faculty, 'id'>) => {
        const newId = `FAC${(faculty.length + 1).toString().padStart(3, '0')}`;
        setFaculty(prev => [...prev, { ...newFaculty, id: newId }]);
    };

    const handleUpdateFaculty = (updatedFaculty: Faculty) => {
        setFaculty(prev => prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
    };

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
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="faculty">Faculty</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                       <AddStudentDialog onAddStudent={handleAddStudent} />
                       <AddFacultyDialog onAddFaculty={handleAddFaculty} />
                    </div>
                </div>
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
                                        <EditStudentDialog student={student} onUpdateStudent={handleUpdateStudent} />
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
                                        <EditFacultyDialog faculty={fac} onUpdateFaculty={handleUpdateFaculty} />
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
