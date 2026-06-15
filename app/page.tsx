import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostsContainer from "@/features/posts/PostsContainer";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all blog posts from our community of writers.",
};

export default function HomePage() {
  return (
    <Container>
      <PostsContainer />
    </Container>
  );
}
