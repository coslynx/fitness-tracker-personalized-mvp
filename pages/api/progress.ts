import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string);
    const workoutId = req.query.workoutId
      ? parseInt(req.query.workoutId as string)
      : undefined;
    const goalId = req.query.goalId
      ? parseInt(req.query.goalId as string)
      : undefined;

    try {
      const progressData = await prisma.workout.findMany({
        where: {
          userId,
          ...(workoutId ? { id: workoutId } : {}),
        },
        orderBy: {
          date: 'desc',
        },
        select: {
          date: true,
          calories: true,
        },
      });

      const goalProgressData = await prisma.goal.findMany({
        where: {
          userId,
          ...(goalId ? { id: goalId } : {}),
        },
        orderBy: {
          deadline: 'desc',
        },
        select: {
          deadline: true,
          target: true,
        },
      });

      // Calculate progress for goals
      const formattedGoalProgressData = goalProgressData.map((goal) => ({
        date: goal.deadline,
        value: goal.target,
      }));

      // Combine workout and goal progress data
      const combinedProgressData = [
        ...progressData.map((workout) => ({
          date: workout.date,
          value: workout.calories,
        })),
        ...formattedGoalProgressData,
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      res.status(200).json(combinedProgressData);
    } catch (error) {
      console.error('Error fetching progress data:', error);
      res.status(500).json({ error: 'Error fetching progress data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}