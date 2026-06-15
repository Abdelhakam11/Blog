import Link from "next/link";
import type { Post } from "@/types";
import Badge from "@/components/ui/Badge";
import { getPostReadTime } from "@/lib/utils/helpers";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const readTime = getPostReadTime(post.body);

  return (
    <article aria-labelledby="post-title">
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant="primary">User {post.userId}</Badge>
          <span className="text-sm text-slate-400">
            {readTime} min read
          </span>
          <span
            className="text-sm text-slate-400"
            aria-label={`Post ID ${post.id}`}
          >
            #{post.id}
          </span>
        </div>

        <h1
          id="post-title"
          className="text-3xl font-bold capitalize leading-tight text-slate-900 sm:text-4xl"
        >
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/edit/${post.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            aria-label={`Edit post: ${post.title}`}
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to posts
          </Link>
        </div>
      </header>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700">{post.body}</p>
      </div>
    </article>
  );
}
