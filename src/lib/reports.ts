// Disabling SSR for this module as jspdf relies on browser APIs.
'use client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { FacultyClass, ClassStudent, Portfolio, CategorizedSkills } from '@/lib/types';
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
  const body = mockActivities.map((a) => [a.id, a.title, a.category, a.date, a.credits]);
  generateReport('NAAC Student Activity Report', 'naac_report.pdf', head, body);
};

export const generateAicteReport = () => {
  const head = [['Activity ID', 'Title', 'Category', 'Status']];
  const body = mockActivities.map((a) => [a.id, a.title, a.category, a.status]);
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
    body: mockClassStudents.map((s) => [
      s.id,
      s.name,
      `${Math.floor(Math.random() * 30) + 70}/100`,
      `${Math.floor(Math.random() * 15) + 85}%`,
    ]),
  });

  doc.save(`${classDetails.courseCode}_summary.pdf`);
};

export const generateAttendanceReport = (classDetails: FacultyClass) => {
  const head = [['Student ID', 'Student Name', 'Classes Attended', 'Total Classes', 'Percentage']];
  const body = mockClassStudents.map((s) => [s.id, s.name, 42, 48, '87.5%']);
  generateReport(
    `Attendance Report: ${classDetails.courseCode}`,
    `${classDetails.courseCode}_attendance.pdf`,
    head,
    body
  );
};

// Student Portfolio PDF
export const generatePortfolioPdf = (portfolio: Portfolio) => {
  const doc = new jsPDF();
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(portfolio.user.name, pageWidth / 2, y, { align: 'center' });
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contactInfo = portfolio.contact
    .map((c) => (c.type === 'Email' ? c.handle : c.type === 'Phone' ? c.handle : null))
    .filter(Boolean)
    .join(' | ');
  doc.text(contactInfo, pageWidth / 2, y, { align: 'center' });
  y += 4;

  const links = portfolio.contact
    .filter((c) => ['LinkedIn', 'GitHub', 'Website'].includes(c.type))
    .map((c) => `${c.type}: ${c.url}`)
    .join(' | ');
  doc.text(links, pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(portfolio.summary, pageWidth - margin * 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 4;

  const drawSection = (title: string, items: string[] | CategorizedSkills[]) => {
    if (items.length === 0) return;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    if (title === 'Skills' && typeof items[0] !== 'string') {
      (items as CategorizedSkills[]).forEach((category) => {
        doc.setFont('helvetica', 'bold');
        doc.text(category.category, margin, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        const skillsLine = category.skills.join(', ');
        const skillLines = doc.splitTextToSize(skillsLine, pageWidth - margin * 2);
        doc.text(skillLines, margin, y);
        y += skillLines.length * 5 + 2;
      });
    } else {
      (items as string[]).forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const itemLines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 5);
        doc.text(itemLines, margin, y);
        y += itemLines.length * 5;
      });
    }
    y += 4;
  };

  // Education
  if (portfolio.education.length > 0) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', margin, y);
    y += 6;
    doc.setFontSize(10);
    portfolio.education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.text(edu.institution, margin, y);
      doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.degree} - ${edu.details}`, margin, y);
      y += 7;
    });
  }

  drawSection('Skills', portfolio.skills);
  drawSection('Projects', portfolio.projects);
  drawSection('Certifications', portfolio.certifications);
  drawSection('Awards', portfolio.awards);
  drawSection('Voluntary Work', portfolio.voluntaryWork);

  doc.save(`${portfolio.user.name.replace(' ', '_')}_Resume.pdf`);
};
