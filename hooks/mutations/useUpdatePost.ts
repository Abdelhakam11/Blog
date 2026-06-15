"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import type { Post, UpdatePostInput } from "@/types";

interface UpdatePostVariables {
  id: number;
  data: UpdatePostInput;
}

interface UseUpdatePostResult {
  mutate: (variables: UpdatePostVariables) => void;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: Post | undefined;
  reset: () => void;
}

export function useUpdatePost(): UseUpdatePostResult {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess, data, reset } = useMutation({
    mutationFn: ({ id, data }: UpdatePostVariables) => updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  return {
    mutate,
    isPending,
    error: error as Error | null,
    isSuccess,
    data,
    reset,
  };
}
