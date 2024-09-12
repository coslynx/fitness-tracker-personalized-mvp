import { useState } from 'react';
import { useStore } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface GoalInputProps {
  onSubmit: (goal: { name: string; target: string; deadline: Date }) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const store = useStore();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      store.setNotification({
        type: 'error',
        message: 'Please log in to create a goal!',
      });
      router.push('/login');
      return;
    }

    if (!name || !target || !deadline) {
      store.setNotification({
        type: 'error',
        message: 'Please fill in all fields!',
      });
      return;
    }

    onSubmit({ name, target, deadline });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="goalName" className="font-medium">
          Goal Name:
        </label>
        <input
          type="text"
          id="goalName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Lose 10 pounds"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="goalTarget" className="font-medium">
          Goal Target:
        </label>
        <input
          type="text"
          id="goalTarget"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 10 pounds"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="goalDeadline" className="font-medium">
          Deadline:
        </label>
        <input
          type="date"
          id="goalDeadline"
          value={deadline ? deadline.toISOString().slice(0, 10) : ''}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Goal
      </button>
    </form>
  );
};

export default GoalInput;