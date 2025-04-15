import CategoryList from "./CategoryList";
import PostList from "./PostList";
import { getSortedPostList, getCategoryDetailList } from "@/lib/post";

interface MainPageProps {
  category?: string;
}

export default async function MainPage({ category }: MainPageProps) {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();

  return (
    <section className="flex flex-col gap-8 pt-12 max-w-[950px] mx-auto">
      <CategoryList categoryList={categoryList} currentCategory={category} />
      <PostList posts={postList} />
    </section>
  );
}
