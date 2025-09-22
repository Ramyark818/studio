import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The SidebarProvider is moved to the specific layouts that need it
  // to avoid nesting providers, which was causing issues.
  return <>{children}</>;
}
