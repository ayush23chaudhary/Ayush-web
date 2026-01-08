import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SectionHeader } from '../ui';
import { skillCategories } from '../../data';

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Professional color schemes for each category
  const categoryStyles = {
    "Programming Languages": {
      accent: "from-blue-500 to-blue-600",
      accentSolid: "bg-blue-500",
      bg: "bg-blue-50/50 dark:bg-blue-950/20",
      border: "border-blue-200/50 dark:border-blue-800/30",
      text: "text-blue-700 dark:text-blue-300",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    "Web Technologies": {
      accent: "from-purple-500 to-purple-600",
      accentSolid: "bg-purple-500",
      bg: "bg-purple-50/50 dark:bg-purple-950/20",
      border: "border-purple-200/50 dark:border-purple-800/30",
      text: "text-purple-700 dark:text-purple-300",
      iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    },
    "Databases & Cloud": {
      accent: "from-green-500 to-green-600",
      accentSolid: "bg-green-500",
      bg: "bg-green-50/50 dark:bg-green-950/20",
      border: "border-green-200/50 dark:border-green-800/30",
      text: "text-green-700 dark:text-green-300",
      iconBg: "bg-green-500/10 dark:bg-green-500/20",
    },
    "DevOps & Tools": {
      accent: "from-orange-500 to-orange-600",
      accentSolid: "bg-orange-500",
      bg: "bg-orange-50/50 dark:bg-orange-950/20",
      border: "border-orange-200/50 dark:border-orange-800/30",
      text: "text-orange-700 dark:text-orange-300",
      iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    },
    "CS Fundamentals": {
      accent: "from-indigo-500 to-indigo-600",
      accentSolid: "bg-indigo-500",
      bg: "bg-indigo-50/50 dark:bg-indigo-950/20",
      border: "border-indigo-200/50 dark:border-indigo-800/30",
      text: "text-indigo-700 dark:text-indigo-300",
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    },
    "Machine Learning": {
      accent: "from-rose-500 to-rose-600",
      accentSolid: "bg-rose-500",
      bg: "bg-rose-50/50 dark:bg-rose-950/20",
      border: "border-rose-200/50 dark:border-rose-800/30",
      text: "text-rose-700 dark:text-rose-300",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    }
  };

  const getStyles = (categoryName) => {
    return categoryStyles[categoryName] || {
      accent: "from-gray-500 to-gray-600",
      accentSolid: "bg-gray-500",
      bg: "bg-gray-50/50 dark:bg-gray-950/20",
      border: "border-gray-200/50 dark:border-gray-800/30",
      text: "text-gray-700 dark:text-gray-300",
      iconBg: "bg-gray-500/10 dark:bg-gray-500/20",
    };
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 60) return "Intermediate";
    return "Familiar";
  };

  return (
    <section 
      id="skills" 
      className="py-20 lg:py-32 bg-white dark:bg-dark-950"
      aria-label="Skills section"
    >
      <div className="section-container">
        <SectionHeader
          subtitle="Skills"
          title="Tech Stack"
          description="Technologies and tools I use to bring ideas to life"
        />

        {/* Category Tiles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, categoryIndex) => {
            const styles = getStyles(category.name);
            const isHovered = hoveredCategory === categoryIndex;
            
            return (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative"
              >
                {/* Main Category Tile */}
                <motion.div
                  className={`
                    relative p-6 rounded-xl border ${styles.border} ${styles.bg}
                    backdrop-blur-sm cursor-pointer
                    transition-all duration-300
                    hover:shadow-xl
                    min-h-[120px]
                  `}
                  animate={{
                    y: isHovered ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2.5 rounded-lg ${styles.iconBg}`}>
                      <div className="w-5 h-5 bg-current opacity-80" style={{ 
                        WebkitMaskImage: 'linear-gradient(135deg, transparent 30%, black 100%)',
                        maskImage: 'linear-gradient(135deg, transparent 30%, black 100%)'
                      }} />
                    </div>
                    <h3 className={`text-lg font-bold ${styles.text}`}>
                      {category.name}
                    </h3>
                  </div>

                  {/* Skill Count */}
                  <p className="text-sm text-dark-600 dark:text-dark-400 ml-12">
                    {category.skills.length} technologies
                  </p>

                  {/* Hover Indicator */}
                  <motion.div
                    className={`absolute bottom-4 right-4 ${styles.text}`}
                    animate={{
                      x: isHovered ? 4 : 0,
                      opacity: isHovered ? 1 : 0.4
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>

                  {/* Accent Border on Hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl border-2 border-transparent`}
                    animate={{
                      borderColor: isHovered ? 'currentColor' : 'transparent',
                    }}
                    style={{ color: styles.text.replace('text-', 'rgb(var(--') }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Expanded Skills Panel - Opens Downward */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 z-20 mt-2 overflow-hidden"
                    >
                      <div className={`
                        p-5 rounded-xl border ${styles.border}
                        bg-white dark:bg-dark-900
                        shadow-2xl
                        max-h-[400px] overflow-y-auto
                      `}>
                        <div className="space-y-3">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                              className="space-y-2"
                            >
                              {/* Skill Name and Percentage */}
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-dark-800 dark:text-dark-200">
                                  {skill.name}
                                </span>
                                <span className={`text-xs font-bold ${styles.text}`}>
                                  {skill.level}%
                                </span>
                              </div>

                              {/* Horizontal Progress Bar */}
                              <div className="h-2 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${styles.accent} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.8, delay: skillIndex * 0.05 + 0.2, ease: "easeOut" }}
                                />
                              </div>

                              {/* Proficiency Label */}
                              <div className="text-xs text-dark-500 dark:text-dark-400">
                                {getProficiencyLabel(skill.level)}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
