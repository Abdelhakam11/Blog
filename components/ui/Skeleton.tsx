interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={["animate-pulse rounded-md bg-slate-200", className].join(" ")}
      aria-hidden="true"
    />
  );
}

export function PostCardSkeleton() {
  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label="Loading post"
    >
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-2/3" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </article>
  );
}

export function PostDetailSkeleton() {
  return (
    <div aria-label="Loading post details">
      <Skeleton className="mb-4 h-10 w-3/4" />
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="mb-2 h-4 w-4/6" />
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div
      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
      aria-label="Loading comment"
    >
      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
      <Skeleton className="mb-1 h-3.5 w-full" />
      <Skeleton className="h-3.5 w-3/4" />
    </div>
  );
}
