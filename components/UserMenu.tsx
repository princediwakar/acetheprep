// components/UserMenu.tsx
"use client";

import { memo } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, ChevronsUpDown, Zap, CreditCard, Sparkles } from "lucide-react";
import { User } from "@/types/quiz";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSignOut: () => Promise<void>;
  variant?: "header" | "sidebar";
  isPro?: boolean;
  onUpgrade?: () => void;
}

export const UserMenu = memo(({ user, isOpen, onOpenChange, onSignOut, variant = "header", isPro, onUpgrade }: UserMenuProps) => {
  const initials = user?.user_metadata?.name?.[0] || "U";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  const router = useRouter();

  const isSidebar = variant === "sidebar";

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {isSidebar ? (
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-muted/70 transition-colors text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="User navigation menu"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar className="h-8 w-8 shrink-0 border border-border/60">
                <AvatarImage src={avatarUrl} alt="User avatar" />
                <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate leading-tight">
                  {userName}
                </span>
                <span className="text-[11px] text-muted-foreground truncate leading-tight">
                  {user?.email}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors ml-1" />
          </button>
        ) : (
          <Button variant="ghost" className="size-6 p-0 rounded-full hover:opacity-80 transition-opacity">
            <Avatar>
              <AvatarImage src={avatarUrl} alt="User avatar" />
              <AvatarFallback className="">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isSidebar ? "start" : "end"}
        side={isSidebar ? "top" : "bottom"}
        sideOffset={isSidebar ? 8 : 4}
        className="w-56 z-50"
      >
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator />

        {!isPro ? (
          <DropdownMenuItem
            onClick={() => {
              onOpenChange(false);
              if (onUpgrade) {
                onUpgrade();
              } else {
                router.push("/pricing");
              }
            }}
            className="cursor-pointer text-primary focus:text-primary focus:bg-primary/10 font-semibold"
          >
            <Zap className="mr-2 h-4 w-4 fill-primary" />
            <span>Upgrade to Pro</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer text-emerald-600 dark:text-emerald-400 focus:text-emerald-700 font-semibold"
          >
            <Sparkles className="mr-2 h-4 w-4 text-emerald-500" />
            <span>AceThePrep Pro Active</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => {
            onOpenChange(false);
            router.push("/pricing");
          }}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Pricing & Plans</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => {
            onOpenChange(false);
            router.push("/setup?edit=true");
          }}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Exam Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={onSignOut}
          className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserMenu.displayName = "UserMenu";