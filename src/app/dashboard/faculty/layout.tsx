import { Header } from '@/components/layout/header';
import { FacultySidebar } from '@/components/layout/faculty-sidebar';

export default function FacultyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 bg-white shadow-md">
        <FacultySidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-x-auto p-6">
          <div className="w-full max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
