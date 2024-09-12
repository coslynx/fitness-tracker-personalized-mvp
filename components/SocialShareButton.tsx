import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';

interface SocialShareButtonProps {
  workoutId: number;
  goalId?: number;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  workoutId,
  goalId,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);
  const store = useStore();

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (data.user) {
        const shareUrl =
          goalId !== undefined
            ? `${process.env.NEXTAUTH_URL}/dashboard?goalId=${goalId}`
            : `${process.env.NEXTAUTH_URL}/dashboard?workoutId=${workoutId}`;

        if (window.navigator.share) {
          await window.navigator.share({
            title: 'Check out my fitness progress!',
            text: `I'm on my way to achieving my fitness goals! See my progress: ${shareUrl}`,
            url: shareUrl,
          });
        } else {
          store.setNotification({
            type: 'success',
            message: 'Copied share link to clipboard!',
          });
          navigator.clipboard.writeText(shareUrl);
        }
      } else {
        store.setNotification({
          type: 'error',
          message: 'Please log in to share your progress!',
        });
        router.push('/login');
      }
    } catch (error) {
      store.setNotification({
        type: 'error',
        message: 'Error sharing progress. Please try again later.',
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`px-4 py-2 rounded-md text-white font-medium ${
        isSharing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isSharing ? 'Sharing...' : 'Share'}
    </button>
  );
};

export default SocialShareButton;