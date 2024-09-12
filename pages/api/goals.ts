import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, name, target, deadline } = req.body;

    try {
      const newGoal = await prisma.goal.create({
        data: {
          userId,
          name,
          target,
          deadline: new Date(deadline),
        },
      });
      res.status(201).json(newGoal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Error creating goal' });
    }
  } else if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string);

    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId,
        },
        orderBy: {
          deadline: 'asc',
        },
      });
      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Error fetching goals' });
    }
  } else if (req.method === 'PUT') {
    const goalId = parseInt(req.query.goalId as string);
    const { name, target, deadline } = req.body;

    try {
      const updatedGoal = await prisma.goal.update({
        where: {
          id: goalId,
        },
        data: {
          name,
          target,
          deadline: new Date(deadline),
        },
      });
      res.status(200).json(updatedGoal);
    } catch (error) {
      console.error('Error updating goal:', error);
      res.status(500).json({ error: 'Error updating goal' });
    }
  } else if (req.method === 'DELETE') {
    const goalId = parseInt(req.query.goalId as string);

    try {
      await prisma.goal.delete({
        where: {
          id: goalId,
        },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).json({ error: 'Error deleting goal' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}