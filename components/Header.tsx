// Path: components/Header.tsx
"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { SignInButton } from "./SignInButton";
import { UserMenu } from "./UserMenu";
import { signOut } from "@/lib/supabase/auth";
import { toast } from "sonner";
import { Loader2, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggleButton";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";

const QUIZ_ROUTES = ["/quiz/", "/play/", "/session/", "/edit/", "/create"];

const NAV_ITEMS = [
  { label: "Practice", href: "/practice" },
  { label: "Insights", href: "/insights" },
  { label: "Predictor", href: "/predictor" },
  { label: "Guides", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export const Header = memo(() => {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isQuizPage = QUIZ_ROUTES.some((route) => pathname.startsWith(route));

  const handleSignOut = async () => {
    try {
      setIsDropdownOpen(false);
      await signOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="h-16 fixed top-0 left-0 right-0 z-[100] bg-background/85 backdrop-blur-md border-b border-border/80 transition-colors">
      <header className="flex justify-between items-center max-w-6xl px-4 py-3.5 mx-auto">
        <nav className="flex items-center space-x-7">
          <BrandLogo />
          {!isQuizPage && (
            <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md transition-colors",
                      isActive
                        ? "text-foreground font-semibold bg-secondary/80"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {isUserLoading ? (
            <div><Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/></div>
          ) : user ? (
            <UserMenu
              user={user}
              isOpen={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
              onSignOut={handleSignOut}
            />
          ) : (
            <SignInButton
              buttonText="Get Started"
              returnUrl={pathname !== "/" ? pathname : "/home"}
              size="sm"
              className="text-xs font-semibold px-3 py-1.5 h-9"
            />
          )}

          {!isQuizPage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {!isQuizPage && mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 opacity-50" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
});
Header.displayName = "Header";