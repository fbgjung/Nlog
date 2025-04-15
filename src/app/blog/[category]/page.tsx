import MainPage from "@/components/main/MainPage";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <MainPage category={params.category} />;
}
