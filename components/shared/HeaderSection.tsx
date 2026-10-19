interface HeaderSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function HeaderSection({ label, title, subtitle }: HeaderSectionProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      {label ? (
        <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase mb-4">
          {label}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-foreground leading-[1.15] text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-balance text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
