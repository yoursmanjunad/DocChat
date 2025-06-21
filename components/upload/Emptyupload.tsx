import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Emptyupload() {
  return (
    <div className="border border-gray-200/60 dark:border-gray-800/60 rounded-xl bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm">
      <div className="p-8">
        {/* Empty State or Content */}
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            No summaries yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Upload your first document to get started with AI-powered
            summarization
          </p>
          <Link href="/upload" passHref>
            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
            >
              Upload Document
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
