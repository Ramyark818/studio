import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Activity } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface PortfolioSectionProps {
  title: string;
  activities: Activity[];
}

const PortfolioSection: FC<PortfolioSectionProps> = ({ title, activities }) => {
    if (activities.length === 0) {
        return null;
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={activity.id}>
              <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                    <p className="text-sm font-medium text-primary">{activity.credits} Credits</p>
                </div>
                <p className="mt-2 text-sm">{activity.description}</p>
              </div>
              {index < activities.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
