"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";

interface UseDeletePostResult {
  mutate: (id: number) => void;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  reset: () => void;
}

export function useDeletePost(): UseDeletePostResult {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess, reset } = useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.post(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  return {
    mutate,
    isPending,
    error: error as Error | null,
    isSuccess,
    reset,
  };
}
