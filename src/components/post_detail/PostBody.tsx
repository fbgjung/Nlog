import { Post } from "@/config/types";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PostBodyProps {
  post: Post;
}

export function PostBody({ post }: PostBodyProps) {
  return <MDXRemote source={post.content} />;
}
