import { motion } from 'framer-motion';

/**
 * Section Header Component
 * Used for consistent section titles throughout the site.
 * Supports `badge` (top pill label), `title`, `subtitle` (description line).
 * Pass `dark` to use lighter text colors for dark section backgrounds.
 */
const SectionHeader = ({
  badge,
  title,
  subtitle,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const underlineAlign = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  };

  return (
    <motion.div
      className={`max-w-3xl mb-12 ${alignStyles[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Badge pill — small label above the title */}
      {badge && (
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-full">
            <span className="w-1 h-1 rounded-full bg-primary-500" />
            {badge}
          </span>
        </motion.div>
      )}

      {/* Legacy subtitle as badge (if badge not provided) */}
      {!badge && subtitle && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
            {subtitle}
          </span>
        </motion.div>
      )}

      {/* Main title */}
      <h2
        className={`relative inline-block text-3xl md:text-4xl font-bold mb-2 ${
          dark ? 'text-white' : 'text-dark-900 dark:text-white'
        }`}
      >
        {title}
        <motion.span
          className={`absolute -bottom-2 ${underlineAlign[align]} h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </h2>

      {/* Subtitle as description line (when badge prop is used, subtitle is the description) */}
      {badge && subtitle && (
        <p
          className={`mt-5 text-sm leading-relaxed ${
            dark ? 'text-dark-400' : 'text-dark-500 dark:text-dark-400'
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Explicit description prop */}
      {description && (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            dark ? 'text-dark-400' : 'text-dark-600 dark:text-dark-400'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
