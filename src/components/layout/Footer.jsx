import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter },
    { name: 'Email', icon: Mail, url: `mailto:${personalInfo.social.email}` },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-dark-50 dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800">
      <div className="section-container">
        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-400 hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a href="#home" className="inline-block">
            <span className="text-2xl font-bold gradient-text">
              {personalInfo.firstName}
            </span>
          </a>
          <p className="mt-2 text-dark-500 dark:text-dark-400">
            {personalInfo.roles[0]}
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target={social.name !== 'Email' ? '_blank' : undefined}
              rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="p-3 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-500 hover:text-primary-500 hover:border-primary-500 transition-all shadow-sm"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-dark-300 dark:to-dark-700" />
          <div className="w-2 h-2 rounded-full bg-primary-500" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-dark-300 dark:to-dark-700" />
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="flex items-center justify-center gap-1.5 text-dark-500 dark:text-dark-400">
            © {currentYear} {personalInfo.name}. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
          </p>
          <p className="mt-2 text-dark-400 dark:text-dark-500">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
