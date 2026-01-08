import { motion } from 'framer-motion';

/**
 * Reusable Button Component
 * Supports primary, secondary, and ghost variants
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href, 
  onClick, 
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 focus:ring-primary-500",
    secondary: "bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-200 border border-dark-200 dark:border-dark-700 hover:bg-dark-200 dark:hover:bg-dark-700 hover:-translate-y-0.5 active:translate-y-0 focus:ring-dark-400",
    ghost: "text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 focus:ring-primary-500",
    outline: "border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:-translate-y-0.5 focus:ring-primary-500"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
