import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import Header from '@/components/Header';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import SocialShareButton from '@/components/SocialShareButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const [workoutId, setWorkoutId] = useState<number | undefined>(undefined);
  const [goalId, setGoalId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const searchParams = new URLSearchParams(router.search);
      const workoutIdFromQuery = searchParams.get('workoutId');
      const goalIdFromQuery = searchParams.get('goalId');
      setWorkoutId(workoutIdFromQuery ? parseInt(workoutIdFromQuery) : undefined);
      setGoalId(goalIdFromQuery ? parseInt(goalIdFromQuery) : undefined);
      setIsDashboard(!!workoutId || !!goalId);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (session) {
      // Fetch initial data when session changes
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        {session && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              {isDashboard ? (
                <>
                  <div className="mb-4">
                    <SocialShareButton workoutId={workoutId} goalId={goalId} />
                  </div>
                  {workoutId && <ProgressChart workoutId={workoutId} />}
                  {goalId && <ProgressChart goalId={goalId} />}
                </>
              ) : (
                <GoalInput
                  onSubmit={(goal) => {
                    // Handle goal submission
                  }}
                />
              )}
            </div>
            {/* ... Rest of the dashboard content */}
          </div>
        )}
        {/* ... content to display if not logged in */}
      </main>
    </>
  );
};

export default Layout;