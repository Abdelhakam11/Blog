"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import { removePostFromNormalized } from "@/lib/utils/normalize";
import type { NormalizedPosts } from "@/types";

interface UseOptimisticDeletePostResult {
  mutate: (id: number) => void;
  isPending: boolean;
  deletingId: number | null;
  error: Error | null;
  isSuccess: boolean;
  reset: () => void;
}

export function useOptimisticDeletePost(): UseOptimisticDeletePostResult {
  const queryClient = useQueryClient();
  let deletingId: number | null = null;

  const { mutate, isPending, error, isSuccess, reset, variables } = useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts });
      const previous = queryClient.getQueryData<NormalizedPosts>(queryKeys.posts);

      if (previous) {
        queryClient.setQueryData(
          queryKeys.posts,
          removePostFromNormalized(previous, id)
        );
      }

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.posts, context.previous);
      }
    },
    onSettled: (_data, _err, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.post(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  deletingId = isPending && variables !== undefined ? variables : null;

  return {
    mutate,
    isPending,
    deletingId,
    error: error as Error | null,
    isSuccess,
    reset,
  };
}
