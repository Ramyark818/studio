'use client';
import {
  BookOpenCheck,
  FileText,
  LayoutDashboard,
  ListChecks,
  ShieldCheck,
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
import type { NavItem } from '@/lib/types';
import { Button } from '../ui/button';

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/activities', label: 'Activities', icon: ListChecks },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: FileText },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center rounded-lg bg-primary p-2">
               <BookOpenCheck className="h-6 w-6 text-primary-foreground" />
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
                isActive={pathname === item.href}
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
         <div className="p-2">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-sm font-medium mb-2">Need Help?</p>
                <p className="text-xs text-muted-foreground mb-4">
                    Contact support for any questions or issues.
                </p>
                <Button size="sm" className="w-full">Contact Support</Button>
            </div>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}
