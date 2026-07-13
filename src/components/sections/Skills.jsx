import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layers, Cloud, Wrench, Lightbulb, Brain, ArrowRight, Link } from 'lucide-react';
import { SectionHeader } from '../ui';
import { skillCategories, projects } from '../../data';

/* ------------------------------------------------------------------
   SVG Radar chart — morphing polygon
------------------------------------------------------------------ */
const CHART_SIZE = 280;
const CX = CHART_SIZE / 2;
const CY = CHART_SIZE / 2;
const MAX_R = 100;
const LEVELS = [25, 50, 75, 100];

function polarToXY(angle, r) {
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

const RadarChart = ({ categories, activeIdx }) => {
  const n = categories.length;
  const angles = categories.map((_, i) => (i * (2 * Math.PI)) / n - Math.PI / 2);

  // For each category, average skill level → polygon vertex
  const fullPoints = categories.map((cat, i) => {
    const avg = cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length;
    const r = (avg / 100) * MAX_R;
    return polarToXY(angles[i], r);
  });

  // Highlighted shape: boosts the active category axis
  const highlightPoints = categories.map((cat, i) => {
    let avg = cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length;
    if (i === activeIdx) avg = Math.min(avg + 12, 100);
    const r = (avg / 100) * MAX_R;
    return polarToXY(angles[i], r);
  });

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  // Axis endpoints
  const axisEnds = angles.map(a => polarToXY(a, MAX_R));
  const axisLabels = categories.map((cat, i) => {
    const pt = polarToXY(angles[i], MAX_R + 20);
    return { ...pt, label: cat.name.split(' ')[0] };
  });

  return (
    <svg
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      className="w-full max-w-[280px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      {/* Grid rings */}
      {LEVELS.map((lvl) => {
        const ringPts = angles.map(a => polarToXY(a, (lvl / 100) * MAX_R));
        return (
          <path
            key={lvl}
            d={toPath(ringPts)}
            fill="none"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {axisEnds.map((end, i) => (
        <line
          key={i}
          x1={CX} y1={CY}
          x2={end.x} y2={end.y}
          stroke="rgba(148,163,184,0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Filled polygon — CSS transition on d for smooth morphing */}
      <path
        d={toPath(highlightPoints)}
        fill="rgba(59,130,246,0.12)"
        stroke="rgba(59,130,246,0.5)"
        strokeWidth="1.5"
        style={{ transition: 'all 0.4s ease' }}
      />

      {/* Vertex dots — CSS transition avoids Framer Motion SVG attr undefined issue */}
      {highlightPoints.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={i === activeIdx ? 4 : 2.5}
          fill={i === activeIdx ? '#3b82f6' : 'rgba(59,130,246,0.5)'}
          style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
        />
      ))}

      {/* Axis labels */}
      {axisLabels.map((pt, i) => (
        <text
          key={i}
          x={pt.x}
          y={pt.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-[8px] font-mono uppercase tracking-wide ${i === activeIdx ? 'fill-primary-400 font-bold' : 'fill-slate-500'}`}
          style={{ fontSize: '7px', fontFamily: 'JetBrains Mono, monospace', fontWeight: i === activeIdx ? 700 : 400 }}
          fill={i === activeIdx ? '#60a5fa' : '#64748b'}
        >
          {pt.label}
        </text>
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------------
   Category icon mapping
------------------------------------------------------------------ */
const ICON_MAP = { Code2, Layers, Cloud, Wrench, Lightbulb, Brain };

const Skills = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);

  const activeCategory = skillCategories[activeIdx];

  const getIconComponent = (name) => ICON_MAP[name] || Code2;

  // Find projects that use this skill
  const getLinkedProjects = (skillName) =>
    projects?.filter(p =>
      p.technologies?.some(t => t.toLowerCase() === skillName.toLowerCase())
    ) ?? [];

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-900 border-y border-dark-200/50 dark:border-dark-800/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Engineering"
          title="Knowledge Graph"
          subtitle="Interactive map of skills, tools, and connected systems"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-8 mt-12">

          {/* ── Category Selector (left) ── */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-4">
              SYS.INDEX / SELECT_CLUSTER
            </div>
            {skillCategories.map((cat, i) => {
              const Icon = getIconComponent(cat.icon);
              const isActive = activeIdx === i;
              const avg = Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length);

              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveIdx(i); setActiveSkill(null); }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-250 ${
                    isActive
                      ? 'bg-primary-500/8 border-primary-500/40 text-primary-500'
                      : 'bg-white dark:bg-dark-900 border-dark-200 dark:border-dark-800 hover:border-primary-500/25 text-dark-600 dark:text-dark-400'
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${isActive ? 'bg-primary-500 text-white' : 'bg-dark-100 dark:bg-dark-800 text-dark-500'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-bold truncate ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-dark-900 dark:text-white'}`}>
                      {cat.name}
                    </div>
                    <div className="text-[9px] font-mono text-dark-400 mt-0.5 uppercase tracking-wider">
                      {cat.skills.length} MODULES · AVG {avg}%
                    </div>
                  </div>
                  {isActive && <ArrowRight className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">

            {/* Radar chart + cluster heading */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-800 p-5 flex flex-col items-center">
              <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-3 self-start flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                SYS.RADAR / SKILL_MAP
              </div>

              <RadarChart categories={skillCategories} activeIdx={activeIdx} />

              {/* Active category stat */}
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-primary-500 font-mono uppercase tracking-wider">
                  {activeCategory.name}
                </span>
                <div className="text-[9px] font-mono text-dark-400 mt-0.5">
                  {activeCategory.skills.length} skills · avg{' '}
                  {Math.round(activeCategory.skills.reduce((s, sk) => s + sk.level, 0) / activeCategory.skills.length)}%
                </div>
              </div>
            </div>

            {/* Skill list + detail pane */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-800 p-5 flex flex-col">
              <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-4 border-b border-dark-100 dark:border-dark-800 pb-2">
                {activeCategory.name} / MODULE_LIST
              </div>

              <div className="space-y-2 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-2"
                  >
                    {activeCategory.skills.map((skill) => {
                      const isActive = activeSkill?.name === skill.name;
                      const linked = getLinkedProjects(skill.name);

                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkill(isActive ? null : skill)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-950/20 border-primary-300 dark:border-primary-700'
                              : 'bg-dark-50/60 dark:bg-dark-900/40 border-dark-200 dark:border-dark-800/50 hover:border-dark-300 dark:hover:border-dark-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-dark-900 dark:text-white">{skill.name}</span>
                            <span className="text-[9px] font-mono text-primary-500 font-bold">{skill.level}%</span>
                          </div>
                          {/* Level bar */}
                          <div className="h-1 rounded-full bg-dark-200 dark:bg-dark-700 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                            />
                          </div>
                          {linked.length > 0 && (
                            <div className="flex items-center gap-1 mt-1.5 text-[8px] font-mono text-dark-400">
                              <Link className="w-2.5 h-2.5" />
                              <span>IN {linked.length} SYSTEM{linked.length > 1 ? 'S' : ''}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Selected skill detail */}
              <AnimatePresence>
                {activeSkill && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-dark-100 dark:border-dark-800 mt-3 pt-3 overflow-hidden"
                  >
                    <div className="text-[9px] font-mono text-dark-400 uppercase tracking-widest mb-2">USED IN:</div>
                    {getLinkedProjects(activeSkill.name).length > 0 ? (
                      getLinkedProjects(activeSkill.name).map(p => (
                        <div key={p.id} className="flex items-center justify-between text-[10px] font-mono py-1">
                          <span className="text-dark-700 dark:text-dark-300 font-semibold">{p.title.split(' – ')[0]}</span>
                          <span className="text-primary-500 uppercase text-[8px]">{p.category}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[9px] font-mono text-dark-400">No direct system link</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
