"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart2,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = memo(({ setShowLogoutModal }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { href: "/educator/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/educator/courses", icon: BookOpen, label: "Courses" },
      { href: "/educator/learners", icon: Users, label: "Learners" },
      { href: "/educator/analytics", icon: BarChart2, label: "Analytics" },
      { href: "/educator/profile", icon: User, label: "Profile" },
    ],
    []
  );

  return (
    <aside className="educator-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Image
          src="/SigniFi.png"
          alt="SigniFi Logo"
          width={30}
          height={30}
          priority
        />
        <h1>SigniFi</h1>
      </div>

      {/* Navigation */}
      <nav className="educator-sidebar-nav">
        <ul>
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={href} className={pathname === href ? "active" : ""}>
              <Link href={href}>
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{label}</span>
              </Link>
            </li>
          ))}

          {/* Logout button (triggers shared modal in EducatorLayout) */}
          <li className="logout-item">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="logout-button"
            >
              <LogOut size={20} className="nav-icon" />
              <span className="nav-label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
