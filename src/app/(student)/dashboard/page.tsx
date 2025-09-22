import PageHeader from '@/components/common/page-header';
import OverviewCard from '@/components/dashboard/overview-card';
import PerformanceChart from '@/components/dashboard/performance-chart';
import RecentActivities from '@/components/dashboard/recent-activities';
import { mockActivities, mockPerformance } from '@/lib/data';
import { BadgeCheck, BarChart3, Star, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const lastCgpa =
    mockPerformance.length > 0
      ? mockPerformance[mockPerformance.length - 1].cgpa
      : 0;
  const totalCredits = mockActivities
    .filter((a) => a.status === 'Approved')
    .reduce((sum, a) => sum + a.credits, 0);

  return (
    <>
      <PageHeader
        title="Welcome, Jane!"
        description="Here's a snapshot of your academic journey and achievements."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <OverviewCard
          icon={Star}
          title="Current CGPA"
          value={lastCgpa.toFixed(2)}
          description="Overall cumulative grade point average"
        />
        <OverviewCard
          icon={BadgeCheck}
          title="Total Credits"
          value={totalCredits}
          description="From approved activities"
        />
        <OverviewCard
          icon={TrendingUp}
          title="Attendance"
          value="92.5%"
          description="Overall attendance this semester"
        />
        <OverviewCard
          icon={BarChart3}
          title="Activities"
          value={mockActivities.length}
          description="Total activities submitted"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <PerformanceChart />
        <RecentActivities />
      </div>
    </>
  );
}
