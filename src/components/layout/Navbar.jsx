import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import CommandPalette from './CommandPalette';

// Initialize to light mode by default
const getInitialDark = () => {
  return false;
};

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Open Source', href: '#opensource' },
  { name: 'Experience', href: '#experience' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Enforce light theme state on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (href === '#resume') {
      window.open('/AyushChaudhary_Resume.pdf', '_blank');
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-sm border-b border-dark-200 dark:border-dark-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + System status indicator */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                className="text-xl font-bold text-dark-900 dark:text-white font-display"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-primary-500">A</span>yush
                <span className="text-xs text-dark-400 dark:text-dark-500 font-mono ml-1">/SYS</span>
              </motion.a>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-[10px] text-green-700 dark:text-green-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>BUILDING</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg font-mono"
                >
                  {link.name}
                </button>
              ))}

              {/* Command Palette Trigger */}
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900/60 hover:bg-dark-100 dark:hover:bg-dark-800 text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-all font-mono text-[10px]"
                aria-label="Open command palette"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">ACTIONS</span>
                <kbd className="bg-white dark:bg-dark-800 px-1 rounded border border-dark-200 dark:border-dark-700">⌘K</kbd>
              </button>
            </div>

            {/* Mobile Menu Button + Search Icon */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="p-2 rounded-lg text-dark-600 dark:text-dark-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-dark-600 dark:text-dark-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-4 py-3 text-dark-600 dark:text-dark-300 hover:text-primary-500 hover:bg-dark-50 dark:hover:bg-dark-800 rounded-lg transition-colors font-mono text-sm"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
};

export default Navbar;
