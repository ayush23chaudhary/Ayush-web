import { motion } from 'framer-motion';
import { GitMerge, GitPullRequest, ExternalLink, Github, Flame } from 'lucide-react';
import { SectionHeader, Button } from '../ui';
import { openSourceContributions } from '../../data';

/* ------------------------------------------------------------------
   Status config → left-border colour + badge style
------------------------------------------------------------------ */
const STATUS_CONFIG = {
  Merged: {
    border: 'border-l-green-500',
    badgeBg: 'bg-green-950/40 border-green-700',
    badgeText: 'text-green-400',
    icon: GitMerge,
    dot: 'bg-green-500',
    label: 'MERGED',
    impact: 'HIGH',
    impactColor: 'text-amber-400',
  },
  Open: {
    border: 'border-l-primary-500',
    badgeBg: 'bg-primary-950/40 border-primary-700',
    badgeText: 'text-primary-400',
    icon: GitPullRequest,
    dot: 'bg-primary-500',
    label: 'OPEN',
    impact: 'ACTIVE',
    impactColor: 'text-primary-400',
  },
  Closed: {
    border: 'border-l-dark-600',
    badgeBg: 'bg-dark-800 border-dark-600',
    badgeText: 'text-dark-400',
    icon: GitPullRequest,
    dot: 'bg-dark-500',
    label: 'CLOSED',
    impact: 'REVIEWED',
    impactColor: 'text-dark-400',
  },
};

/* ------------------------------------------------------------------
   Aggregate stats computed from contributions array
------------------------------------------------------------------ */
const getStats = (contributions) => ({
  merged: contributions.filter(c => c.status === 'Merged').length,
  open: contributions.filter(c => c.status === 'Open').length,
  closed: contributions.filter(c => c.status === 'Closed').length,
  repos: [...new Set(contributions.map(c => c.repo))].length,
});

const OpenSource = () => {
  const stats = getStats(openSourceContributions);

  return (
    <section
      id="opensource"
      className="py-20 lg:py-32 bg-white dark:bg-dark-950 border-t border-dark-200/50 dark:border-dark-800/50 relative overflow-hidden"
      aria-label="Open Source Contributions"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <SectionHeader
          badge="OSS"
          title="Open Source"
          subtitle="Contributions to the global developer ecosystem"
          align="center"
        />

        {/* Quick stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-10 mb-12 pb-8 border-b border-dark-200 dark:border-dark-800"
        >
          {[
            { value: stats.merged, label: 'MERGED', color: 'text-green-600 dark:text-green-400' },
            { value: stats.open, label: 'OPEN', color: 'text-primary-600 dark:text-primary-400' },
            { value: stats.closed, label: 'CLOSED', color: 'text-dark-500 dark:text-dark-400' },
            { value: stats.repos, label: 'REPOS', color: 'text-accent-600 dark:text-accent-400' },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
              <div className="text-[9px] font-mono text-dark-400 dark:text-dark-500 tracking-widest uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* PR Diff Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {openSourceContributions.map((pr, i) => {
            const cfg = STATUS_CONFIG[pr.status] || STATUS_CONFIG.Closed;
            const StatusIcon = cfg.icon;

            return (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`
                  group relative rounded-xl overflow-hidden
                  bg-white dark:bg-[#111622] border border-dark-200 dark:border-slate-800
                  border-l-4 ${cfg.border}
                  hover:border-primary-500/40 dark:hover:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60
                  transition-all duration-300
                `}
              >
                {/* Card inner */}
                <div className="p-5">
                  {/* Top row: repo + status badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5 text-dark-400 dark:text-slate-400" />
                      <span className="text-xs font-mono font-semibold text-dark-700 dark:text-slate-300 group-hover:text-primary-500 dark:group-hover:text-white transition-colors">
                        {pr.repo}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-wider ${cfg.badgeBg} ${cfg.badgeText}`}>
                      <span className={`w-1 h-1 rounded-full ${cfg.dot} ${pr.status === 'Open' ? 'animate-pulse' : ''}`} />
                      <StatusIcon className="w-2.5 h-2.5" />
                      {cfg.label}
                    </div>
                  </div>

                  {/* PR title (used as bold heading) */}
                  <h3 className="text-sm font-bold text-dark-950 dark:text-slate-100 group-hover:text-primary-500 dark:group-hover:text-white transition-colors mb-2 leading-snug">
                    {pr.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-dark-500 dark:text-slate-400 leading-relaxed mb-4 font-sans">
                    {pr.description}
                  </p>

                  {/* Footer: tech chips + impact + link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-dark-100 dark:border-slate-800">
                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {pr.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-dark-50 dark:bg-slate-900 text-dark-500 dark:text-slate-400 border border-dark-200 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      {/* Impact label */}
                      <div className="flex items-center gap-1 text-[9px] font-mono">
                        <Flame className={`w-3 h-3 ${cfg.impactColor}`} />
                        <span className={cfg.impactColor}>{cfg.impact}</span>
                      </div>

                      {/* PR link */}
                      <a
                        href={pr.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[9px] font-mono text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                      >
                        VIEW PR
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            href="https://github.com/ayush23chaudhary"
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider border-dark-200 dark:border-dark-800 text-dark-600 dark:text-dark-300 hover:border-primary-500 hover:text-primary-400"
          >
            <Github className="w-4 h-4 mr-2" />
            EXPLORE GITHUB PROFILE
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
