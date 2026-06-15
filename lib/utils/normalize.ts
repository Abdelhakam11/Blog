import type { Comment, NormalizedComments, NormalizedPosts, Post } from "@/types";

export function normalizePosts(posts: Post[]): NormalizedPosts {
  return posts.reduce<NormalizedPosts>(
    (acc, post) => {
      acc.byId[post.id] = post;
      acc.allIds.push(post.id);
      return acc;
    },
    { byId: {}, allIds: [] }
  );
}

export function normalizeComments(comments: Comment[]): NormalizedComments {
  return comments.reduce<NormalizedComments>(
    (acc, comment) => {
      acc.byId[comment.id] = comment;
      acc.allIds.push(comment.id);
      return acc;
    },
    { byId: {}, allIds: [] }
  );
}

export function selectPostById(
  normalized: NormalizedPosts,
  id: number
): Post | undefined {
  return normalized.byId[id];
}

export function selectAllPosts(normalized: NormalizedPosts): Post[] {
  return normalized.allIds.map((id) => normalized.byId[id]).filter(Boolean);
}

export function selectAllComments(normalized: NormalizedComments): Comment[] {
  return normalized.allIds.map((id) => normalized.byId[id]).filter(Boolean);
}

export function addPostToNormalized(
  normalized: NormalizedPosts,
  post: Post
): NormalizedPosts {
  return {
    byId: { ...normalized.byId, [post.id]: post },
    allIds: normalized.allIds.includes(post.id)
      ? normalized.allIds
      : [post.id, ...normalized.allIds],
  };
}

export function removePostFromNormalized(
  normalized: NormalizedPosts,
  id: number
): NormalizedPosts {
  const { [id]: _removed, ...byId } = normalized.byId;
  return {
    byId,
    allIds: normalized.allIds.filter((postId) => postId !== id),
  };
}

export function updatePostInNormalized(
  normalized: NormalizedPosts,
  post: Post
): NormalizedPosts {
  return {
    ...normalized,
    byId: { ...normalized.byId, [post.id]: post },
  };
}
