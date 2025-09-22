import PageHeader from '@/components/common/page-header';

export default function UploadPage() {
  return (
    <>
      <PageHeader
        title="Upload Records"
        description="Upload your academic and extracurricular records."
      />
      <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Upload area coming soon...</p>
      </div>
    </>
  );
}
