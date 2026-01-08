import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button, Badge } from './';

/**
 * Project Card Component
 * Displays individual project information with links and tech stack
 */
const ProjectCard = ({ 
  project, 
  index,
  onImageClick,
  className = '' 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-800 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {project.images && project.images.length > 1 && (
            <button
              onClick={() => onImageClick?.(project)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
              aria-label={`View ${project.images.length} images`}
            >
              <Eye size={16} />
              <span className="ml-1 text-sm">{project.images.length}</span>
            </button>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-500 hover:text-primary-500 transition-colors"
                aria-label="View source code"
              >
                <Github size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-500 hover:text-primary-500 transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-dark-600 dark:text-dark-400 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
              Key Features:
            </h4>
            <ul className="text-sm text-dark-600 dark:text-dark-400 space-y-1">
              {project.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <ExternalLink size={16} className="mr-2" />
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Github size={16} className="mr-2" />
              Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
