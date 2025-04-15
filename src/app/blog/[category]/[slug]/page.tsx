import { getPostList, parsePostAbstract, getPostPaths } from "@/lib/post";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/post_detail/PostHeader";
import { PostBody } from "@/components/post_detail/PostBody";

type Props = {
  params: { category: string; slug: string };
};

export async function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.category, slug: item.slug }));
  return paramList;
}

export default async function PostDetailPage({
  params: { category, slug },
}: Props) {
  const posts = await getPostList(category);
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return notFound();
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
