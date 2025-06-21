import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const uploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "PDF File Lovdey",
      createdAt: "2025-06-21 12:20:50.159856+00",
      summary_text: "Description",
      status: "completed",
    },
  ];
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              Summaries
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transform documents into actionable insights
            </p>
          </div>

          <Link href="/upload" passHref>
            <Button className="bg-indigo-600 hover:bg-indigo-800 dark:bg-gray-50 dark:hover:bg-gray-200 dark:text-gray-900 text-white px-4 py-2 h-9 text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Summary
            </Button>
          </Link>
        </div>
        <div className="mb-8 bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-700 rounded-lg px-4 py-3 text-sm text-indigo-800 dark:text-indigo-200 shadow-sm flex justify-between items-center flex-col md:flex-row gap-2">
          <span>
            You've reached your limit of <strong>5 uploads</strong> on the Basic
            plan.
          </span>
          <Link
            href="/pricing"
            className="text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:underline"
          >
            Upgrade Plan →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg_grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </main>
  );
}
