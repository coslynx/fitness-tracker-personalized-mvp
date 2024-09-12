import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";

interface DashboardProps {
  workoutId?: number;
  goalId?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ workoutId, goalId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const store = useStore();

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1">
        {workoutId || goalId ? (
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
              store.setNotification({
                type: "success",
                message: "Goal created successfully!",
              });
              router.push(`/dashboard?goalId=${goal.id}`);
            }}
          />
        )}
      </div>
      <div className="col-span-1">
        {/* ... Rest of the dashboard content */
      </div>
    </div>
  );
};

export default Dashboard;