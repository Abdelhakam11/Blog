"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import { addPostToNormalized } from "@/lib/utils/normalize";
import type { CreatePostInput, NormalizedPosts, Post } from "@/types";

interface UseOptimisticCreatePostResult {
  mutate: (input: CreatePostInput) => void;
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: Post | undefined;
  reset: () => void;
}

export function useOptimisticCreatePost(): UseOptimisticCreatePostResult {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess, data, reset } = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts });
      const previous = queryClient.getQueryData<NormalizedPosts>(queryKeys.posts);

      const optimistic: Post = {
        id: Date.now(),
        userId: newPost.userId,
        title: newPost.title,
        body: newPost.body,
      };

      if (previous) {
        queryClient.setQueryData(
          queryKeys.posts,
          addPostToNormalized(previous, optimistic)
        );
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.posts, context.previous);
      }
    },
    onSettled: () => {
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
