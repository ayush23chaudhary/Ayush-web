import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Terminal, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../ui';
import { workExperience, education, certifications, hackathons } from '../../data';

/* ------------------------------------------------------------------
   Build a unified, date-sorted timeline from work + education
------------------------------------------------------------------ */
const buildTimeline = () => {
  const work = workExperience.map(e => ({ ...e, _type: 'work' }));
  const edu = education.map(e => ({ ...e, _type: 'education', period: e.duration || e.period }));
  return [...work, ...edu].sort((a, b) => {
    const yearA = parseInt((a.period || '').split(/[–\-]/).pop()?.trim()) || 0;
    const yearB = parseInt((b.period || '').split(/[–\-]/).pop()?.trim()) || 0;
    return yearB - yearA;
  });
};

/* ------------------------------------------------------------------
   Animated timeline node dot
------------------------------------------------------------------ */
const NodeDot = ({ color }) => (
  <div className={`relative flex-shrink-0 w-4 h-4 rounded-full border-2 ${color} bg-white dark:bg-dark-950 z-10`}>
    <span className={`absolute inset-0.5 rounded-full ${color.replace('border-', 'bg-').split(' ')[0]} opacity-60`} />
  </div>
);

/* ------------------------------------------------------------------
   Main Experience section
------------------------------------------------------------------ */
const Experience = () => {
  const timeline = buildTimeline();

  return (
    <section
      id="experience"
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-900 border-b border-dark-200/50 dark:border-dark-800/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Journey"
          title="Engineering Timeline"
          subtitle="A sequence of roles, education, and milestones — in order of impact"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-12 mt-12">

          {/* ── Left: Unified timeline ── */}
          <div className="lg:col-span-8">
            <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              SYS.TIMELINE / CAREER_LOG
            </div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-dark-200 dark:bg-dark-800" />

              <div className="space-y-8">
                {timeline.map((item, idx) => {
                  const isWork = item._type === 'work';
                  const accentColor = isWork ? 'border-primary-500' : 'border-purple-500';
                  const labelColor = isWork ? 'text-primary-500' : 'text-purple-500';
                  const trackLabel = isWork ? 'WORK' : 'EDUCATION';

                  return (
                    <motion.div
                      key={`${item._type}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: idx * 0.07 }}
                      className="flex gap-5"
                    >
                      {/* Timeline node */}
                      <div className="flex flex-col items-center mt-1">
                        <NodeDot color={accentColor} />
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 group">
                        {/* Type badge + date */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border ${labelColor} ${isWork ? 'bg-primary-50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-800/40' : 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40'}`}>
                            {trackLabel}
                          </span>
                          <div className="flex items-center gap-1 text-[9px] font-mono text-dark-400">
                            <Calendar className="w-3 h-3" />
                            <span>{item.period}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-dark-900 dark:text-white mb-0.5">
                          {isWork ? item.title : item.degree}
                        </h4>

                        {/* Company/institution */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-semibold ${labelColor}`}>
                            {isWork ? item.company : item.institution}
                          </span>
                          {(item.location) && (
                            <>
                              <span className="text-dark-300 dark:text-dark-700">·</span>
                              <span className="flex items-center gap-0.5 text-[9px] font-mono text-dark-400">
                                <MapPin className="w-2.5 h-2.5" />
                                {item.location}
                              </span>
                            </>
                          )}
                          {item.grade && (
                            <>
                              <span className="text-dark-300 dark:text-dark-700">·</span>
                              <span className="text-[9px] font-mono font-bold text-amber-500">{item.grade}</span>
                            </>
                          )}
                        </div>

                        {/* Achievements */}
                        {item.achievements && (
                          <ul className="space-y-1.5">
                            {item.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-dark-500 dark:text-dark-400">
                                <ChevronRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${labelColor} opacity-60`} />
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tech chips */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dark-100 dark:border-dark-800">
                            {item.technologies.map(t => (
                              <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-400">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Certifications + Hackathons ── */}
          <div className="lg:col-span-4 space-y-10">

            {/* Certifications */}
            <div>
              <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-green-500" />
                BENCHMARKS / CERTIFICATIONS
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 hover:border-green-400/40 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/50 flex-shrink-0">
                      <Award className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-dark-900 dark:text-white leading-tight">{cert.name}</h5>
                      <p className="text-[9px] font-mono text-dark-400 mt-0.5 uppercase tracking-wider">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hackathons */}
            <div>
              <div className="text-[9px] font-mono text-dark-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                HACKATHONS
              </div>
              <div className="space-y-3">
                {hackathons.map((hack) => (
                  <motion.div
                    key={hack.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 hover:border-amber-400/40 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/50 flex-shrink-0">
                      <Terminal className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-dark-900 dark:text-white leading-tight">{hack.name}</h5>
                      <p className="text-[9px] font-mono text-amber-500 mt-0.5 uppercase tracking-wider font-bold">
                        {hack.position}
                      </p>
                      <p className="text-[9px] font-mono text-dark-400 mt-0.5">{hack.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
