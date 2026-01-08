import { motion } from 'framer-motion';

/**
 * Input Component
 * Styled input field with label and validation states
 */
const Input = ({ 
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white dark:bg-dark-800
          border ${error ? 'border-red-500' : 'border-dark-200 dark:border-dark-700'}
          text-dark-900 dark:text-white
          placeholder-dark-400 dark:placeholder-dark-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      
      {error && (
        <motion.p 
          id={`${name}-error`}
          className="mt-2 text-sm text-red-500"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

/**
 * Textarea Component
 */
const Textarea = ({ 
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  ...props 
}) => {
  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl resize-none
          bg-white dark:bg-dark-800
          border ${error ? 'border-red-500' : 'border-dark-200 dark:border-dark-700'}
          text-dark-900 dark:text-white
          placeholder-dark-400 dark:placeholder-dark-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      
      {error && (
        <motion.p 
          id={`${name}-error`}
          className="mt-2 text-sm text-red-500"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export { Input, Textarea };
export default Input;
