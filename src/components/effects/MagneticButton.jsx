import { motion } from 'framer-motion';

/**
 * Magnetic Button Component
 * Creates a magnetic effect where button moves towards cursor
 */
const MagneticButton = ({ children, strength = 0.3, className = '', ...props }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-block transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
