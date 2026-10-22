import { ReactNode, ComponentType } from "react";
import { cn } from "@/lib/utils";

export interface HeroBadgeProps {
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
}

export function HeroBadge({ icon: Icon, children, className }: HeroBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary",
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </div>
  );
}

export interface PageHeroProps {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  badge,
  title,
  subtitle,
  children,
  className,
}: PageHeroProps) {
  return (
    <div className={cn("text-center space-y-3 max-w-3xl mx-auto", className)}>
      {badge && <div className="flex justify-center">{badge}</div>}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-foreground leading-[1.15]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
