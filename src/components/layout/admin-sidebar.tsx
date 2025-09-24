'use client';
import {
  LayoutDashboard,
  Users,
  BookCopy,
  CalendarCheck,
  Briefcase,
  GraduationCap,
  LogOut,
  User,
  Database,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

const navItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'User Management', icon: Users },
  { href: '/dashboard/admin/classes', label: 'Class Management', icon: BookCopy },
  { href: '/dashboard/admin/attendance', label: 'Faculty Attendance', icon: CalendarCheck },
  { href: '/dashboard/admin/placements', label: 'Placements', icon: Briefcase },
  { href: '/dashboard/admin/seed', label: 'Database Seed', icon: Database },
  { href: '/dashboard/admin/profile', label: 'Profile', icon: User },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    router.push('/');
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
               <GraduationCap className="h-6 w-6" />
            </div>
          <span className="font-bold font-headline text-lg">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                asChild
                isActive={item.href === '/dashboard/admin' ? pathname === item.href : pathname.startsWith(item.href)}
                icon={<item.icon />}
                onClick={handleLinkClick}
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
        <SidebarSeparator />
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} icon={<LogOut />}>
                    Log Out
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
