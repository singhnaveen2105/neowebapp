import { Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ArticleMetaProps {
  author: string;
  postedDate: string;
  timeToRead: number;
}

export default function ArticleMeta({
  author,
  postedDate,
  timeToRead,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
      <span className="inline-flex items-center gap-1.5">
        <User className="h-4 w-4" aria-hidden />
        {author}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4" aria-hidden />
        {formatDate(postedDate)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" aria-hidden />
        {timeToRead} min read
      </span>
    </div>
  );
}
