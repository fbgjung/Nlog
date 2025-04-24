import { Post } from "@/config/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/mdx";
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface PostBodyProps {
  post: Post;
}

export function PostBody({ post }: PostBodyProps) {
  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'dracula-soft' ,
                keepBackground: false,
              },
            ],
            rehypeSlug,
          ],
        },
      }}
      components={MdxComponents}
    />
  );
}
