import Link from "next/link";

interface TagListProps {
  tags: string[];
  limit?: number;
}

export default function TagList({ tags, limit }: TagListProps) {
  const visible = limit ? tags.slice(0, limit) : tags;
  const remaining = limit && tags.length > limit ? tags.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          #{tag}
        </Link>
      ))}
      {remaining > 0 && (
        <span className="px-2 py-0.5 text-xs text-gray-400">
          +{remaining} more
        </span>
      )}
    </div>
  );
}
