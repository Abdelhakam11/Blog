"use client";

import { useState } from "react";
import type { NormalizedComments } from "@/types";
import { selectAllComments } from "@/lib/utils/normalize";
import CommentCard from "./CommentCard";
import { CommentSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface CommentListProps {
  postId: number;
  data: NormalizedComments | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

export default function CommentList({
  postId: _postId,
  data,
  isLoading,
  error,
  onRetry,
}: CommentListProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const comments = data ? selectAllComments(data) : [];

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="comments-heading"
          className="text-xl font-bold text-slate-900"
        >
          Comments
          {!isLoading && data && (
            <span className="ml-2 text-base font-normal text-slate-400">
              ({comments.length})
            </span>
          )}
        </h2>
        {!isLoading && !error && comments.length > 0 && (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls="comments-list"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="grid gap-4" aria-live="polite" aria-label="Loading comments">
          {Array.from({ length: 5 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}

      {error && !isLoading && (
        <ErrorMessage
          title="Failed to load comments"
          message={error.message}
          onRetry={onRetry}
        />
      )}

      {!isLoading && !error && isExpanded && (
        <div
          id="comments-list"
          className="grid gap-4"
          aria-live="polite"
        >
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  );
}
