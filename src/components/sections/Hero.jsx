import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Search } from 'lucide-react';
import { Button } from '../ui';
import { personalInfo } from '../../data';
import SystemGraph from './SystemGraph';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative bg-dark-50 dark:bg-dark-950 overflow-hidden pt-20"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      {/* Decorative technical line */}
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-dark-200/30 dark:bg-dark-800/30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-dark-200/30 dark:bg-dark-800/30 pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Editorial Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col text-left"
          >
            {/* System Status Micro-Label */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 mb-6 text-[10px] font-mono tracking-widest text-primary-500 uppercase"
            >
              <span>SYSTEM.RUNNING</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-dark-400">/ VERSION_2.0</span>
            </motion.div>

            {/* Title / Name */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark-900 dark:text-white mb-4 uppercase font-display leading-[1.1]"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-lg sm:text-xl font-mono text-primary-600 dark:text-primary-400 font-semibold mb-6 uppercase tracking-wider"
            >
              Software Engineer / System Builder
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-dark-600 dark:text-dark-400 max-w-xl mb-8 leading-relaxed font-sans"
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* Action buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button 
                href="#projects" 
                variant="primary"
                size="md"
                className="font-mono text-xs tracking-wider"
              >
                EXPLORE SYSTEMS
              </Button>
              <Button 
                href={personalInfo.resumePath}
                variant="outline"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-wider"
              >
                <Download className="w-4 h-4 mr-2" />
                RÉSUMÉ
              </Button>
            </motion.div>

            {/* Micro annotations / metadata footer */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-dark-200 dark:border-dark-800 text-[10px] text-dark-400 font-mono tracking-widest uppercase"
            >
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">GITHUB</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" />
                <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">LINKEDIN</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-primary-500 transition-colors">EMAIL</a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Constellation Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <SystemGraph />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-dark-400 hover:text-primary-500 transition-colors font-mono text-[9px] tracking-widest uppercase"
        >
          <span>SYS.SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-1"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
