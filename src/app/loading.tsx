import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <Skeleton className="aspect-[4/3]" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-52" />
          </div>
        </div>
      </Container>
    </div>
  );
}
