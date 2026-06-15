import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CreatePostContainer from "@/features/posts/CreatePostContainer";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Write and publish a new blog post.",
};

export default function CreatePostPage() {
  return (
    <Container as="main">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Create New Post
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Share your thoughts with the world.
        </p>
      </div>
      <CreatePostContainer />
    </Container>
  );
}
