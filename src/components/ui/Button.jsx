import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '../../utils/animations';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  icon = null,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-medical focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-600 focus:ring-secondary-500',
    outline: 'border border-border text-text-primary hover:bg-secondary-50 focus:ring-primary-500',
    ghost: 'text-text-primary hover:bg-secondary-50 focus:ring-primary-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `;
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
  };
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      whileHover={!disabled && !loading ? buttonHover : {}}
      whileTap={!disabled && !loading ? buttonTap : {}}
      {...props}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </motion.button>
  );
};

export default Button;