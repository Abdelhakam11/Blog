"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import { normalizeComments } from "@/lib/utils/normalize";
import type { NormalizedComments } from "@/types";

interface UsePostCommentsResult {
  data: NormalizedComments | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePostComments(
  postId: number,
  enabled = true
): UsePostCommentsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: () => getPostComments(postId),
    select: normalizeComments,
    enabled: postId > 0 && enabled,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
