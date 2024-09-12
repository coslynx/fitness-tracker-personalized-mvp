import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";

const Index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const store = useStore();

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to the Fitness Tracker!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Track your progress, set goals, and connect with a supportive
          community.
        </p>
        {!session && status === "loading" && (
          <p className="text-center">Loading...</p>
        )}
        {!session && status === "unauthenticated" && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;