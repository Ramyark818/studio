import { Header } from '@/components/layout/header';
import { FacultySidebar } from '@/components/layout/faculty-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function FacultyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <FacultySidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
