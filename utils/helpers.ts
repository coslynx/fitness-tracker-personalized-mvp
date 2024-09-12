import { DateTime } from 'luxon';

export const formatDate = (date: Date | string | number) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy');
};

export const formatTime = (time: Date | string | number) => {
  if (typeof time === 'string') {
    time = new Date(time);
  }
  if (typeof time === 'number') {
    time = new Date(time);
  }
  return DateTime.fromJSDate(time).toFormat('hh:mm a');
};

export const calculateAge = (birthday: Date) => {
  const today = new Date();
  const age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    return age - 1;
  }

  return age;
};

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
) => {
  let timeout: NodeJS.Timeout;
  let result: any;

  return (...args: any[]) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        result = func(...args);
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func(...args);
    }

    return result;
  };
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};