
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
import { Badge } from '@/components/ui/badge';

export interface Student extends ClassStudent {
    course: string;
    dateOfBirth: string;
    feesPaid: boolean;
    caste: string;
    gender: 'Male' | 'Female' | 'Other';
    documentsSubmitted: boolean;
    tenthMarks: string;
    twelfthMarks: string;
}
interface Faculty {
    id: string;
    name: string;
    department: string;
}

export default function UserManagementPage() {
    const [students, setStudents] = useState<Student[]>(mockClassStudents.slice(0, 3).map((s, i) => ({
        ...s,
        course: 'B.Tech CS',
        dateOfBirth: ['1998-05-12', '1999-02-20', '1998-11-30'][i],
        feesPaid: [true, false, true][i],
        caste: ['General', 'OBC', 'SC'][i],
        gender: ['Male', 'Female', 'Male'][i] as 'Male' | 'Female' | 'Other',
        documentsSubmitted: [true, true, false][i],
        tenthMarks: ['92%', '88%', '95%'][i],
        twelfthMarks: ['90%', '85%', '93%'][i],
    })));
    
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                   <div className="rounded-lg border mt-4 overflow-x-auto">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>DOB</TableHead>
                                <TableHead>Fees</TableHead>
                                <TableHead>Caste</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Docs</TableHead>
                                <TableHead>10th</TableHead>
                                <TableHead>12th</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="whitespace-nowrap">{student.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{student.dateOfBirth}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.feesPaid ? 'default' : 'destructive'}>
                                            {student.feesPaid ? 'Paid' : 'Due'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{student.caste}</TableCell>
                                    <TableCell>{student.gender}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.documentsSubmitted ? 'default' : 'secondary'}>
                                            {student.documentsSubmitted ? 'Yes' : 'No'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{student.tenthMarks}</TableCell>
                                    <TableCell>{student.twelfthMarks}</TableCell>
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
                  <div className="rounded-lg border mt-4 overflow-x-auto">
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
                                    <TableCell className="whitespace-nowrap">{fac.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{fac.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{fac.department}</TableCell>
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
