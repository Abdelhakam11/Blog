"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@/lib/query/queryClient";

export function useInvalidatePosts() {
  const queryClient = useQueryClient();

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.posts });
  }, [queryClient]);

  const invalidatePost = useCallback(
    (id: number) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(id) });
    },
    [queryClient]
  );

  const invalidateComments = useCallback(
    (postId: number) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
    },
    [queryClient]
  );

  return { invalidateAll, invalidatePost, invalidateComments };
}
