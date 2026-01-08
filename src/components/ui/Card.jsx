import { motion } from 'framer-motion';

/**
 * Reusable Card Component
 * Supports glass morphism and hover effects
 */
const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  as = 'div',
  ...props 
}) => {
  const baseStyles = "rounded-2xl overflow-hidden";
  
  const variants = {
    default: "bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 shadow-lg",
    glass: "bg-white/70 dark:bg-dark-900/70 backdrop-blur-lg border border-white/20 dark:border-dark-700/50 shadow-glass dark:shadow-glass-dark",
    gradient: "bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-200/50 dark:border-primary-800/50",
    outline: "bg-transparent border-2 border-dark-200 dark:border-dark-700"
  };
  
  const hoverStyles = hover 
    ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" 
    : "";
  
  const cardClasses = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;
  
  const MotionComponent = motion[as] || motion.div;
  
  return (
    <MotionComponent
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;
