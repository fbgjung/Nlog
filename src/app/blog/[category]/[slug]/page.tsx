import { parsePostAbstract, getPostPaths, getPostDetail } from "@/lib/post";
import { PostHeader } from "@/components/post_detail/PostHeader";
import { PostBody } from "@/components/post_detail/PostBody";
import { notFound } from "next/navigation";

// type Props = {
//   params: { category: string; slug: string };
// };

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.category, slug: item.slug }));
  return paramList;
}

export default async function PostDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getPostDetail(params.category, params.slug);

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
