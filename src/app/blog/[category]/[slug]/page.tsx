import { parsePostAbstract, getPostPaths, getPostDetail, parseToc } from "@/lib/post";
import { PostHeader } from "@/components/post_detail/PostHeader";
import { PostBody } from "@/components/post_detail/PostBody";
import { notFound } from "next/navigation";
import Giscus from "@/components/post_detail/Giscus";
import TableOfContent from "@/components/post_detail/TableOfContent";

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.category, slug: item.slug }));
  return paramList;
}

export type paramsType = Promise<{ category: string; slug: string }>;

export default async function PostDetailPage(props: { params: paramsType }) {
  const { category, slug } = await props.params;
  const post = await getPostDetail(category, slug);
  const toc = parseToc(post.content);

  if (!post) {
    return notFound();
  }

  return (
    <div className="prose mx-auto w-full max-w-[800px] px-5 dark:prose-invert sm:px-6">
      <PostHeader post={post} />
      <article className="relative">
        <TableOfContent toc={toc} />
        <PostBody post={post} />
      </article>
      <hr className="my-10" />
      <Giscus />
    </div>
  );
}
