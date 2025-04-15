import { getPostList } from "@/lib/post";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/post_detail/PostHeader";
import { PostBody } from "@/components/post_detail/PostBody";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostDetailPage({ params }: PageProps) {
  const posts = await getPostList(params.category);
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="prose mx-auto w-full max-w-[800px] px-5 dark:prose-invert sm:px-6">
      <PostHeader post={post} />
      <article className="relative">
        <PostBody post={post} />
      </article>
    </div>
  );
}
