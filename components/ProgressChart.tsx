import { useState, useEffect } from 'react';
import { Line } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { useStore } from '@/store/store';
import { useSession } from 'next-auth/react';

Chart.register(...registerables);

interface ProgressChartProps {
  workoutId: number;
  goalId?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workoutId, goalId }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const { data: session } = useSession();
  const store = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/progress/${session?.user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ workoutId, goalId }),
        });
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        store.setNotification({
          type: 'error',
          message: 'Error fetching progress data. Please try again later.',
        });
      }
    };

    if (session) {
      fetchData();
    }
  }, [session, workoutId, goalId]);

  useEffect(() => {
    if (chartData.length > 0) {
      const canvas = document.getElementById('progressChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      new Line(ctx, {
        data: {
          labels: chartData.map((dataPoint) => dataPoint.date),
          datasets: [
            {
              label: 'Progress',
              data: chartData.map((dataPoint) => dataPoint.value),
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Progress Chart',
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className="w-full h-96">
      <canvas id="progressChart" />
    </div>
  );
};

export default ProgressChart;