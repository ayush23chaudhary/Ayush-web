import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, Card, Badge } from '../ui';
import { skillCategories, projects } from '../../data';
import { Terminal, Code2, Network, Cpu, Database, Link, ArrowRight } from 'lucide-react';

const Skills = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);

  const activeCategory = skillCategories[selectedCategoryIdx];

  // Map skill icons to Lucide icons
  const iconMap = {
    Code2: Code2,
    Layers: Cpu,
    Cloud: Database,
    Wrench: Terminal,
    Lightbulb: Network,
    Terminal: Terminal,
    Database: Database,
  };

  const CategoryIcon = iconMap[activeCategory.icon] || Code2;

  // Find all projects that use a particular skill
  const getProjectsUsingSkill = (skillName) => {
    return projects.filter(project => 
      project.technologies.some(tech => tech.toLowerCase() === skillName.toLowerCase())
    );
  };

  const activeCategoryProjects = projects.filter(project =>
    project.technologies.some(tech => 
      activeCategory.skills.some(skill => skill.name.toLowerCase() === tech.toLowerCase())
    )
  );

  return (
    <section 
      id="skills" 
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-900 border-y border-dark-200/50 dark:border-dark-800/50 relative overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid-blueprint" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Engineering"
          title="Knowledge Graph"
          subtitle="System relationships between languages, tools, and platforms"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* Left Panel: Category Selector Nodes */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[10px] font-mono text-dark-400 tracking-widest uppercase mb-4">
              SYS.GRAPH / INDEX_SELECTION
            </div>
            {skillCategories.map((category, idx) => {
              const isSelected = selectedCategoryIdx === idx;
              const Icon = iconMap[category.icon] || Code2;
              
              return (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategoryIdx(idx);
                    setActiveSkill(null);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    isSelected 
                      ? 'bg-primary-500/10 text-primary-500 border-primary-500/30' 
                      : 'bg-white dark:bg-dark-900 text-dark-700 dark:text-dark-300 border-dark-200 dark:border-dark-800 hover:border-primary-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-primary-500 text-white' : 'bg-dark-100 dark:bg-dark-800 text-dark-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-dark-900 dark:text-white'}`}>
                        {category.name}
                      </h4>
                      <p className="text-[10px] text-dark-400 dark:text-dark-500 font-mono tracking-wider mt-0.5 uppercase">
                        {category.skills.length} MODULES
                      </p>
                    </div>
                  </div>
                  {isSelected && <ArrowRight className="w-4 h-4 text-primary-500" />}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Interconnected Relationship Canvas */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6 h-full">
            
            {/* Cluster Skills List */}
            <Card className="p-6 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-dark-100 dark:border-dark-800 pb-3">
                <CategoryIcon className="w-4 h-4 text-primary-500" />
                <span className="text-[11px] font-mono text-primary-500 uppercase tracking-widest font-bold">
                  {activeCategory.name} / CLUSTER
                </span>
              </div>

              <div className="space-y-4 flex-grow">
                {activeCategory.skills.map((skill) => {
                  const isActive = activeSkill?.name === skill.name;
                  const projectsUsing = getProjectsUsingSkill(skill.name);
                  
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setActiveSkill(skill)}
                      onClick={() => setActiveSkill(skill)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-500/5 border-primary-500/40' 
                          : 'bg-dark-50/50 dark:bg-dark-900/50 border-dark-200 dark:border-dark-800/50 hover:border-dark-300 dark:hover:border-dark-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-dark-900 dark:text-white">
                          {skill.name}
                        </span>
                        <Badge variant="primary" size="sm" className="font-mono text-[9px]">
                          {skill.level}%
                        </Badge>
                      </div>

                      {/* Dependency links marker */}
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-dark-400">
                        <Link className="w-3 h-3" />
                        <span>CONNECTED TO {projectsUsing.length} SYSTEMS</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Selected Skill / Dependencies Connection Panel */}
            <Card className="p-6 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-dark-400 tracking-widest uppercase mb-4 border-b border-dark-100 dark:border-dark-800 pb-2">
                  SYS.ROUTING / SYSTEM_LINKS
                </div>

                <AnimatePresence mode="wait">
                  {activeSkill ? (
                    <motion.div
                      key={activeSkill.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-base font-bold text-dark-900 dark:text-white">
                          {activeSkill.name}
                        </h4>
                        <p className="text-xs text-dark-500 dark:text-dark-400 font-mono mt-1 uppercase">
                          MODULE PROFICIENCY: {activeSkill.level}%
                        </p>
                      </div>

                      {/* Associated Projects Section */}
                      <div>
                        <div className="text-[9px] font-mono text-dark-400 tracking-wider uppercase mb-3">
                          INTEGRATED IN SYSTEMS:
                        </div>
                        {getProjectsUsingSkill(activeSkill.name).length > 0 ? (
                          <div className="space-y-2">
                            {getProjectsUsingSkill(activeSkill.name).map((project) => (
                              <div
                                key={project.id}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-dark-50 dark:bg-dark-950 border border-dark-200 dark:border-dark-800/80"
                              >
                                <span className="text-xs font-semibold text-dark-800 dark:text-dark-200">
                                  {project.title.split(' – ')[0]}
                                </span>
                                <span className="text-[8px] font-mono text-primary-500 uppercase">
                                  {project.category}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg border border-dashed border-dark-200 dark:border-dark-800 text-[10px] font-mono text-dark-400 text-center">
                            NO ACTIVE SYSTEMS ATTACHED
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-12 text-center text-dark-400 font-mono text-xs leading-relaxed">
                      HOVER OR CLICK ON A TECHNOLOGY CLUSTER ON THE LEFT LIST TO INSPECT GRAPH CONNECTIONS & SYS_REFS.
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status footer inside card */}
              <div className="border-t border-dark-100 dark:border-dark-800 pt-3 mt-6 flex justify-between items-center text-[8px] font-mono text-dark-400">
                <span>GRAPH REF: [K_FLOW]</span>
                <span>STATUS: STABLE</span>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
