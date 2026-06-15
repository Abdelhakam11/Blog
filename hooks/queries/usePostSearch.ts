"use client";

import { useMemo, useState } from "react";
import { usePosts } from "./usePosts";
import { filterPosts, paginateArray, getTotalPages } from "@/lib/utils/helpers";
import { selectAllPosts } from "@/lib/utils/normalize";
import type { Post } from "@/types";

const PAGE_SIZE = 10;

interface UsePostSearchResult {
  posts: Post[];
  query: string;
  setQuery: (q: string) => void;
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePostSearch(): UsePostSearchResult {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: normalized, isLoading, error, refetch } = usePosts();

  const allPosts = useMemo(
    () => (normalized ? selectAllPosts(normalized) : []),
    [normalized]
  );

  const filtered = useMemo(
    () => filterPosts(allPosts, query),
    [allPosts, query]
  );

  const total = filtered.length;
  const totalPages = getTotalPages(total, PAGE_SIZE);

  const posts = useMemo(
    () => paginateArray(filtered, page, PAGE_SIZE),
    [filtered, page]
  );

  function handleSetQuery(q: string) {
    setQuery(q);
    setPage(1);
  }

  return {
    posts,
    query,
    setQuery: handleSetQuery,
    page,
    setPage,
    totalPages,
    total,
    isLoading,
    error,
    refetch,
  };
}
