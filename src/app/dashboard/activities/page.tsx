import PageHeader from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ActivityTable from '@/components/activities/activity-table';

export default function ActivitiesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="My Activities"
          description="Track and manage all your co-curricular and extracurricular activities."
        />
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>
      <ActivityTable />
    </>
  );
}
