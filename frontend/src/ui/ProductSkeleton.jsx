import { Skeleton } from "@/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="w-[260px] shrink-0 rounded-lg border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="px-4 pb-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProductCategorySkeleton() {
  return (
    <div className="space-y-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((j) => (
              <ProductCardSkeleton key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
