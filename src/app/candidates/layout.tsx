import { AppSidebar } from "@/components/candidates/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function CandidatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
