import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    if (session) {
      res.status(200).json({ user: session.user });
    } else {
      res.status(200).json({ user: null });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}