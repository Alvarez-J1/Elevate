import { Container } from "@/components/ui/container";

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

export function SectionDivider() {
  return (
    <div aria-hidden="true">
      <Container className={wideContainerClassName}>
        <div className="h-px w-full bg-white/10" />
      </Container>
    </div>
  );
}
