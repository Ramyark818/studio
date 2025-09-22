// Disabling SSR for this module as jspdf relies on browser APIs.
'use client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { FacultyClass, ClassStudent } from '@/lib/types';
import { mockClassStudents, mockActivities } from '@/lib/data';

// Extend jsPDF with autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

const generateReport = (title: string, filename: string, head: any[], body: any[][]) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  doc.autoTable({
    startY: 30,
    head: head,
    body: body,
  });
  
  doc.save(filename);
};

// Admin Reports
export const generateNaacReport = () => {
    const head = [['Activity ID', 'Title', 'Category', 'Date', 'Credits']];
    const body = mockActivities.map(a => [a.id, a.title, a.category, a.date, a.credits]);
    generateReport('NAAC Student Activity Report', 'naac_report.pdf', head, body);
  };
  
  export const generateAicteReport = () => {
    const head = [['Activity ID', 'Title', 'Category', 'Status']];
    const body = mockActivities.map(a => [a.id, a.title, a.category, a.status]);
    generateReport('AICTE Compliance Report', 'aicte_report.pdf', head, body);
  };
  
  export const generateNirfReport = () => {
    const head = [['Category', 'Approved Count', 'Pending Count', 'Total Credits']];
    const body = [
        ['Conference', 5, 2, 80],
        ['Workshop', 10, 1, 100],
        ['Internship', 8, 0, 320],
    ];
    generateReport('NIRF Data Submission Report', 'nirf_report.pdf', head, body);
  };

// Faculty Reports
export const generateClassSummaryReport = (classDetails: FacultyClass) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;

    doc.setFontSize(18);
    doc.text(`Class Summary: ${classDetails.courseCode}`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Course Name: ${classDetails.courseName}`, 14, 32);
    doc.text(`Enrolled Students: ${classDetails.enrolledStudents}`, 14, 38);

    doc.autoTable({
        startY: 50,
        head: [['Student ID', 'Student Name', 'Overall Score', 'Attendance %']],
        body: mockClassStudents.map(s => [s.id, s.name, `${Math.floor(Math.random() * 30) + 70}/100`, `${Math.floor(Math.random() * 15) + 85}%`]),
    });

    doc.save(`${classDetails.courseCode}_summary.pdf`);
}

export const generateAttendanceReport = (classDetails: FacultyClass) => {
    const head = [['Student ID', 'Student Name', 'Classes Attended', 'Total Classes', 'Percentage']];
    const body = mockClassStudents.map(s => [s.id, s.name, 42, 48, '87.5%']);
    generateReport(`Attendance Report: ${classDetails.courseCode}`, `${classDetails.courseCode}_attendance.pdf`, head, body);
}