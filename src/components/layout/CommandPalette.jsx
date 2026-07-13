import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft, Sparkles, Folder, Terminal, Compass, Briefcase, Mail, Download, Moon, Sun } from 'lucide-react';
import { personalInfo } from '../../data';
import { Badge } from '../ui';

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Always read dark state from the DOM so we stay in sync with Navbar toggle
  const isDarkMode = document.documentElement.classList.contains('dark');

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    // Dispatch storage event so Navbar's useEffect can stay aware (same-tab)
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { dark: !isDarkMode } }));
    onClose();
  };

  const actions = [
    {
      id: 'projects',
      title: 'Explore Featured Systems',
      subtitle: 'Browse SpeakWise, TransitOps, DiagramNote & case studies',
      icon: Folder,
      category: 'Navigation',
      perform: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'skills',
      title: 'Inspect Engineering Graph',
      subtitle: 'View active skills, languages & technical connections',
      icon: Terminal,
      category: 'Navigation',
      perform: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'opensource',
      title: 'Inspect Open Source Contributions',
      subtitle: 'PRs to Node.js, React Router, Next.js & React',
      icon: Compass,
      category: 'Navigation',
      perform: () => {
        document.getElementById('opensource')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'experience',
      title: 'View Engineering Journey',
      subtitle: 'Browse work history, education & milestones',
      icon: Briefcase,
      category: 'Navigation',
      perform: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'Download Technical Résumé',
      subtitle: 'Open Ayush\'s latest engineering resume PDF',
      icon: Download,
      category: 'Action',
      perform: () => {
        window.open(personalInfo.resumePath, '_blank');
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Start a Conversation',
      subtitle: 'Get in touch for internships & collaborations',
      icon: Mail,
      category: 'Navigation',
      perform: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }
  ];

  const filteredActions = actions.filter(action =>
    action.title.toLowerCase().includes(search.toLowerCase()) ||
    action.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    action.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, onClose]);

  // Adjust scroll position of active item
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.children[selectedIndex];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-950/40 dark:bg-dark-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Command header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200 dark:border-dark-800">
              <Search className="w-5 h-5 text-dark-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search engineering actions... (e.g. projects, resume)"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-dark-900 dark:text-white placeholder-dark-400 focus:outline-none text-base"
              />
              <Badge variant="default" size="sm" className="hidden sm:inline-flex text-[10px] tracking-widest font-mono">
                ESC
              </Badge>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto p-2" ref={listRef}>
              {filteredActions.length > 0 ? (
                filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={action.id}
                      onClick={() => action.perform()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' 
                          : 'text-dark-700 dark:text-dark-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-primary-500 text-white' : 'bg-dark-100 dark:bg-dark-800 text-dark-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-dark-900 dark:text-white'}`}>
                            {action.title}
                          </div>
                          <div className="text-xs text-dark-400 dark:text-dark-500 mt-0.5 font-mono">
                            {action.subtitle}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-primary-500">
                          <span>EXECUTE</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-dark-400 font-mono text-sm">
                  No matching systems actions found.
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between px-4 py-3 bg-dark-50 dark:bg-dark-800/40 border-t border-dark-200 dark:border-dark-800 text-[10px] text-dark-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>enter select</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary-500 animate-pulse" />
                <span>AYUSH_SYS_V2.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
