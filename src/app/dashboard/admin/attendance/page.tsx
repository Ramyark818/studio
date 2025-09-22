import PageHeader from '@/components/common/page-header';

export default function FacultyAttendancePage() {
  return (
    <>
      <PageHeader
        title="Faculty Attendance"
        description="View and manage faculty attendance records."
      />
       <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Faculty Attendance Management coming soon...</p>
      </div>
    </>
  );
}
