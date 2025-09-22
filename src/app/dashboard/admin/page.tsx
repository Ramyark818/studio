import PageHeader from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ApprovalQueue from '@/components/admin/approval-queue';
import { FileDown } from 'lucide-react';

export default function AdminPage() {
  return (
    <>
      <PageHeader
        title="Admin Panel"
        description="Manage student activities and generate institutional reports."
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Reporting</CardTitle>
            <CardDescription>
              Generate consolidated reports for accreditation and evaluation purposes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Generate NAAC Report
            </Button>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Generate AICTE Report
            </Button>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Generate NIRF Report
            </Button>
          </CardContent>
        </Card>

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
