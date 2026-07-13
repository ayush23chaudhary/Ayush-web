import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Cloud, Star, MapPin, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../ui';
import { personalInfo } from '../../data';

/* ------------------------------------------------------------------
   Animated counter: counts up on viewport enter
------------------------------------------------------------------ */
const useCounter = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = Math.ceil(duration / 16);
    const inc = target / steps;
    let curr = 0;
    const timer = setInterval(() => {
      curr += inc;
      if (curr >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(curr));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
};

const StatCard = ({ icon: Icon, value, suffix = '', label, color }) => {
  const numericValue = parseInt(value.toString().replace(/\D/g, '')) || 0;
  const { count, ref } = useCounter(numericValue);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative p-5 rounded-2xl border bg-white dark:bg-dark-900 overflow-hidden group cursor-default ${color.border}`}
    >
      {/* Subtle corner glow */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity ${color.glow}`} />
      
      <div className={`inline-flex p-2.5 rounded-xl mb-3 ${color.iconBg}`}>
        <Icon className={`w-5 h-5 ${color.icon}`} />
      </div>
      
      <div className="flex items-baseline gap-0.5">
        <span className={`text-3xl font-bold font-mono ${color.value}`}>
          {count.toLocaleString()}
        </span>
        {suffix && <span className={`text-lg font-bold font-mono ${color.value}`}>{suffix}</span>}
      </div>
      <p className="text-xs text-dark-500 dark:text-dark-400 font-mono uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
};

const STATS = [
  {
    icon: Trophy,
    value: 929,
    suffix: '/10',
    label: 'CGPA · TOP 1%',
    color: {
      border: 'border-amber-200 dark:border-amber-800/40',
      glow: 'bg-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/30',
      icon: 'text-amber-500',
      value: 'text-amber-600 dark:text-amber-400',
    },
    displayValue: '9.29',
  },
  {
    icon: Code2,
    value: 500,
    suffix: '+',
    label: 'DSA PROBLEMS',
    color: {
      border: 'border-primary-200 dark:border-primary-800/40',
      glow: 'bg-primary-400',
      iconBg: 'bg-primary-50 dark:bg-primary-950/30',
      icon: 'text-primary-500',
      value: 'text-primary-600 dark:text-primary-400',
    },
  },
  {
    icon: Cloud,
    value: 3,
    suffix: '',
    label: 'CERTIFICATIONS',
    color: {
      border: 'border-sky-200 dark:border-sky-800/40',
      glow: 'bg-sky-400',
      iconBg: 'bg-sky-50 dark:bg-sky-950/30',
      icon: 'text-sky-500',
      value: 'text-sky-600 dark:text-sky-400',
    },
  },
  {
    icon: Star,
    value: 4,
    suffix: '',
    label: 'OPEN SOURCE PRs',
    color: {
      border: 'border-green-200 dark:border-green-800/40',
      glow: 'bg-green-400',
      iconBg: 'bg-green-50 dark:bg-green-950/30',
      icon: 'text-green-500',
      value: 'text-green-600 dark:text-green-400',
    },
  },
];

/* ------------------------------------------------------------------
   Engineering spec rows: key=value monospace table
------------------------------------------------------------------ */
const SPECS = [
  { key: 'INSTITUTION', value: 'GLA University, Mathura' },
  { key: 'DEGREE', value: 'B.Tech CSE · 2023–2027' },
  { key: 'COMPETITIVE', value: 'Codeforces Specialist · 1452 Rating' },
  { key: 'CERTIFICATIONS', value: 'Azure AI-102 · OCI Foundations · NPTEL (2x Topper)' },
  { key: 'AVAILABLE', value: 'Open to Internship Opportunities · 2025' },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-950 relative overflow-hidden"
      aria-label="About section"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Profile"
          title="Engineering Specs"
          subtitle="The person behind the commits — quantified"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-10 mt-12 items-start">

          {/* ── Left column: Photo + spec table ── */}
          <div className="lg:col-span-4 flex flex-col items-center gap-6">

            {/* Hex profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Outer hex border ring */}
              <div
                className="w-52 h-52 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(168,85,247,0.3))',
                }}
              >
                {/* Inner hex photo */}
                <div
                  className="w-48 h-48 overflow-hidden"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                  }}
                >
                  <img
                    src={personalInfo.avatar || '/profile.jpg'}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center scale-110"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {/* Fallback initials */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center absolute inset-0">
                    <span className="text-4xl font-bold text-white font-mono">AC</span>
                  </div>
                </div>
              </div>

              {/* Online/availability badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">
                  Open to Work
                </span>
              </div>
            </motion.div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-dark-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personalInfo.location}</span>
            </div>

            {/* Engineering spec table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full rounded-xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-950">
                <span className="text-[9px] font-mono text-dark-400 tracking-widest uppercase">SYS.PROFILE / SPEC_SHEET</span>
              </div>
              <div className="divide-y divide-dark-100 dark:divide-dark-800/60">
                {SPECS.map(({ key, value }) => (
                  <div key={key} className="px-4 py-2.5 grid grid-cols-5 gap-2">
                    <span className="col-span-2 text-[9px] font-mono text-dark-400 uppercase tracking-wider leading-relaxed">{key}</span>
                    <span className="col-span-3 text-[10px] font-mono text-dark-700 dark:text-dark-300 leading-relaxed">{value}</span>
                  </div>
                ))}
                <div className="px-4 py-2.5 flex items-center gap-2">
                  <span className="text-[9px] font-mono text-dark-400 uppercase tracking-wider">RATING</span>
                  <a
                    href="https://codeforces.com/profile/ayush23chaudhary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-[9px] font-mono text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Codeforces <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Right column: Stats grid + bio ── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Animated stat cards */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </motion.div>

            {/* Bio paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 p-6"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dark-100 dark:border-dark-800">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                <span className="text-[10px] font-mono text-primary-500 uppercase tracking-widest font-bold">IDENTITY.LOG</span>
              </div>
              <div className="space-y-3">
                {personalInfo.about.description.map((paragraph, i) => (
                  <p key={i} className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed font-sans">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {personalInfo.about.highlights?.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/40"
                >
                  {h}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
