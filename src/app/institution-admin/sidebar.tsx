"use client"; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { 
    LineChart, Users, GraduationCap, FileText, 
    UserCheck, Star, Building, LogOut 
} from 'lucide-react';

const navGroups = [
    {
        title: 'OVERVIEW',
        items: [
            { name: 'Institution Dashboard', href: '/institution-admin/dashboard', icon: LineChart },
        ],
    },
    {
        title: 'USER MANAGEMENT',
        items: [
            { name: 'User Management', href: '/institution-admin/usermanagement', icon: Users },
            { name: 'Education Verification', href: '/institution-admin/educationverification', icon: GraduationCap },
            { name: 'Educator Applications', href: '/institution-admin/educatorapplication', icon: FileText },
            { name: 'Learner Accounts', href: '/institution-admin/learner-accounts', icon: UserCheck },
            { name: 'Educator Status', href: '/institution-admin/educator-status', icon: Star },
            { name: 'Institution Access', href: '/institution-admin/institution-access', icon: Building },
        ],
    },
];

const Sidebar = () => {
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
                    // 2. Use the dynamic item.href for the active check
                    <li key={item.name} className={pathname === item.href ? "active" : ""}>
                      {/* 3. Use the dynamic item.href for the Link */}
                      <Link href={item.href}>
                        <item.icon size={22} className="nav-icon" /> 
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
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link href="/logout">
                <LogOut size={22} className="nav-icon" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;