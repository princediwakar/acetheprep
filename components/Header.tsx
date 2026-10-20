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
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggleButton";

const QUIZ_ROUTES = ["/quiz/", "/play/", "/session/", "/edit/", "/create"];

export const Header = memo(() => {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <Link href="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span className="font-heading text-xl font-medium tracking-tight text-foreground">
              AceThePrep
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </Link>
          {!isQuizPage && (
            <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
              <Link href="/practice" className="hover:text-foreground transition-colors">
                Exams
              </Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Study Guides
              </Link>
            </div>
          )}
        </nav>
        <div className="flex items-center space-x-3.5">
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
              returnUrl={pathname !== "/" ? pathname : "/setup"}
            />
          )}
        </div>
      </header>
    </div>
  );
});
Header.displayName = "Header";