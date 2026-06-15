"use client";

import { useState } from "react";
import { usePost } from "@/hooks/queries/usePost";
import { usePostComments } from "@/hooks/queries/usePostComments";
import PostDetail from "@/components/posts/PostDetail";
import CommentList from "@/components/posts/CommentList";
import { PostDetailSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Button from "@/components/ui/Button";

interface PostDetailContainerProps {
  id: number;
}

export default function PostDetailContainer({ id }: PostDetailContainerProps) {
  const [commentsEnabled, setCommentsEnabled] = useState(false);

  const { data: post, isLoading, error, refetch } = usePost(id);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = usePostComments(id, commentsEnabled);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load post"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (!post) return null;

  return (
    <>
      <PostDetail post={post} />

      <div className="mt-10 border-t border-slate-200 pt-10">
        {!commentsEnabled ? (
          <Button
            variant="secondary"
            onClick={() => setCommentsEnabled(true)}
            aria-label="Load comments for this post"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Load Comments
          </Button>
        ) : (
          <CommentList
            postId={id}
            data={comments}
            isLoading={commentsLoading}
            error={commentsError}
            onRetry={refetchComments}
          />
        )}
      </div>
    </>
  );
}
