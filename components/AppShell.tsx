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
import SiteFooter from "@/components/landing/SiteFooter";
import { SidebarProvider, useSidebarTelemetry, type SidebarTelemetry } from "@/components/shared/SidebarContext";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import {
  History,
  Compass,
  Menu,
  PanelLeftClose,
  PlusCircle,
  Home,
  Calendar,
  Flame,
  BookmarkCheck,
  Zap,
  Sparkles,
  CreditCard,
  X,
} from "lucide-react";

export type SidebarData = SidebarTelemetry;

const mainItems = [
  { title: "Home", url: "/home", icon: Home, badgeKey: undefined },
  { title: "Mistake Vault", url: "/mistakes", icon: BookmarkCheck, badgeKey: "dueMistakesCount" },
  { title: "History", url: "/history", icon: History, badgeKey: undefined },
];

export function AppShell({
  children,
  sidebarData: initialSidebarData,
}: {
  children: React.ReactNode;
  sidebarData?: SidebarData | null;
}) {
  return (
    <SidebarProvider initialData={initialSidebarData}>
      <AppShellInner>{children}</AppShellInner>
    </SidebarProvider>
  );
}

function AppShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const { sidebarData } = useSidebarTelemetry();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isProCardDismissed, setIsProCardDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const showOnRoutes = ["/create", "/quizzes", "/home", "/dashboard", "/history", "/setup", "/mistakes"];
  const shouldShowSidebar = showOnRoutes.includes(pathname) && !!user;

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("acetheprep_pro_card_dismissed") === "true") {
        setIsProCardDismissed(true);
      }
    } catch {}
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
    pathname === "/mistakes" ? "Mistake Vault" :
    pathname === "/history" ? "History" :
    pathname === "/setup" ? "Settings" :
    pathname === "/create" ? "Create a Quiz" :
    pathname === "/quizzes" ? "Public Quizzes" : "";

  const isQuizPage = pathname.startsWith("/quiz/") || pathname.startsWith("/play/") || pathname.startsWith("/session/");

  // On active exam/quiz sessions, grant 100% full-screen without website navbar or user menu
  if (isQuizPage) {
    return <>{children}</>;
  }

  if (!mounted || !shouldShowSidebar) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <div className="pt-16">
            {children}
          </div>
        </div>
        <SiteFooter />
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
            <div className="flex items-center justify-between">
              <BrandLogo />
              {sidebarData?.isPro && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  PRO
                </span>
              )}
            </div>
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
                const badgeCount =
                  item.badgeKey === "dueMistakesCount"
                    ? sidebarData?.dueMistakesCount
                    : undefined;

                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "hover:bg-muted/60 text-muted-foreground hover:text-foreground font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                    {Boolean(badgeCount && badgeCount > 0) && (
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        {badgeCount}
                      </span>
                    )}
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
                    Create Quiz
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
                  <Link
                    href="/pricing"
                    className={`flex items-center gap-3 py-1.5 text-sm rounded-md px-2 transition-colors ${
                      pathname === "/pricing"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Pricing & Plans
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Pro Upgrade Sidebar Box (For free tier) */}
          {user && !sidebarData?.isPro && !isProCardDismissed && (
            <div className="relative p-3 my-2 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-muted/20 border border-primary/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>AceThePrep Pro</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    Upgrade
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProCardDismissed(true);
                      try {
                        localStorage.setItem("acetheprep_pro_card_dismissed", "true");
                      } catch {}
                    }}
                    className="p-1 -mr-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-background/60 transition-colors cursor-pointer"
                    aria-label="Dismiss Pro upgrade banner"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Unlock full 50Q mock simulations, official section drills & spaced review.
              </p>
              <Button
                type="button"
                size="sm"
                onClick={() => setIsUpgradeOpen(true)}
                className="w-full h-8 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs cursor-pointer rounded-xl gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Upgrade to Pro</span>
              </Button>
            </div>
          )}

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
                isPro={sidebarData?.isPro}
                onUpgrade={() => setIsUpgradeOpen(true)}
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
            {!sidebarData?.isPro ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsUpgradeOpen(true)}
                className="h-8 px-2.5 text-xs font-bold border-primary/30 text-primary hover:bg-primary/10 gap-1.5 rounded-lg cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="hidden sm:inline">Upgrade to Pro</span>
                <span className="sm:hidden">Pro</span>
              </Button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 h-7 px-2 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Pro
              </span>
            )}
            <ThemeToggle />
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>

      <UpgradeModal
        open={isUpgradeOpen}
        onOpenChange={setIsUpgradeOpen}
        examName={sidebarData?.examName}
      />
    </div>
  );
}
