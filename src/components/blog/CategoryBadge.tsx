import Link from "next/link";
import { getCategoryInfo } from "@/lib/categories";

export default function CategoryBadge({ category }: { category: string }) {
  const info = getCategoryInfo(category);
  const Icon = info.icon;

  return (
    <Link
      href={`/category/${category}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${info.bgColor} ${info.color}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {info.label}
    </Link>
  );
}
