import type { Comment, CreatePostInput, Post, UpdatePostInput, User } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getPosts(): Promise<Post[]> {
  return fetchJSON<Post[]>(`${BASE_URL}/posts`);
}

export async function getPostById(id: number): Promise<Post> {
  return fetchJSON<Post>(`${BASE_URL}/posts/${id}`);
}

export async function getPostComments(id: number): Promise<Comment[]> {
  return fetchJSON<Comment[]>(`${BASE_URL}/posts/${id}/comments`);
}

export async function createPost(data: CreatePostInput): Promise<Post> {
  return fetchJSON<Post>(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export async function updatePost(
  id: number,
  data: UpdatePostInput
): Promise<Post> {
  return fetchJSON<Post>(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, id }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function deletePost(id: number): Promise<void> {
  await fetchJSON<Record<string, never>>(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
}

export async function getUsers(): Promise<User[]> {
  return fetchJSON<User[]>(`${BASE_URL}/users`);
}
