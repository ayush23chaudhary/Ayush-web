import { motion } from 'framer-motion';
import { GitPullRequest, GitMerge, ExternalLink, Github, Terminal } from 'lucide-react';
import { SectionHeader, Card, Badge, Button } from '../ui';
import { openSourceContributions } from '../../data';

const OpenSource = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Merged':
        return (
          <Badge variant="success" size="sm" icon={GitMerge}>
            Merged
          </Badge>
        );
      case 'Open':
        return (
          <Badge variant="primary" size="sm" icon={GitPullRequest}>
            Open
          </Badge>
        );
      case 'Closed':
        return (
          <Badge variant="default" size="sm" icon={GitPullRequest}>
            Closed
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            {status}
          </Badge>
        );
    }
  };

  return (
    <section 
      id="opensource" 
      className="py-20 lg:py-32 bg-white dark:bg-dark-950"
      aria-label="Open Source Contributions section"
    >
      <div className="section-container">
        <SectionHeader
          badge="Contributions"
          title="Open Source"
          subtitle="My contributions to global open-source ecosystems"
          align="center"
        />

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {openSourceContributions.map((contribution) => (
            <motion.div
              key={contribution.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card 
                variant="default"
                className="h-full flex flex-col p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 group border border-dark-200 dark:border-dark-800"
              >
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400 font-semibold text-sm">
                    <Github className="w-4 h-4 text-dark-900 dark:text-white" />
                    <span className="group-hover:text-primary-500 transition-colors">
                      {contribution.repo}
                    </span>
                  </div>
                  {getStatusBadge(contribution.status)}
                </div>

                {/* PR Title */}
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {contribution.title}
                </h3>

                {/* PR Description */}
                <p className="text-dark-500 dark:text-dark-400 text-sm mb-6 flex-grow">
                  {contribution.description}
                </p>

                {/* Footer elements */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dark-100 dark:border-dark-800">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {contribution.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" size="xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* PR Link */}
                  <a
                    href={contribution.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    View PR
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            href="https://github.com/ayush23chaudhary" 
            variant="outline" 
            size="lg"
            icon={Github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore My GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
