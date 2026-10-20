"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { signOut } from "@/lib/supabase/auth";
import { toast } from "sonner";
import { ThemeToggle } from "./ThemeToggleButton";
import { Header } from "./Header";
import { UserMenu } from "./UserMenu";
import { BrandLogo } from "@/components/shared/BrandLogo";
import type { SidebarData } from "@/app/layout";
import {
  TrendingUp,
  History,
  Compass,
  Menu,
  PanelLeftClose,
  PlusCircle,
  Home,
  Calendar,
  Flame,
} from "lucide-react";

const mainItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "History", url: "/history", icon: History },
];

export function AppShell({ children, sidebarData }: { children: React.ReactNode; sidebarData?: SidebarData | null }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(min-width: 1024px)");
    setSidebarOpen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const headerTitle =
    pathname === "/home" || pathname === "/dashboard" ? "Home" :
    pathname === "/analytics" ? "Analytics" :
    pathname === "/history" ? "History" :
    pathname === "/setup" ? "Settings" :
    pathname === "/create" ? "Create a Quiz" :
    pathname === "/quizzes" ? "Public Quizzes" : "";

  const showOnRoutes = ["/create", "/quizzes", "/home", "/dashboard", "/analytics", "/history", "/setup"];
  const shouldShowSidebar = showOnRoutes.includes(pathname) && !!user;
  const isQuizPage = pathname.startsWith("/quiz/") || pathname.startsWith("/play/") || pathname.startsWith("/session/");

  // On active exam/quiz sessions, grant 100% full-screen without website navbar or user menu
  if (isQuizPage) {
    return <>{children}</>;
  }

  if (!mounted || !shouldShowSidebar) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-16">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`fixed left-0 top-0 h-screen w-64 border-r bg-background z-50 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="mb-6">
            <BrandLogo />
            {sidebarData && (
              <div className="mt-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {sidebarData.examName} &middot; {sidebarData.daysRemaining} day{sidebarData.daysRemaining !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-auto flex flex-col">
            {/* Main navigation */}
            <div className="space-y-1">
              {mainItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "hover:bg-muted/60 text-muted-foreground hover:text-foreground font-medium"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>

            {user && (
              <div className="mt-6 px-2">
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5">
                  Explore
                </p>
                <div className="space-y-1">
                  <Link
                    href="/create"
                    className={`flex items-center gap-3 py-1.5 text-sm rounded-md px-2 transition-colors ${
                      pathname === "/create"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create a Quiz
                  </Link>
                  <Link
                    href="/quizzes"
                    className={`flex items-center gap-3 py-1.5 text-sm rounded-md px-2 transition-colors ${
                      pathname === "/quizzes"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    Public Quizzes
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Bottom user & streak section */}
          <div className="border-t pt-3 mt-auto space-y-2">
            {user && sidebarData && sidebarData.streak > 0 && (
              <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-lg">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span>{sidebarData.streak} day streak</span>
              </div>
            )}
            {user && (
              <UserMenu
                user={user}
                isOpen={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                onSignOut={handleSignOut}
                variant="sidebar"
              />
            )}
          </div>
        </div>
      </aside>

      <div className={`flex-1 transition-[margin-left] duration-200 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <header className="h-14 border-b flex items-center px-4 sticky top-0 bg-background/95 backdrop-blur-xs z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-accent rounded-md mr-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2 min-w-0" id="header-title-slot">
            <span className="font-bold text-sm sm:text-base text-foreground tracking-tight truncate">
              {sidebarData?.examName || headerTitle}
            </span>
            {sidebarData?.daysRemaining !== undefined && sidebarData.daysRemaining > 0 && (
              <span className="hidden sm:inline-flex items-center text-xs text-muted-foreground font-medium">
                &middot; {sidebarData.daysRemaining}d left
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <div id="header-actions-portal" className="flex items-center gap-2" />
            <ThemeToggle />
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
