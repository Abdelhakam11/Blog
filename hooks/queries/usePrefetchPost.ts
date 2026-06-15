"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getPostById } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";

export function usePrefetchPost() {
  const queryClient = useQueryClient();

  const prefetchPost = useCallback(
    (id: number) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.post(id),
        queryFn: () => getPostById(id),
        staleTime: 1000 * 60 * 5,
      });
    },
    [queryClient]
  );

  return { prefetchPost };
}
