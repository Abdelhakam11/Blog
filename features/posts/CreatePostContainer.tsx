"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useOptimisticCreatePost } from "@/hooks/mutations/useOptimisticCreatePost";
import PostForm from "@/components/posts/PostForm";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { CreatePostInput } from "@/types";

export default function CreatePostContainer() {
  const router = useRouter();
  const { mutate, isPending, error, isSuccess, reset } =
    useOptimisticCreatePost();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  function handleSubmit(data: CreatePostInput) {
    mutate(data);
  }

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
            Post created successfully! Redirecting…
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <ErrorMessage
            title="Failed to create post"
            message={error.message}
            onRetry={reset}
          />
        </div>
      )}

      <PostForm
        onSubmit={handleSubmit}
        isPending={isPending}
        submitLabel={isPending ? "Creating…" : "Create Post"}
        onCancel={() => router.push("/")}
      />
    </div>
  );
}
