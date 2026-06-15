"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import type { CreatePostInput, Post } from "@/types";

interface UseCreatePostResult {
  mutate: (input: CreatePostInput) => void;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: Post | undefined;
  reset: () => void;
}

export function useCreatePost(): UseCreatePostResult {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess, data, reset } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
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
