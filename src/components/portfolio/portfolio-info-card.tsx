import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface PortfolioInfoCardProps<T> {
  icon: LucideIcon;
  title: string;
  items: T[];
  renderItem?: (item: T) => ReactNode;
}

const PortfolioInfoCard = <T extends any>({
  icon: Icon,
  title,
  items,
  renderItem,
}: PortfolioInfoCardProps<T>) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
                {renderItem ? renderItem(item) : <>
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                </>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PortfolioInfoCard;
