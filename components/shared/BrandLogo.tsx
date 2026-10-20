// Path: components/shared/BrandLogo.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  hideDot?: boolean;
}

export function BrandLogo({
  className,
  href = "/",
  size = "md",
  hideDot = false,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity",
        className
      )}
    >
      <span
        className={cn(
          "font-heading font-medium tracking-tight text-foreground",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        AceThePrep
      </span>
      {!hideDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shrink-0 shadow-sm" />
      )}
    </Link>
  );
}
