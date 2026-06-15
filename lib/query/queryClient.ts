import { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: number) => ["post", id] as const,
  comments: (postId: number) => ["comments", postId] as const,
} as const;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
