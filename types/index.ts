export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreatePostInput {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostInput {
  userId?: number;
  title?: string;
  body?: string;
}

export interface NormalizedPosts {
  byId: Record<number, Post>;
  allIds: number[];
}

export interface NormalizedComments {
  byId: Record<number, Comment>;
  allIds: number[];
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationState;
}
