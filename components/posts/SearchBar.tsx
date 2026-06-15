"use client";

import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search posts by title or content…",
  resultCount,
}: SearchBarProps) {
  const id = useId();

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        Search posts
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search posts"
        aria-live="polite"
        aria-atomic="true"
        className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus-visible:outline-none"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      {value && resultCount !== undefined && (
        <p className="mt-1.5 text-xs text-slate-500" aria-live="polite">
          {resultCount === 0
            ? "No posts found"
            : `${resultCount} post${resultCount !== 1 ? "s" : ""} found`}
        </p>
      )}
    </div>
  );
}
