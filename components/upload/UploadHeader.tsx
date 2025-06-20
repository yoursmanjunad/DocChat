import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="p-[1px] rounded-full bg-gradient-to-r from-indigo-200 via-indigo-500 to-indigo-700 ">
        <Badge
          variant={"secondary"}
          className="bg-white text-gray-800 px-6 py-2 text-base font-medium rounded-full flex items-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>AI-Powered Summary Creation</span>
        </Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Start Uploading Your PDFs
      </h1>

      <p className="text-gray-600 max-w-md text-base sm:text-lg">
        Upload your PDF and let our AI do the magic — fast, accurate, and
        effortless!
      </p>
    </div>
  );
}
