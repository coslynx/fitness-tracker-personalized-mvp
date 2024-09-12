import React from 'react';
import { ButtonProps } from '@/types';
import { motion } from 'framer-motion';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const buttonClasses = `bg-${
    type === 'primary'
      ? 'blue-500'
      : type === 'secondary'
      ? 'gray-400'
      : 'red-500'
  } hover:bg-${
    type === 'primary'
      ? 'blue-700'
      : type === 'secondary'
      ? 'gray-500'
      : 'red-700'
  } text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${
    size === 'sm'
      ? 'text-sm'
      : size === 'lg'
      ? 'text-lg'
      : 'text-base'
  } ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;