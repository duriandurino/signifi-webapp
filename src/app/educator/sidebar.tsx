"use client"; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, BarChart2, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <Image src="/black_logo.png" alt="SigniFi Logo" width={50} height={50} />
          <h1>SigniFi</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={pathname === "/educator/dashboard" ? "active" : ""}>
              <Link href="/educator/dashboard">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            </li>
            <li className={pathname === "/educator/courses" ? "active" : ""}>
              <Link href="/educator/courses">
                <BookOpen size={20} /> Courses
              </Link>
            </li>
            <li className={pathname === "/educator/students" ? "active" : ""}>
                <Link href="/educator/students">
                  <Users size={20} /> Students
                </Link>
              </li>
              <li className={pathname === "/educator/analytics" ? "active" : ""}>
                <Link href="/educator/analytics">
                  <BarChart2 size={20} /> Analytics
                </Link>
              </li>
              <li className={pathname === "/educator/profile" ? "active" : ""}>
                <Link href="/educator/profile">
                  <User size={20} /> Profile
                </Link>
              </li>
              <li className={pathname === "/educator/settings" ? "active" : ""}>
                <Link href="/educator/settings">
                  <Settings size={20} /> Settings
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <LogOut size={20} /> Logout
                </Link>
              </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;