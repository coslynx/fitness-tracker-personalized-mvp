import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { goalSchema, workoutSchema } from '@/utils/validation';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'POST') {
    if (req.query.type === 'goal') {
      try {
        const validatedGoal = await goalSchema.validate(req.body);
        const goal = await prisma.goal.create({
          data: {
            ...validatedGoal,
            userId,
          },
        });
        return res.status(201).json(goal);
      } catch (error) {
        console.error('Error creating goal:', error);
        return res.status(500).json({ error: 'Error creating goal' });
      }
    } else if (req.query.type === 'workout') {
      try {
        const validatedWorkout = await workoutSchema.validate(req.body);
        const workout = await prisma.workout.create({
          data: {
            ...validatedWorkout,
            userId,
          },
        });
        return res.status(201).json(workout);
      } catch (error) {
        console.error('Error creating workout:', error);
        return res.status(500).json({ error: 'Error creating workout' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } else if (req.method === 'GET') {
    if (req.query.type === 'goals') {
      try {
        const goals = await prisma.goal.findMany({
          where: { userId },
          orderBy: { deadline: 'asc' },
        });
        return res.status(200).json(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
        return res.status(500).json({ error: 'Error fetching goals' });
      }
    } else if (req.query.type === 'workouts') {
      try {
        const workouts = await prisma.workout.findMany({
          where: { userId },
          orderBy: { date: 'desc' },
        });
        return res.status(200).json(workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        return res.status(500).json({ error: 'Error fetching workouts' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } else if (req.method === 'PUT') {
    if (req.query.type === 'goal') {
      const goalId = parseInt(req.query.id as string);
      try {
        const validatedGoal = await goalSchema.validate(req.body);
        const updatedGoal = await prisma.goal.update({
          where: { id: goalId },
          data: {
            ...validatedGoal,
            userId,
          },
        });
        return res.status(200).json(updatedGoal);
      } catch (error) {
        console.error('Error updating goal:', error);
        return res.status(500).json({ error: 'Error updating goal' });
      }
    } else if (req.query.type === 'workout') {
      const workoutId = parseInt(req.query.id as string);
      try {
        const validatedWorkout = await workoutSchema.validate(req.body);
        const updatedWorkout = await prisma.workout.update({
          where: { id: workoutId },
          data: {
            ...validatedWorkout,
            userId,
          },
        });
        return res.status(200).json(updatedWorkout);
      } catch (error) {
        console.error('Error updating workout:', error);
        return res.status(500).json({ error: 'Error updating workout' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } else if (req.method === 'DELETE') {
    if (req.query.type === 'goal') {
      const goalId = parseInt(req.query.id as string);
      try {
        await prisma.goal.delete({ where: { id: goalId } });
        return res.status(204).send();
      } catch (error) {
        console.error('Error deleting goal:', error);
        return res.status(500).json({ error: 'Error deleting goal' });
      }
    } else if (req.query.type === 'workout') {
      const workoutId = parseInt(req.query.id as string);
      try {
        await prisma.workout.delete({ where: { id: workoutId } });
        return res.status(204).send();
      } catch (error) {
        console.error('Error deleting workout:', error);
        return res.status(500).json({ error: 'Error deleting workout' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}