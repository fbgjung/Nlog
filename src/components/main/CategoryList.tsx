"use client";

import { CategoryDetail } from "@/config/types";
import { CategoryButton } from "./CategoryButton";

interface CategoryListProps {
  categoryList: CategoryDetail[];
  currentCategory?: string;
}

export default function CategoryList({
  categoryList,
  currentCategory,
}: CategoryListProps) {
  const totalCount = categoryList.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="flex flex-wrap gap-2 px-4 sm:px-6">
      <CategoryButton
        href="/blog"
        label="All"
        count={totalCount}
        isActive={!currentCategory}
      />
      {categoryList.map((category) => {
        const isActive =
          currentCategory?.toLowerCase() === category.dirName.toLowerCase();

        return (
          <CategoryButton
            key={category.dirName}
            href={`/blog/${category.dirName}`}
            label={category.publicName}
            count={category.count}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}
