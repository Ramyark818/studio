'use client';
import {
  LayoutDashboard,
  FileCheck2,
  BookCopy,
  User,
  LogOut,
  GraduationCap,
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

const navItems = [
  { href: '/dashboard/faculty', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/faculty/classes', label: 'My Classes', icon: BookCopy },
  { href: '/dashboard/faculty/approvals', label: 'Document Approvals', icon: FileCheck2 },
  { href: '/dashboard/faculty/profile', label: 'Profile', icon: User },
];

export function FacultySidebar() {
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
          <span className="font-bold font-headline text-lg">SANKALAN Faculty</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                asChild
                isActive={item.href === '/dashboard/faculty' ? pathname === item.href : pathname.startsWith(item.href)}
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
