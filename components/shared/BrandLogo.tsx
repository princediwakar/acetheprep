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
        "inline-flex items-center hover:opacity-90 transition-opacity select-none",
        className
      )}
    >
      <span
        className={cn(
          "font-heading font-medium tracking-tight text-foreground inline-flex items-baseline",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        AceThePrep
        {!hideDot && (
          <span
            className={cn(
              "rounded-full bg-blue-600 dark:bg-blue-500 shrink-0 shadow-sm",
              size === "sm" && "h-1 w-1 ml-1",
              size === "md" && "h-1.5 w-1.5 ml-1",
              size === "lg" && "h-2 w-2 ml-1.5"
            )}
            aria-hidden="true"
          />
        )}
      </span>
    </Link>
  );
}
