import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Join DocChat</h1>
        <p className="text-gray-600 mt-2 text-sm">
          Create your account to get started summarizing PDFs effortlessly.
        </p>
      </div>

      <SignUp appearance={{ elements: { card: "shadow-xl rounded-xl" } }} />
    </div>
  );
}
