import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ChevronRight, Folder, Cpu, Server, Database, Globe } from 'lucide-react';
import { SectionHeader, Card, Button, Badge } from '../ui';
import { projects } from '../../data';

/**
 * Visual Architecture Diagram Component for case studies
 */
const ArchitectureDiagram = ({ projectId }) => {
  const stepsMap = {
    "speakwise": [
      { name: "Audio Input", type: "input", icon: Cpu },
      { name: "Speech-to-Text API", type: "process", icon: Server },
      { name: "Gemini AI Evaluator", type: "process", icon: Server },
      { name: "Performance Metrics", type: "output", icon: Database }
    ],
    "transitops": [
      { name: "Dispatcher Dispatch", type: "input", icon: Cpu },
      { name: "Constraint Validator", type: "process", icon: Server },
      { name: "Resource State Controller", type: "process", icon: Server },
      { name: "PostgreSQL DB Persistence", type: "output", icon: Database }
    ],
    "diagramnote": [
      { name: "Markdown Input", type: "input", icon: Cpu },
      { name: "300ms Debounce Filter", type: "process", icon: Server },
      { name: "Mermaid v11 Renderer", type: "process", icon: Server },
      { name: "SVG Live Canvas", type: "output", icon: Database }
    ]
  };

  const steps = stepsMap[projectId];
  if (!steps) return null;

  return (
    <div className="mt-6 p-4 rounded-xl bg-dark-50 dark:bg-dark-950 border border-dark-200 dark:border-dark-800/80 font-mono">
      <div className="text-[9px] text-dark-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
        SYS.FLOW / ARCHITECTURE_DIAGRAM
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 w-full sm:w-auto justify-center">
                <Icon className="w-3.5 h-3.5 text-primary-500" />
                <span className="font-semibold text-dark-800 dark:text-dark-200">{step.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="text-dark-300 dark:text-dark-700 transform rotate-90 sm:rotate-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Categorize projects
  const categories = ['All', 'Full-Stack', 'AI/ML', 'Front-End'];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
          subtitle="A catalog of complete, running software systems built with intent"
          align="center"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wider transition-all duration-300
                ${activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-dark-900 text-dark-600 dark:text-dark-400 border border-dark-200 dark:border-dark-800 hover:border-primary-500/30'
                }
              `}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Flow Container */}
        <div className="space-y-16 lg:space-y-24">
          {filteredProjects.map((project, idx) => {
            const isFlagship = ['speakwise', 'transitops', 'diagramnote'].includes(project.slug);
            const isEven = idx % 2 === 0;

            if (isFlagship) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-12 gap-8 items-start`}
                >
                  {/* Copy Block */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    
                    {/* Index header */}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-primary-500 tracking-widest uppercase">
                      <span>PROJECT_0{idx + 1}</span>
                      <span>/</span>
                      <span>STATUS: {project.liveUrl ? 'LIVE' : 'COMPLETED'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-dark-900 dark:text-white">
                      {project.title}
                    </h3>

                    {/* Section 1: The Problem */}
                    <div>
                      <h4 className="text-[10px] font-mono text-dark-400 uppercase tracking-widest mb-1.5">
                        [01_THE_PROBLEM]
                      </h4>
                      <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed font-sans">
                        {project.problem}
                      </p>
                    </div>

                    {/* Section 2: The System */}
                    <div>
                      <h4 className="text-[10px] font-mono text-dark-400 uppercase tracking-widest mb-1.5">
                        [02_THE_SYSTEM]
                      </h4>
                      <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* Technical details flow */}
                    <ArchitectureDiagram projectId={project.slug} />

                    {/* Section 3: The Build */}
                    <div className="pt-2">
                      <h4 className="text-[10px] font-mono text-dark-400 uppercase tracking-widest mb-2.5">
                        [03_THE_BUILD]
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" size="xs" className="font-mono text-[9px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Result summary */}
                    {project.impact && (
                      <div className="p-3.5 rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-950/20 text-xs font-mono text-primary-600 dark:text-primary-400">
                        <span className="font-bold">SYSTEM_IMPACT:</span> {project.impact}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-4 pt-2">
                      {project.liveUrl && (
                        <Button 
                          href={project.liveUrl} 
                          variant="primary" 
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs tracking-wider"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          LIVE SYSTEM
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          href={project.githubUrl} 
                          variant="outline" 
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs tracking-wider"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          CODE_SOURCE
                        </Button>
                      )}
                    </div>

                  </div>

                  {/* Right side: visual container (mockup or schema) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} h-full flex flex-col justify-center`}>
                    <div className="relative rounded-2xl border border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900 overflow-hidden group">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-auto object-cover max-h-[300px] transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-grid-blueprint">
                          <Folder className="w-12 h-12 text-primary-500/50 mb-3" />
                          <span className="text-[10px] font-mono text-dark-400">SYSTEM_IMAGE_NOT_STAGED</span>
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            }

            // Normal standard compact project card
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto"
              >
                <Card className="p-6 border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 transition-all duration-300 hover:shadow-xl">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="text-[9px] font-mono text-dark-400 uppercase tracking-widest mb-1">
                        PROJECT_0{idx + 1} / {project.category.toUpperCase()}
                      </div>
                      <h4 className="text-lg font-bold text-dark-900 dark:text-white">
                        {project.title}
                      </h4>
                    </div>
                    {project.featured && (
                      <Badge variant="primary" size="sm" icon={Sparkles}>
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-dark-600 dark:text-dark-400 mb-6 font-sans">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" size="xs" className="font-mono text-[9px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 font-mono uppercase"
                      >
                        Live System
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-dark-500 hover:text-dark-600 dark:text-dark-400 dark:hover:text-dark-300 font-mono uppercase"
                      >
                        Code
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
