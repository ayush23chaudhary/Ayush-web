import { motion } from 'framer-motion';

/**
 * Badge Component
 * Used for skills, technologies, and tags
 */
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '' 
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-medium transition-all duration-300";
  
  const variants = {
    default: "bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 border border-dark-200 dark:border-dark-700",
    primary: "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800",
    accent: "bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-800",
    success: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800",
    gradient: "bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs rounded-md",
    md: "px-3 py-1 text-sm rounded-lg",
    lg: "px-4 py-1.5 text-base rounded-xl"
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  
  return (
    <motion.span 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {Icon && <Icon className={iconSizes[size]} />}
      {children}
    </motion.span>
  );
};

export default Badge;
