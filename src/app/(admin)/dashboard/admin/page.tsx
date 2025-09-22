'use client';
import PageHeader from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ApprovalQueue from '@/components/admin/approval-queue';
import { FileDown, Users, UserCheck, UserX } from 'lucide-react';
import { generateNaacReport, generateAicteReport, generateNirfReport } from '@/lib/reports';
import OverviewCard from '@/components/dashboard/overview-card';
import { mockFacultyList } from '@/lib/data';
import FacultyAttendanceChart from '@/components/admin/faculty-attendance-chart';

export default function AdminPage() {
  const totalFaculty = mockFacultyList.length;
  // Dummy percentages for display
  const presentPercentage = 88; 
  const absentPercentage = 12;

  return (
    <>
      <PageHeader
        title="Admin Panel"
        description="Manage student activities and generate institutional reports."
      />

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <OverviewCard icon={Users} title="Total Faculty" value={totalFaculty} description="All departments" />
          <OverviewCard icon={UserCheck} title="Present Today" value={`${presentPercentage}%`} description="Faculty marked as present" />
          <OverviewCard icon={UserX} title="Absent Today" value={`${absentPercentage}%`} description="Faculty marked as absent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <FacultyAttendanceChart />
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Reporting</CardTitle>
                  <CardDescription>
                    Generate consolidated reports for accreditation and evaluation purposes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={generateNaacReport}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Generate NAAC Report
                  </Button>
                  <Button variant="outline" onClick={generateAicteReport}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Generate AICTE Report
                  </Button>
                  <Button variant="outline" onClick={generateNirfReport}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Generate NIRF Report
                  </Button>
                </CardContent>
              </Card>
            </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Activity Approval Queue</CardTitle>
            <CardDescription>
              Review and approve pending submissions from students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApprovalQueue />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
