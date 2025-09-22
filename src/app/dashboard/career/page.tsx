import PageHeader from '@/components/common/page-header';

export default function CareerPage() {
  return (
    <>
      <PageHeader
        title="Career Guide"
        description="Get personalized career guidance and resources."
      />
       <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Career Guide coming soon...</p>
      </div>
    </>
  );
}
