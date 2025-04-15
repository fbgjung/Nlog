import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { Post } from "@/config/types";
interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      key={`${post.category}-${post.slug}`}
      href={`/blog/${post.category}/${post.slug}`}
      className="block rounded-lg border border-gray-200 overflow-hidden hover:border-yellow-200 hover:border-2 shadow-sm hover:shadow-md transition-shadow"
    >
      {post.thumbnail && (
        <div className="relative w-full h-48">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority={true}
            loading="eager"
          />
        </div>
      )}
      <div className="p-6">
        <span className="text-yellow-500">{post.category}</span>
        <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
        <p className="mb-2 text-sm text-gray-400">{post.desc}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{post.dateString}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingMinutes}분</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
