"use client";

import { NavigationMenu } from "@/components/shared/navigation/navigation-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserProfile } from "@/components/features/dashboard/user-profile";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <NavigationMenu />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-6" />
            <UserProfile />
          </div>
        </div>
      </header>
      <main className="container py-4 sm:py-6">{children}</main>
    </div>
  );
}
