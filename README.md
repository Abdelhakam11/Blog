# BlogApp

A production-grade blog application built with **Next.js 16**, **TanStack Query v5**, and **Tailwind CSS v4** — featuring optimistic UI, data normalization, hover prefetching, and full accessibility.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 — strict mode, zero `any` |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Server state | TanStack Query (React Query) v5 |
| Data source | [JSONPlaceholder](https://jsonplaceholder.typicode.com) |
| Font | Geist Sans / Geist Mono |

---

## Features

- **Post listing** with live search and client-side pagination (10 per page)
- **Post detail** with lazy-loaded comments (deferred until user requests them)
- **Create post** with optimistic UI — appears instantly before the API responds
- **Edit post** with pre-filled form and cache sync on success
- **Delete post** with optimistic removal and automatic rollback on error
- **Hover prefetch** — post data loads in the background when you hover a card
- **Skeleton loaders** for every loading state
- **Full keyboard navigation** and ARIA attributes throughout
- **Responsive** — mobile-first grid layout

---

## Architecture

Feature-based clean architecture with strict layer boundaries:

```
app/                        # Routes only — Server Components where possible
├── page.tsx                # / — post listing
├── posts/[id]/page.tsx     # /posts/:id — post detail
├── create/page.tsx         # /create — new post form
└── edit/[id]/page.tsx      # /edit/:id — edit post form

components/
├── ui/                     # Button, Input, Textarea, Badge, Skeleton, ErrorMessage
├── layout/                 # Header, Footer, Container
└── posts/                  # PostCard, PostList, PostDetail, CommentList, PostForm, …

features/posts/             # Composition layer — wires hooks to UI
├── PostsContainer.tsx
├── PostDetailContainer.tsx
├── CreatePostContainer.tsx
└── EditPostContainer.tsx

hooks/
├── queries/                # usePosts, usePost, usePostComments, usePostSearch,
│                           # usePaginatedPosts, usePrefetchPost
├── mutations/              # useCreatePost, useUpdatePost, useDeletePost,
│                           # useOptimisticCreatePost, useOptimisticDeletePost
└── useInvalidatePosts.ts

lib/
├── api/posts.ts            # Pure fetch functions — no caching, no side effects
├── query/queryClient.ts    # Query key registry + QueryClient factory
└── utils/
    ├── normalize.ts        # { byId, allIds } normalization + selector helpers
    └── helpers.ts          # filterPosts, paginateArray, truncate, getPostReadTime

providers/QueryProvider.tsx # ReactQueryDevtools included
types/index.ts              # Post, Comment, NormalizedPosts, PaginatedResult, …
```

**Rules enforced across the codebase:**
- No `fetch` inside components — React Query owns all server state
- No business logic in UI — containers compose, components render
- Hooks return structured `{ data, isLoading, error, refetch }` — no raw query objects leak out

---

## Query Keys

```ts
queryKeys.posts                // ["posts"]
queryKeys.post(id)             // ["post", id]
queryKeys.comments(postId)     // ["comments", postId]
```

---

## Optimistic Updates

**Create** — adds a temporary post (id = `Date.now()`) to the normalized cache immediately. On error the previous cache snapshot is restored. On settle the real data is re-fetched.

**Delete** — removes the post from the normalized cache immediately. On error the snapshot is restored. Never leaves the UI in a broken state.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Type check
npx tsc --noEmit

# Production build
npm run build
```

---

## Project Structure at a Glance

```
blog-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── create/page.tsx
│   ├── edit/[id]/page.tsx
│   └── posts/[id]/page.tsx
├── components/
│   ├── layout/
│   ├── posts/
│   └── ui/
├── features/posts/
├── hooks/
│   ├── mutations/
│   └── queries/
├── lib/
│   ├── api/
│   ├── query/
│   └── utils/
├── providers/
└── types/
```

---

## API

All data comes from the public [JSONPlaceholder](https://jsonplaceholder.typicode.com) REST API.

| Method | Endpoint | Used for |
|---|---|---|
| `GET` | `/posts` | Fetch all posts |
| `GET` | `/posts/:id` | Fetch single post |
| `GET` | `/posts/:id/comments` | Fetch post comments |
| `POST` | `/posts` | Create post |
| `PUT` | `/posts/:id` | Update post |
| `DELETE` | `/posts/:id` | Delete post |

> JSONPlaceholder simulates responses — mutations are reflected in the UI via optimistic updates and cache management, not persisted server-side.
