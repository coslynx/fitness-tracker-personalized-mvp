import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { useStore } from "@/store/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

interface AppProps {
  Component: any;
  pageProps: { [key: string]: any };
  session: Session | null;
}

export default function App({ Component, pageProps, session }: AppProps) {
  const store = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        store.setNotification({
          type: "error",
          message: "Error fetching initial data. Please try again later.",
        });
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} initialData={initialData} />
      </Layout>
    </SessionProvider>
  );
}