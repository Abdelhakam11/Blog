"use client";

import Link from "next/link";
import { memo } from "react";
import type { Post } from "@/types";
import { truncate, getPostReadTime } from "@/lib/utils/helpers";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: Post;
  onMouseEnter?: (id: number) => void;
  isDeleting?: boolean;
  onDelete?: (id: number) => void;
}

function PostCard({ post, onMouseEnter, isDeleting, onDelete }: PostCardProps) {
  const readTime = getPostReadTime(post.body);

  return (
    <article
      className={[
        "group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        "transition-all duration-200 hover:border-indigo-200 hover:shadow-md",
        isDeleting ? "pointer-events-none opacity-50" : "",
      ].join(" ")}
      aria-label={`Post: ${post.title}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="primary">User {post.userId}</Badge>
        <span className="text-xs text-slate-400">
          {readTime} min read
        </span>
      </div>

      <h2 className="mb-2 text-base font-semibold capitalize leading-snug text-slate-900 group-hover:text-indigo-700 transition-colors">
        {post.title}
      </h2>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">
        {truncate(post.body, 120)}
      </p>

      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/posts/${post.id}`}
          onMouseEnter={() => onMouseEnter?.(post.id)}
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm transition-colors"
          aria-label={`Read post: ${post.title}`}
        >
          Read more
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/edit/${post.id}`}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-colors"
            aria-label={`Edit post: ${post.title}`}
          >
            Edit
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              disabled={isDeleting}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              aria-label={`Delete post: ${post.title}`}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(PostCard);
