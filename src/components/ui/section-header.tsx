import { cn } from "../../lib/utils";
// cn combines multiple className strings into one string.


export function SectionHeader({
    // eyebrow is small optional text above the title.
    eyebrow,
    title, 
    description,  
    // className lets the parent pass extra classes into this component.
    className
  }: {
    // The ? means this prop is optional.
    eyebrow?: string;
    title: string;
    description?: string;
    className?: string;
  }) {
    return (
      // "max-w-3xl" limits how wide the text block can get.
      <div className={cn("max-w-3xl", className)}>
        {/* If eyebrow exists, render the small label. Otherwise render nothing. */}
        {eyebrow ? (
          /* mb-3 adds bottom margin. text-xs makes the text small. */
          <p className="mb-3 #A7C7E7 text-sm font-semibold uppercase tracking-[0.28em]">
            {eyebrow}
          </p>
        ) : null}

        {/* sm:text-4xl makes the title larger on small screens and up. */}
        <h2 className="text-3xl font-semibold leading-tight text-platinum sm:text-4xl">
          {title}
        </h2>
        {/* If description exists, render the subtitle text. */}
        {description ? (
          <p className="mt-4 text-base leading-7 text-silver">{description}</p>
        ) : null}
      </div>
    );
  }
  
