"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePost } from "@/hooks/queries/usePost";
import { useUpdatePost } from "@/hooks/mutations/useUpdatePost";
import PostForm from "@/components/posts/PostForm";
import { PostDetailSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { CreatePostInput } from "@/types";

interface EditPostContainerProps {
  id: number;
}

export default function EditPostContainer({ id }: EditPostContainerProps) {
  const router = useRouter();
  const { data: post, isLoading, error } = usePost(id);
  const {
    mutate: updatePost,
    isPending,
    error: updateError,
    isSuccess,
    reset,
  } = useUpdatePost();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => router.push(`/posts/${id}`), 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router, id]);

  function handleSubmit(data: CreatePostInput) {
    updatePost({ id, data });
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load post"
        message={error.message}
        onRetry={() => router.refresh()}
      />
    );
  }

  if (!post) return null;

  return (
    <div className="mx-auto max-w-2xl">
      {isSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
        >
          <svg
            className="h-5 w-5 shrink-0 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm font-medium text-green-800">
            Post updated successfully! Redirecting…
          </p>
        </div>
      )}

      {updateError && (
        <div className="mb-6">
          <ErrorMessage
            title="Failed to update post"
            message={updateError.message}
            onRetry={reset}
          />
        </div>
      )}

      <PostForm
        initialValues={post}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitLabel={isPending ? "Saving…" : "Save Changes"}
        onCancel={() => router.push(`/posts/${id}`)}
      />
    </div>
  );
}
