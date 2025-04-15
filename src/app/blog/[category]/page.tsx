import MainPage from "@/components/main/MainPage";
import { getCategoryList } from "@/lib/post";

// interface CategoryPageProps {
//   params: {
//     category: string;
//   };
// }

export function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

export type ParamsType = Promise<{ category: string }>;

export default async function CategoryPage(props: { params: ParamsType }) {
  const { category } = await props.params;

  return <MainPage category={category} />;
}
