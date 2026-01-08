import { motion } from 'framer-motion';

/**
 * Section Header Component
 * Used for consistent section titles throughout the site
 */
const SectionHeader = ({ 
  title, 
  subtitle,
  description,
  align = 'center',
  className = '' 
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };
  
  const underlineAlign = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  };
  
  return (
    <motion.div 
      className={`max-w-3xl mb-12 ${alignStyles[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span 
            className="inline-block px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full"
          >
            {subtitle}
          </span>
        </motion.div>
      )}
      
      <h2 className="relative inline-block text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-2">
        {title}
        <motion.span 
          className={`absolute -bottom-2 ${underlineAlign[align]} h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </h2>
      
      {description && (
        <p className="mt-6 text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
