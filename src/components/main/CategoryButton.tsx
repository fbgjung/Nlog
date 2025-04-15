import Link from "next/link";

interface CategoryButtonProps {
  href: string;
  label: string;
  count: number;
  isActive?: boolean;
}

export function CategoryButton({
  href,
  label,
  count,
  isActive = false,
}: CategoryButtonProps) {
  return (
    <Link
      href={href}
      className={`rounded-md px-4 py-2 text-sm font-medium ${
        isActive ? "bg-yellow-300 text-gray-700" : "bg-white hover:bg-gray-100"
      }`}
    >
      {label} ({count})
    </Link>
  );
}
