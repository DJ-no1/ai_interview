"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    FileText,
    LogOut
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/recruiters/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Jobs",
        href: "/recruiters/dashboard/jobs",
        icon: Briefcase,
    },
    {
        name: "Candidates",
        href: "/recruiters/dashboard/candidates",
        icon: Users,
    },
    {
        name: "Applications",
        href: "/recruiters/dashboard/applications",
        icon: FileText,
    },
];

export function RecruiterSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-gray-900 flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">H</span>
                    </div>
                    <span className="text-white font-semibold text-lg">Hirelytics</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-purple-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">R</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">Recruiter</p>
                        <p className="text-gray-400 text-xs truncate">recruiter@company.com</p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        </div>
    );
}
