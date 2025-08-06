"use client";
import { RecruiterSidebar } from "@/components/recruiters/sidebar";

export default function RecruitersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-950">
            <RecruiterSidebar />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
