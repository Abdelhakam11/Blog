import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostDetailContainer from "@/features/posts/PostDetailContainer";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post #${id}`,
    description: `Reading post number ${id}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  return (
    <Container as="main" className="max-w-3xl">
      <PostDetailContainer id={postId} />
    </Container>
  );
}
