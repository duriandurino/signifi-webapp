"use client"; 

import React, { memo, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, BarChart2, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  const navItems = useMemo(() => [
    {
      href: "/educator/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      href: "/educator/courses", 
      icon: BookOpen,
      label: "Courses"
    },
    {
      href: "/educator/students",
      icon: Users,
      label: "Students"
    },
    {
      href: "/educator/analytics",
      icon: BarChart2,
      label: "Analytics"
    },
    {
      href: "/educator/profile",
      icon: User,
      label: "Profile"
    },
    {
      href: "/educator/settings",
      icon: Settings,
      label: "Settings"
    }
  ], []);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <Image 
            src="/black_logo.png" 
            alt="SigniFi Logo" 
            width={50} 
            height={50}
            priority
          />
          <h1>SigniFi</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navItems.map(({ href, icon: Icon, label }) => (
              <li key={href} className={pathname === href ? "active" : ""}>
                <Link href={href} prefetch={true}>
                  <Icon size={20} /> {label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className="logout-button">
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;