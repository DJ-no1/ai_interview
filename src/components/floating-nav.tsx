"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Sun, Moon, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function FloatingNav() {
    const [isDark, setIsDark] = useState(true);
    const pathname = usePathname();

    // Hide floating nav on recruiter pages only
    const shouldHide = pathname?.startsWith('/recruiters');

    useEffect(() => {
        // Apply theme to document
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    if (shouldHide) {
        return null;
    }

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            {/* Home Button */}
            <Link href="/">
                <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    title="Home"
                >
                    <Home className="h-5 w-5" />
                </Button>
            </Link>

            {/* Jobs Button */}
            <Link href="/jobs">
                <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    title="Browse Jobs"
                >
                    <Briefcase className="h-5 w-5" />
                </Button>
            </Link>

            {/* Theme Toggle Button */}
            <Button
                size="icon"
                onClick={toggleTheme}
                className="h-12 w-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="Toggle Theme"
            >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Settings/Menu Button */}
            <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-muted hover:bg-muted/90 text-muted-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="Menu"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </Button>
        </div>
    );
}
