"use client";

import { useCallback } from "react";
import { usePostSearch } from "@/hooks/queries/usePostSearch";
import { usePrefetchPost } from "@/hooks/queries/usePrefetchPost";
import { useOptimisticDeletePost } from "@/hooks/mutations/useOptimisticDeletePost";
import PostList from "@/components/posts/PostList";
import SearchBar from "@/components/posts/SearchBar";
import Pagination from "@/components/posts/Pagination";
import { PostCardSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function PostsContainer() {
  const {
    posts,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    total,
    isLoading,
    error,
    refetch,
  } = usePostSearch();

  const { prefetchPost } = usePrefetchPost();
  const { mutate: deletePost, deletingId } = useOptimisticDeletePost();

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm("Delete this post? This action cannot be undone.")) {
        deletePost(id);
      }
    },
    [deletePost]
  );

  return (
    <section aria-labelledby="posts-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            id="posts-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            All Posts
          </h1>
          {!isLoading && !error && (
            <p className="mt-1 text-sm text-slate-500">
              {total} post{total !== 1 ? "s" : ""}
              {query ? ` matching "${query}"` : " total"}
            </p>
          )}
        </div>
        <div className="w-full sm:max-w-sm">
          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={query ? total : undefined}
          />
        </div>
      </div>

      {isLoading && (
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
          aria-label="Loading posts"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && !isLoading && (
        <ErrorMessage
          title="Failed to load posts"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && (
        <>
          <PostList
            posts={posts}
            onPrefetch={prefetchPost}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
