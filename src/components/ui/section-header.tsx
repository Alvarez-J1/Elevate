import { cn } from "../../lib/utils";

/**
 * Shared typography for section headings (H2) across the project.
 * 30px -> 36px -> 48px responsive scale, reaching the 48px spec at the
 * lg breakpoint. Exported separately so pages with a literal duplicate
 * heading (e.g. final-CTA sections) can stay in sync without re-typing
 * the class string.
 */
export function sectionTitleClassName(className?: string): string {
  return cn(
    "text-3xl font-semibold leading-tight text-platinum sm:text-4xl lg:text-5xl",
    className
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  descriptionClassName
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-eyebrow-heading text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
          {eyebrow}
        </p>
      ) : null}

      <h2 className={sectionTitleClassName()}>{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-4 leading-7 text-silver",
            descriptionClassName ?? "text-base"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
