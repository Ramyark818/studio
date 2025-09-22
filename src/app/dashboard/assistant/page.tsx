import PageHeader from '@/components/common/page-header';

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        title="AI Assistant"
        description="Your personal AI-powered assistant for all your queries."
      />
      <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">AI Assistant coming soon...</p>
      </div>
    </>
  );
}
