import { object, string, date, number, mixed } from 'yup';

export const goalSchema = object().shape({
  userId: number().required(),
  name: string().required().min(3).max(50),
  target: string().required().min(1),
  deadline: date().required(),
});

export const workoutSchema = object().shape({
  userId: number().required(),
  name: string().required().min(3).max(50),
  duration: number().required().min(1),
  calories: number().required().min(1).max(5000),
  date: date().required(),
});

export const loginSchema = object().shape({
  email: string().email().required(),
  password: string().required().min(6),
});