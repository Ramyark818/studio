'use client';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AddStudentDialog from '@/components/admin/add-student-dialog';
import AddFacultyDialog from '@/components/admin/add-faculty-dialog';
import EditStudentDialog from '@/components/admin/edit-student-dialog';
import EditFacultyDialog from '@/components/admin/edit-faculty-dialog';
import DeleteStudentDialog from '@/components/admin/delete-student-dialog';
import DeleteFacultyDialog from '@/components/admin/delete-faculty-dialog';
import { Badge } from '@/components/ui/badge';
import { StudentTableSkeleton, FacultyTableSkeleton } from '@/components/ui/table-skeleton';
import { UserManagementSkeleton } from '@/components/common/user-management-skeleton';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';

export interface Student {
  _id: string;
  studentId: string;
  name: string;
  email: string;
  course: string;
  department: string;
  dateOfBirth: string;
  feesPaid: boolean;
  caste: string;
  gender: 'Male' | 'Female' | 'Other';
  documentsSubmitted: boolean;
  tenthMarks: string;
  twelfthMarks: string;
  cgpa?: number;
  semester?: string;
  enrollmentYear: number;
}

interface Faculty {
  _id: string;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  expertise: string[];
  qualifications: string[];
  experience: number;
  contact: {
    phone: string;
    office: string;
  };
  publications?: string[];
  awards?: string[];
  joiningDate: string;
}

export default function UserManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [facultyLoading, setFacultyLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchStudents();
    fetchFaculty();
  }, []);

  const fetchStudents = async () => {
    try {
      setStudentsLoading(true);
      const response = await apiClient.getStudents({ limit: 100 });
      if (response.success) {
        setStudents(response.data.students);
      } else {
        toast.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error fetching students');
    } finally {
      setStudentsLoading(false);
      setLoading(false);
    }
  };

  const fetchFaculty = async () => {
    try {
      setFacultyLoading(true);
      const response = await apiClient.getFaculty({ limit: 100 });
      if (response.success) {
        setFaculty(response.data.faculty);
      } else {
        toast.error('Failed to fetch faculty');
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      toast.error('Error fetching faculty');
    } finally {
      setFacultyLoading(false);
    }
  };

  const handleAddStudent = async (newStudentData: any) => {
    try {
      const response = await apiClient.createStudent(newStudentData);
      if (response.success) {
        toast.success('Student added successfully!');
        await fetchStudents(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to add student');
        return false;
      }
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Error adding student');
      return false;
    }
  };

  const handleUpdateStudent = async (studentId: string, updatedData: any) => {
    try {
      const response = await apiClient.updateStudent(studentId, updatedData);
      if (response.success) {
        toast.success('Student updated successfully!');
        await fetchStudents(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to update student');
        return false;
      }
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Error updating student');
      return false;
    }
  };

  const handleAddFaculty = async (newFacultyData: any) => {
    try {
      const response = await apiClient.createFaculty(newFacultyData);
      if (response.success) {
        toast.success('Faculty added successfully!');
        await fetchFaculty(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to add faculty');
        return false;
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast.error('Error adding faculty');
      return false;
    }
  };

  const handleUpdateFaculty = async (facultyId: string, updatedData: any) => {
    try {
      const response = await apiClient.updateFaculty(facultyId, updatedData);
      if (response.success) {
        toast.success('Faculty updated successfully!');
        await fetchFaculty(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to update faculty');
        return false;
      }
    } catch (error) {
      console.error('Error updating faculty:', error);
      toast.error('Error updating faculty');
      return false;
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      const response = await apiClient.deleteStudent(studentId);
      if (response.success) {
        toast.success('Student deleted successfully!');
        await fetchStudents(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to delete student');
        return false;
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student');
      return false;
    }
  };

  const handleDeleteFaculty = async (facultyId: string) => {
    try {
      const response = await apiClient.deleteFaculty(facultyId);
      if (response.success) {
        toast.success('Faculty deleted successfully!');
        await fetchFaculty(); // Refresh the list
        return true;
      } else {
        toast.error(response.message || 'Failed to delete faculty');
        return false;
      }
    } catch (error) {
      console.error('Error deleting faculty:', error);
      toast.error('Error deleting faculty');
      return false;
    }
  };

  if (loading) {
    return <UserManagementSkeleton />;
  }

  return (
    <>
      <PageHeader title="User Management" description="Manage student and faculty accounts." />
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>View, edit, or remove student and faculty members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="students">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
              <div className="mt-4 overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Students ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>DOB</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Caste</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Docs</TableHead>
                      <TableHead>10th</TableHead>
                      <TableHead>12th</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsLoading ? (
                      <StudentTableSkeleton />
                    ) : students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="py-8 text-center text-muted-foreground">
                          No students found. Add a student to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student._id}>
                          <TableCell className="whitespace-nowrap">{student.studentId}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {new Date(student.dateOfBirth).toLocaleDateString()}
                          </TableCell>
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
                            <div className="flex justify-end gap-2">
                              <EditStudentDialog
                                student={student}
                                onUpdateStudent={handleUpdateStudent}
                              />
                              <DeleteStudentDialog
                                student={student}
                                onDeleteStudent={handleDeleteStudent}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="faculty">
              <div className="mt-4 overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Qualifications</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyLoading ? (
                      <FacultyTableSkeleton />
                    ) : faculty.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                          No faculty found. Add a faculty member to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      faculty.map((fac) => (
                        <TableRow key={fac._id}>
                          <TableCell className="whitespace-nowrap">{fac.facultyId}</TableCell>
                          <TableCell className="whitespace-nowrap">{fac.name}</TableCell>
                          <TableCell className="whitespace-nowrap">{fac.department}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {fac.contact?.phone || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {fac.qualifications && fac.qualifications.length > 0
                                ? fac.qualifications.join(', ')
                                : 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell>
                            {fac.experience} {fac.experience === 1 ? 'year' : 'years'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <EditFacultyDialog
                                faculty={fac}
                                onUpdateFaculty={handleUpdateFaculty}
                              />
                              <DeleteFacultyDialog
                                faculty={fac}
                                onDeleteFaculty={handleDeleteFaculty}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
