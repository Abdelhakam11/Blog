import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import EditPostContainer from "@/features/posts/EditPostContainer";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditPostPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Post #${id}`,
    description: `Editing post number ${id}`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  return (
    <Container as="main">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Edit Post
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Update your post content below.
        </p>
      </div>
      <EditPostContainer id={postId} />
    </Container>
  );
}
