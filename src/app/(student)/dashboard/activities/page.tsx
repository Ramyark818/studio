import PageHeader from '@/components/common/page-header';
import ActivityTable from '@/components/activities/activity-table';

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="My Activities"
        description="A complete record of all your submitted activities and their status."
      />
      <ActivityTable />
    </>
  );
}
