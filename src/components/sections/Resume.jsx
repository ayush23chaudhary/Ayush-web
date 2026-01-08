import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle } from 'lucide-react';
import { SectionHeader, Button, Card } from '../ui';
import { personalInfo } from '../../data';

/**
 * Resume Section Component
 * Prominent resume download with summary
 */
const Resume = () => {
  const strengths = [
    "Full-Stack Web Development (React, Node.js, Flask)",
    "Machine Learning & NLP Implementation",
    "Azure AI & Oracle Cloud Certified",
    "500+ DSA Problems Solved (Codeforces Specialist)",
    "Problem-Solving & Technical Communication",
    "Cross-Team Collaboration & Adaptability"
  ];

  return (
    <section 
      id="resume" 
      className="py-20 lg:py-32 bg-dark-50/50 dark:bg-dark-900/50"
      aria-label="Resume section"
    >
      <div className="section-container">
        <SectionHeader
          subtitle="My resume"
          title="Download My Resume"
          align="center"
        />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glass" className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Icon and Summary */}
              <div className="text-center md:text-left">
                <motion.div
                  className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 mb-6"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(14, 165, 233, 0.2)",
                      "0 0 40px rgba(217, 70, 239, 0.2)",
                      "0 0 20px rgba(14, 165, 233, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FileText className="w-16 h-16 text-primary-500" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  Professional Resume
                </h3>
                
                <p className="text-dark-600 dark:text-dark-400 mb-6 leading-relaxed">
                  {personalInfo.resumeSummary}
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    href={personalInfo.resumePath}
                    variant="primary"
                    size="lg"
                    icon={Download}
                    iconPosition="right"
                    download
                    className="w-full md:w-auto"
                  >
                    Download Resume
                  </Button>
                </motion.div>
              </div>

              {/* Right - Core Strengths */}
              <div>
                <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                  Core Strengths
                </h4>
                
                <div className="space-y-3">
                  {strengths.map((strength, index) => (
                    <motion.div
                      key={strength}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-dark-700 dark:text-dark-300 font-medium">
                        {strength}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
