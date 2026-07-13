import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Terminal } from 'lucide-react';
import { SectionHeader, Card, Badge } from '../ui';
import { workExperience, education, certifications, hackathons } from '../../data';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

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
          subtitle="A precise sequence of roles, educational milestones, and system benchmarks"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-12 mt-12">
          
          {/* Left Column: Timeline Tracks (Work + Education) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Work Track */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-500">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-mono tracking-widest text-dark-900 dark:text-white uppercase">
                  [TRACK_01_WORK]
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-6 border-l border-dark-200 dark:border-dark-800 space-y-8"
              >
                {workExperience.map((exp, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="relative">
                    {/* Timeline Node dot */}
                    <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-dark-900 border-2 border-primary-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    </div>

                    <Card className="p-5 border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-dark-900 dark:text-white text-base">{exp.title}</h4>
                        <Badge variant="primary" size="sm" className="font-mono text-[9px]">
                          {exp.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-3">{exp.company}</p>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-dark-400 font-mono mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.achievements?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-400">
                            <span className="text-primary-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Education Track */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-mono tracking-widest text-dark-900 dark:text-white uppercase">
                  [TRACK_02_EDUCATION]
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-6 border-l border-dark-200 dark:border-dark-800 space-y-8"
              >
                {education.map((edu, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="relative">
                    {/* Timeline Node dot */}
                    <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-dark-900 border-2 border-purple-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>

                    <Card className="p-5 border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900">
                      <h4 className="font-bold text-dark-900 dark:text-white text-base mb-1">{edu.degree}</h4>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-3">{edu.institution}</p>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-dark-400 font-mono mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold">
                          {edu.grade}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {edu.achievements?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-400">
                            <span className="text-purple-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

          {/* Right Column: System Benchmarks (Certifications + Hackathons) */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Certifications Block */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-mono tracking-widest text-dark-900 dark:text-white uppercase">
                  [BENCHMARKS]
                </h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <Card key={cert.id} className="p-4 border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 flex items-start gap-3.5 transition-all hover:border-green-500/40">
                    <div className="p-2 rounded bg-green-50 dark:bg-green-950/20 text-green-500 mt-0.5 border border-green-200/50 dark:border-green-800/50">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-dark-900 dark:text-white leading-tight">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] text-dark-500 dark:text-dark-400 mt-1 font-mono uppercase">
                        {cert.issuer} / {cert.date}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hackathons Block */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-mono tracking-widest text-dark-900 dark:text-white uppercase">
                  [HACKATHONS]
                </h3>
              </div>

              <div className="space-y-4">
                {hackathons.map((hack) => (
                  <Card key={hack.id} className="p-4 border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 flex items-start gap-3.5 transition-all hover:border-amber-500/40">
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-500 mt-0.5 border border-amber-200/50 dark:border-amber-800/50">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-dark-900 dark:text-white leading-tight">
                        {hack.name}
                      </h4>
                      <p className="text-[10px] text-dark-500 dark:text-dark-400 mt-1 font-mono uppercase">
                        {hack.position} / {hack.date}
                      </p>
                    </div>
                  </Card>
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
