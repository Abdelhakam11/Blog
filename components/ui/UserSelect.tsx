"use client";

import {
  useEffect,
  useRef,
  useState,
  useId,
  type KeyboardEvent,
} from "react";
import type { User } from "@/types";
import { Skeleton } from "./Skeleton";

interface UserSelectProps {
  users: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
  value: number | null;
  onChange: (userId: number) => void;
  onBlur?: () => void;
  errorMessage?: string;
  required?: boolean;
}

export default function UserSelect({
  users,
  isLoading,
  error,
  value,
  onChange,
  onBlur,
  errorMessage,
  required,
}: UserSelectProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedUser = users?.find((u) => u.id === value) ?? null;

  const filtered = (users ?? []).filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function openDropdown() {
    setOpen(true);
    setSearch("");
    setTimeout(() => searchRef.current?.focus(), 0);
  }

  function closeDropdown() {
    setOpen(false);
    setSearch("");
    onBlur?.();
  }

  function selectUser(user: User) {
    onChange(user.id);
    setOpen(false);
    setSearch("");
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      openDropdown();
    }
  }

  function handleSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function handleOptionKeyDown(e: KeyboardEvent<HTMLLIElement>, user: User) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectUser(user);
    }
    if (e.key === "Escape") {
      closeDropdown();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = e.currentTarget.nextElementSibling as HTMLLIElement | null;
      next?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = e.currentTarget.previousElementSibling as HTMLLIElement | null;
      if (prev) {
        prev.focus();
      } else {
        searchRef.current?.focus();
      }
    }
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const triggerClasses = [
    "w-full rounded-lg border px-3 py-2 text-sm text-left transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent",
    errorMessage
      ? "border-red-400 bg-red-50"
      : "border-slate-300 bg-white hover:border-slate-400",
    isLoading || error ? "cursor-not-allowed opacity-60" : "cursor-pointer",
  ].join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-sm font-medium text-slate-700">
        Author
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </span>

      {isLoading ? (
        <Skeleton className="h-9 w-full" />
      ) : error ? (
        <p className="text-sm text-red-600">Failed to load users</p>
      ) : (
        <div ref={containerRef} className="relative">
          {/* Trigger */}
          <button
            ref={triggerRef}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-labelledby={labelId}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-invalid={errorMessage ? true : undefined}
            aria-required={required}
            onClick={() => (open ? closeDropdown() : openDropdown())}
            onKeyDown={handleTriggerKeyDown}
            className={triggerClasses}
          >
            <span
              className={
                selectedUser ? "text-slate-900" : "text-slate-400"
              }
            >
              {selectedUser ? (
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    {selectedUser.name[0]}
                  </span>
                  <span className="font-medium">{selectedUser.name}</span>
                  <span className="text-slate-400">@{selectedUser.username}</span>
                </span>
              ) : (
                "Select an author…"
              )}
            </span>
            <svg
              className={[
                "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform",
                open ? "rotate-180" : "",
              ].join(" ")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg"
              role="presentation"
            >
              {/* Search */}
              <div className="border-b border-slate-100 p-2">
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
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
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search by name or username…"
                    aria-label="Search users"
                    aria-controls={listboxId}
                    className="w-full rounded-md border border-slate-200 py-1.5 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Options */}
              <ul
                id={listboxId}
                role="listbox"
                aria-label="Users"
                aria-labelledby={labelId}
                className="max-h-56 overflow-y-auto py-1"
              >
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-center text-sm text-slate-400">
                    No users found
                  </li>
                ) : (
                  filtered.map((user) => {
                    const isSelected = user.id === value;
                    return (
                      <li
                        key={user.id}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={0}
                        onClick={() => selectUser(user)}
                        onKeyDown={(e) => handleOptionKeyDown(e, user)}
                        className={[
                          "flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                          "focus:outline-none focus-visible:bg-indigo-50",
                          isSelected
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                            isSelected
                              ? "bg-indigo-200 text-indigo-800"
                              : "bg-slate-100 text-slate-600",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          {user.name[0]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">
                            {user.name}
                          </span>
                          <span className="block truncate text-xs text-slate-400">
                            @{user.username} · {user.email}
                          </span>
                        </span>
                        {isSelected && (
                          <svg
                            className="h-4 w-4 shrink-0 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
