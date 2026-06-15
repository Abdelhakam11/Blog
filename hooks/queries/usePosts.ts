"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import { normalizePosts } from "@/lib/utils/normalize";
import type { NormalizedPosts } from "@/types";

interface UsePostsResult {
  data: NormalizedPosts | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePosts(): UsePostsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
    select: normalizePosts,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
