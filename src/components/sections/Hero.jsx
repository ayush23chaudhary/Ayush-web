import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Zap } from 'lucide-react';
import { Button } from '../ui';
import { personalInfo } from '../../data';
import SystemGraph from './SystemGraph';

const ROLES = [
  'Full-Stack Developer',
  'ML Engineer',
  'Open Source Contributor',
  'System Builder',
];

/* ------------------------------------------------------------------
   Typewriter sub-component: cycles through roles with erase effect
------------------------------------------------------------------ */
const TypewriterRole = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const currentRole = ROLES[roleIdx];

    if (!isDeleting) {
      if (displayText === currentRole) {
        // Fully typed — pause then start deleting
        const pause = setTimeout(() => setIsDeleting(true), 2200);
        return () => clearTimeout(pause);
      }
      const type = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 75);
      return () => clearTimeout(type);
    } else {
      if (displayText === '') {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
        return;
      }
      const erase = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 38);
      return () => clearTimeout(erase);
    }
  }, [displayText, isDeleting, roleIdx, isPaused]);

  return (
    <div className="flex items-center gap-2 h-7 sm:h-8">
      <span className="text-primary-500 font-mono font-bold text-base sm:text-lg uppercase tracking-widest">
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="inline-block w-[2px] h-[1.1em] bg-primary-500 rounded-sm"
      />
    </div>
  );
};

/* ------------------------------------------------------------------
   Boot-up name: each character staggered in from below
------------------------------------------------------------------ */
const BootName = ({ name }) => {
  const words = name.split(' ');
  let globalIdx = 0;

  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-dark-900 dark:text-white uppercase font-display leading-none flex flex-wrap gap-x-3 sm:gap-x-4">
      {words.map((word, wIdx) => {
        const wordEl = (
          <span key={wIdx} className="inline-flex whitespace-nowrap">
            {word.split('').map((char, cIdx) => {
              const delay = 0.3 + globalIdx * 0.04;
              globalIdx++;
              return (
                <motion.span
                  key={cIdx}
                  initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay, ease: 'easeOut' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        return wordEl;
      })}
    </h1>
  );
};

/* ------------------------------------------------------------------
   Main Hero section
------------------------------------------------------------------ */
const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-white dark:bg-dark-950 overflow-hidden pt-20"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-primary-500/5 dark:bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/5 dark:bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Horizontal engineering rule lines */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary-500/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-primary-500/10 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 w-full py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 flex flex-col text-left">

            {/* System status bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8 self-start"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold text-green-700 dark:text-green-400 tracking-widest uppercase">Online</span>
              </div>
              <span className="text-[10px] font-mono text-dark-400 tracking-widest">SYS.ID / v2.0 / 2025</span>
            </motion.div>

            {/* Boot-up name */}
            <div className="mb-4">
              <BootName name={personalInfo.name} />
            </div>

            {/* Cycling role label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mb-6"
            >
              <TypewriterRole />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-sm sm:text-base text-dark-500 dark:text-dark-400 max-w-lg mb-8 leading-relaxed font-sans"
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button
                href="#projects"
                variant="primary"
                size="md"
                className="font-mono text-xs tracking-wider"
              >
                <Zap className="w-4 h-4 mr-2" />
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

            {/* Social links + divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-dark-200 dark:border-dark-800"
            >
              {[
                { icon: Github, label: 'GITHUB', href: personalInfo.social.github },
                { icon: Linkedin, label: 'LINKEDIN', href: personalInfo.social.linkedin },
                { icon: Mail, label: 'EMAIL', href: `mailto:${personalInfo.email}` },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-mono text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors tracking-widest uppercase group"
                >
                  <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  {label}
                </a>
              ))}
            </motion.div>

            {/* Quick stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              {[
                { value: '9.29', label: 'CGPA' },
                { value: 'Top 1%', label: 'AT GLA' },
                { value: '500+', label: 'DSA SOLVED' },
                { value: '4', label: 'OPEN SOURCE PRs' },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold font-mono text-primary-500">{value}</span>
                  <span className="text-[9px] font-mono text-dark-400 tracking-widest uppercase">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: SystemGraph ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative corner brackets */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary-500/30 rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary-500/30 rounded-br-lg" />
            <SystemGraph />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-dark-400 hover:text-primary-500 transition-colors font-mono text-[9px] tracking-widest uppercase"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
