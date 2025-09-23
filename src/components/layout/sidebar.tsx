'use client';
import {
  Book,
  FileText,
  LayoutGrid,
  Upload,
  Wand2,
  Bot,
  GraduationCap,
  LogOut,
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
import type { NavItem } from '@/lib/types';
import toast from 'react-hot-toast';

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: FileText },
  { href: '/dashboard/activities', label: 'Activities', icon: Book },
  { href: '/dashboard/upload', label: 'Upload Records', icon: Upload },
  { href: '/dashboard/career', label: 'Career Guide', icon: Wand2 },
  { href: '/dashboard/assistant', label: 'AI Assistant', icon: Bot },
];

export function AppSidebar() {
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
          <span className="font-bold font-headline text-lg">SANKALAN</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                asChild
                isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
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
