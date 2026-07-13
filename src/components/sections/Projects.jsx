import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Globe, ChevronRight, Folder } from 'lucide-react';
import { SectionHeader, Badge } from '../ui';
import { projects } from '../../data';

/* ------------------------------------------------------------------
   Live status chip
------------------------------------------------------------------ */
const StatusChip = ({ liveUrl }) => {
  if (!liveUrl) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700">
        <span className="w-1.5 h-1.5 rounded-full bg-dark-400" />
        <span className="text-[9px] font-mono text-dark-400 tracking-wider uppercase">SHIPPED</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
      <motion.span
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-green-500"
      />
      <span className="text-[9px] font-mono text-green-700 dark:text-green-400 tracking-wider uppercase font-bold">Live</span>
    </div>
  );
};

/* ------------------------------------------------------------------
   Architecture step flow
------------------------------------------------------------------ */
const ARCH_STEPS = {
  speakwise: ['Audio Capture', 'Speech-to-Text', 'Gemini AI Eval', 'Score Output'],
  transitops: ['Dispatcher Input', 'State Validator', 'DB Persistence', 'Analytics View'],
  diagramnote: ['MD Input', '300ms Debounce', 'Mermaid v11', 'SVG Canvas'],
  anonchat: ['User Connect', 'WS Pairing', 'Message Relay', 'Disconnect'],
  brajpath: ['Route Request', 'Data Fetch', 'Template Render', 'Client View'],
  'internship-recommender': ['User Profile', 'TF-IDF Vector', 'Cosine Match', 'Top 5 Output'],
};

const ArchFlow = ({ slug }) => {
  const steps = ARCH_STEPS[slug];
  if (!steps) return null;

  return (
    <div className="mt-5 p-4 rounded-xl bg-dark-50 dark:bg-dark-950 border border-dark-200/60 dark:border-dark-800/60">
      <div className="text-[8px] font-mono text-dark-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
        DATA FLOW
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-[9px] font-mono text-dark-700 dark:text-dark-300 font-semibold whitespace-nowrap"
            >
              {step}
            </motion.div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-3 h-3 text-dark-300 dark:text-dark-700 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   Impact bar
------------------------------------------------------------------ */
const ImpactBar = ({ impact }) => {
  if (!impact) return null;
  // Extract percentage if present
  const match = impact.match(/(\d+)%/);
  const pct = match ? parseInt(match[1]) : 60;

  return (
    <div className="mt-4 p-3.5 rounded-xl bg-primary-50/60 dark:bg-primary-950/10 border border-primary-100 dark:border-primary-900/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-primary-500 font-bold uppercase tracking-wider">SYSTEM_IMPACT</span>
        <span className="text-[9px] font-mono text-primary-500">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
        />
      </div>
      <p className="text-[10px] text-primary-600 dark:text-primary-400 mt-2 font-sans leading-relaxed">{impact}</p>
    </div>
  );
};

/* ------------------------------------------------------------------
   Step label (01, 02, 03 indicator)
------------------------------------------------------------------ */
const StepLabel = ({ n, label }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-dark-200 dark:bg-dark-700 text-[9px] font-mono font-bold text-dark-500 dark:text-dark-400 flex-shrink-0">
      {String(n).padStart(2, '0')}
    </div>
    <span className="text-[9px] font-mono text-dark-400 uppercase tracking-widest">{label}</span>
  </div>
);

/* ------------------------------------------------------------------
   Main Projects section
------------------------------------------------------------------ */
const FLAGSHIP_SLUGS = ['speakwise', 'transitops', 'diagramnote'];
const CATEGORIES = ['All', 'Full-Stack', 'AI/ML', 'Front-End'];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 bg-white dark:bg-dark-950 border-t border-dark-200/50 dark:border-dark-800/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Systems"
          title="Selected Work"
          subtitle="Running software with real users, real architecture, real impact"
          align="center"
        />

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-250 ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white dark:bg-dark-900 text-dark-500 dark:text-dark-400 border border-dark-200 dark:border-dark-800 hover:border-primary-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project list */}
        <div className="space-y-20 lg:space-y-28">
          {filtered.map((project, idx) => {
            const isFlagship = FLAGSHIP_SLUGS.includes(project.slug);
            const isEven = idx % 2 === 0;

            if (isFlagship) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-12 gap-10 items-start"
                >
                  {/* Copy block */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Index + status row */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[9px] font-mono text-dark-400 tracking-widest uppercase">
                        PROJECT_{String(idx + 1).padStart(2, '0')}
                      </span>
                      <StatusChip liveUrl={project.liveUrl} />
                      <span className="text-[9px] font-mono text-dark-400 uppercase">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white tracking-tight mb-6">
                      {project.title}
                    </h3>

                    {/* 3-step case study */}
                    <div className="space-y-5">
                      <div>
                        <StepLabel n={1} label="THE_PROBLEM" />
                        <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed pl-7">{project.problem}</p>
                      </div>
                      <div>
                        <StepLabel n={2} label="THE_SYSTEM" />
                        <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed pl-7">{project.description}</p>
                      </div>
                    </div>

                    {/* Architecture flow */}
                    <ArchFlow slug={project.slug} />

                    {/* Tech stack */}
                    <div className="mt-5">
                      <StepLabel n={3} label="THE_BUILD" />
                      <div className="flex flex-wrap gap-1.5 pl-7">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[9px] font-mono bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-dark-600 dark:text-dark-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact bar */}
                    <ImpactBar impact={project.impact} />

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-mono font-bold tracking-wider transition-all hover:shadow-lg hover:shadow-primary-500/25"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          LIVE SYSTEM
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 text-dark-700 dark:text-dark-300 text-xs font-mono font-bold tracking-wider transition-all hover:border-primary-500/40"
                        >
                          <Github className="w-3.5 h-3.5" />
                          SOURCE
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual / image block */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl border border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900 overflow-hidden group aspect-[4/3]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-grid-blueprint gap-3">
                          <Folder className="w-10 h-10 text-primary-500/40" />
                          <span className="text-[9px] font-mono text-dark-400 uppercase">SYS_{project.slug?.toUpperCase()}</span>
                        </div>
                      )}
                      {/* Category badge overlay */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-lg text-[8px] font-mono bg-dark-900/80 backdrop-blur text-dark-300 border border-dark-700">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            /* ── Compact card for non-flagship ── */
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="max-w-2xl mx-auto"
              >
                <div className="p-6 rounded-2xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-[9px] font-mono text-dark-400 uppercase tracking-widest mb-1">
                        PROJECT_{String(idx + 1).padStart(2, '0')} / {project.category}
                      </div>
                      <h4 className="text-base font-bold text-dark-900 dark:text-white">{project.title}</h4>
                    </div>
                    <StatusChip liveUrl={project.liveUrl} />
                  </div>
                  <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[8px] font-mono bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-500 dark:text-dark-400">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono font-semibold text-primary-500 hover:text-primary-600">
                        Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono font-semibold text-dark-400 hover:text-dark-600 dark:hover:text-dark-200">
                        Code <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
