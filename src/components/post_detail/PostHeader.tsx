import { Post } from "@/config/types";
import { CalendarDays, Clock } from "lucide-react";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mt-8 text-center sm:mt-14">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-4 text-blue-600 font-bold">{post.desc}</p>
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <time dateTime={post.date}>{post.dateString}</time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{post.readingMinutes}분</span>
        </div>
      </div>
      <hr className="mt-8 sm:mt-14" />
    </header>
  );
}
