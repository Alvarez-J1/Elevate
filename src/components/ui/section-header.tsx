import { cn } from "../../lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 #A7C7E7 text-sm font-semibold uppercase tracking-[0.28em]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-semibold leading-tight text-platinum sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-silver">{description}</p>
      ) : null}
    </div>
  );
}
