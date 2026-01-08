import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { SectionHeader } from '../ui';
import { workExperience, education, certifications } from '../../data';

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
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-900"
      aria-label="Experience section"
    >
      <div className="section-container">
        <SectionHeader
          badge="Experience"
          title="My Journey"
          subtitle="Professional experience, education, and certifications"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-white">Work Experience</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-5 relative"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-dark-900 dark:text-white">{exp.title}</h4>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{exp.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-dark-500 dark:text-dark-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements?.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-400">
                        <span className="text-primary-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                  <GraduationCap className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Education</h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="card p-5"
                  >
                    <h4 className="font-bold text-dark-900 dark:text-white mb-1">{edu.degree}</h4>
                    <p className="text-accent-600 dark:text-accent-400 font-medium mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-dark-500 dark:text-dark-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.duration}
                      </span>
                      {edu.grade && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white">Certifications</h3>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="card p-4 flex items-center gap-4"
                    >
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-dark-900 dark:text-white">{cert.name}</h4>
                        <p className="text-sm text-dark-500 dark:text-dark-400">{cert.issuer}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
