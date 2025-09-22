import PageHeader from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { mockUser, mockActivities } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import type { Activity } from '@/lib/types';
import PortfolioSection from '@/components/portfolio/portfolio-section';

export default function PortfolioPage() {
  const user = mockUser;
  const approvedActivities = mockActivities.filter(a => a.status === 'Approved');

  const categorizedActivities = approvedActivities.reduce((acc, activity) => {
    const category = activity.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <PageHeader
          title="Digital Portfolio"
          description="A verified summary of your achievements, ready to be shared."
        />
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Copy Shareable Link
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="woman portrait" />
                        <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-3xl font-bold font-headline">{user.name}</h2>
                        <p className="text-muted-foreground">{user.course}</p>
                        <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        {Object.entries(categorizedActivities).map(([category, activities]) => (
            <PortfolioSection key={category} title={category} activities={activities} />
        ))}
      </div>
    </>
  );
}
