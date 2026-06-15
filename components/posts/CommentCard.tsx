import { memo } from "react";
import type { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const initials = comment.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article
      className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:bg-white hover:border-slate-300"
      aria-label={`Comment by ${comment.name}`}
    >
      <header className="mb-3 flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800 capitalize">
            {comment.name}
          </p>
          <a
            href={`mailto:${comment.email}`}
            className="truncate text-xs text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-sm"
            aria-label={`Email ${comment.name} at ${comment.email}`}
          >
            {comment.email}
          </a>
        </div>
      </header>
      <p className="text-sm leading-relaxed text-slate-600">{comment.body}</p>
    </article>
  );
}

export default memo(CommentCard);
