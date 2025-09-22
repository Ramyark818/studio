import PageHeader from '@/components/common/page-header';
import ApprovalQueue from '@/components/admin/approval-queue';

export default function FacultyApprovalsPage() {
  return (
    <>
      <PageHeader
        title="Document Approvals"
        description="Review and approve pending submissions from students."
      />
      <ApprovalQueue />
    </>
  );
}
