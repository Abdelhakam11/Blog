"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import type { Post } from "@/types";

interface UsePostResult {
  data: Post | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePost(id: number): UsePostResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => getPostById(id),
    enabled: id > 0,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
