import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6">
      {/* Heading outside Clerk card */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back to DocChat
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Sign in to access your summaries and continue where you left off.
        </p>
      </div>

      {/* Clerk sign-up component */}
      <SignIn appearance={{ elements: { card: "shadow-xl rounded-xl" } }} />
    </div>
  );
}
