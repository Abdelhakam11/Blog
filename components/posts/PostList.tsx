import type { Post } from "@/types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  onPrefetch?: (id: number) => void;
  onDelete?: (id: number) => void;
  deletingId?: number | null;
}

export default function PostList({
  posts,
  onPrefetch,
  onDelete,
  deletingId,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-8 w-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-base font-medium text-slate-700">No posts found</p>
        <p className="mt-1 text-sm text-slate-400">
          Try adjusting your search or create a new post.
        </p>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Posts list"
    >
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard
            post={post}
            onMouseEnter={onPrefetch}
            onDelete={onDelete}
            isDeleting={deletingId === post.id}
          />
        </li>
      ))}
    </ul>
  );
}
