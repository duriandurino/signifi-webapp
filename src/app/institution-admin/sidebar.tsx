"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { 
    LineChart, Users, GraduationCap, FileText, 
    UserCheck, Star, Building, LogOut, Bell
} from 'lucide-react';

const navGroups = [
    {
        title: 'OVERVIEW',
        items: [
            { name: 'Institution Dashboard', href: '/institution-admin/dashboard', icon: LineChart },
            { name: 'Notifications', href: '/institution-admin/notifications', icon: Bell },
        ],
    },
    {
        title: 'USER MANAGEMENT',
        items: [
            { name: 'User Management', href: '/institution-admin/usermanagement', icon: Users },
            { name: 'Education Verification', href: '/institution-admin/educationverification', icon: GraduationCap },
            { name: 'Educator Applications', href: '/institution-admin/educatorapplication', icon: FileText },
            { name: 'Learner Accounts', href: '/institution-admin/learneraccounts', icon: UserCheck },
            { name: 'Educator Status', href: '/institution-admin/educatorstatus', icon: Star },
        ],
    },
    {
        title: 'ANALYTICS & FEEDBACK',
        items: [
            { name: 'Student Progress', href: '/institution-admin/studentprogress', icon: Building },
        ],
    },
];

// 👇 Accept the logout handler as a prop
const Sidebar = ({ setShowLogoutModal }: { setShowLogoutModal: (open: boolean) => void }) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <Image src="/SigniFi.png" alt="SigniFi Logo" width={30} height={30} />
          <h1>SigniFi</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navGroups.map((group) => (
              <li key={group.title}>
                <h2 className="group-title">{group.title}</h2>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name} className={pathname === item.href ? "active" : ""}>
                      <Link href={item.href}>
                        <item.icon size={20} className="nav-icon" /> 
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <nav className="institution-sidebar-nav">
          <ul>
            {/* Logout button triggers shared modal */}
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
      </div>
    </aside>
  );
};

export default Sidebar;
