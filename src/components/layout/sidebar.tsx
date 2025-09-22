'use client';
import {
  GraduationCap,
  FileText,
  LayoutGrid,
  Upload,
  Wand2,
  Bot,
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
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: FileText },
  { href: '/dashboard/upload', label: 'Upload Records', icon: Upload },
  { href: '/dashboard/career', label: 'Career Guide', icon: Wand2 },
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center rounded-lg bg-primary p-2">
               <GraduationCap className="h-6 w-6 text-primary-foreground" />
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
                isActive={pathname.startsWith(item.href)}
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
