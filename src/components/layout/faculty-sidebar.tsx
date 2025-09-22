'use client';
import {
  LayoutDashboard,
  FileCheck2,
  Book,
  Check,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard/faculty', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/faculty/approvals', label: 'Document Approvals', icon: FileCheck2 },
  { href: '/dashboard/faculty/profile', label: 'Profile', icon: User },
];

export function FacultySidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
               <Book className="h-6 w-6" />
               <Check className="h-4 w-4 -ml-2 -mt-3" />
            </div>
          <span className="font-bold font-headline text-lg">StuHub</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                asChild
                isActive={item.href === '/dashboard/faculty' ? pathname === item.href : pathname.startsWith(item.href)}
                icon={item.icon}
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
