import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold font-headline tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageHeader;
