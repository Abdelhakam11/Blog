"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query/queryClient";
import type { User } from "@/types";

interface UseUsersResult {
  data: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function useUsers(): UseUsersResult {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
    staleTime: Infinity,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
  };
}
