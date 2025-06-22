export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Summary Not Found</h2>
      <p className="text-gray-600 mb-4">
        The summary you're looking for doesn't exist or has been removed.
      </p>
      <a
        href="/summaries"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Summaries
      </a>
    </div>
  );
}
