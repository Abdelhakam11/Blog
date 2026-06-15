"use client";

import { useMemo, useState } from "react";
import { usePosts } from "./usePosts";
import { paginateArray, getTotalPages } from "@/lib/utils/helpers";
import { selectAllPosts } from "@/lib/utils/normalize";
import type { PaginatedResult, Post } from "@/types";

const DEFAULT_PAGE_SIZE = 10;

interface UsePaginatedPostsResult {
  result: PaginatedResult<Post> | undefined;
  page: number;
  setPage: (p: number) => void;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePaginatedPosts(
  pageSize = DEFAULT_PAGE_SIZE
): UsePaginatedPostsResult {
  const [page, setPage] = useState(1);
  const { data: normalized, isLoading, error, refetch } = usePosts();

  const result = useMemo<PaginatedResult<Post> | undefined>(() => {
    if (!normalized) return undefined;
    const allPosts = selectAllPosts(normalized);
    const total = allPosts.length;
    const totalPages = getTotalPages(total, pageSize);
    const safePage = Math.min(page, Math.max(1, totalPages));
    const items = paginateArray(allPosts, safePage, pageSize);
    return {
      items,
      pagination: { page: safePage, pageSize, total, totalPages },
    };
  }, [normalized, page, pageSize]);

  return { result, page, setPage, isLoading, error, refetch };
}
