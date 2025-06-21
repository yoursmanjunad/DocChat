import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";
import { cn } from "@/lib/utils";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string;
  createdAt: string | null;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-base xl:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
        {title}
      </h3>
      <p className="text-xs text-gray-500">{createdAt}</p>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        " px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
        {/* Delete Button */}
        <div className="absolute top-3 right-3 z-10">
          <DeleteButton />
        </div>

        {/* Main Clickable Area */}
        <Link href={`summaries/${summary.id}`} className="block p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm leading-relaxed pl-1">
              {summary.summary_text}
            </p>
            <div className="flex justify-between items-center mt-3">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
