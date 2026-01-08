import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ChevronRight, Folder, Image } from 'lucide-react';
import { SectionHeader, Card, Button, Badge, ImageCarousel } from '../ui';
import { projects, getCategories } from '../../data';

/**
 * Auto-cycling Image Component for Project Cards
 */
const AutoCyclingImage = ({ images, title, className, isCardHovered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1 || !isCardHovered) {
      setCurrentIndex(0); // Reset to first image when not hovered
      return;
    }

    // Add a small delay before starting to cycle
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2500); // Change image every 2.5 seconds on hover (slower pace)

      return () => clearInterval(interval);
    }, 500); // Wait 500ms before starting the cycle

    return () => clearTimeout(startDelay);
  }, [images, isCardHovered]);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Folder className="w-16 h-16 text-primary-500/50" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </AnimatePresence>
      
      {/* Image indicators */}
      {images.length > 1 && isCardHovered && (
        <motion.div 
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Enhanced Project Card with Hover Effects
 */
const EnhancedProjectCard = ({ project, onImageGallery }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card 
        variant="default" 
        className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/20"
      >
        {/* Project Image with Auto-Cycling */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
          <AutoCyclingImage 
            images={project.images || [project.image]}
            title={project.title}
            className="w-full h-full"
            isCardHovered={isHovered}
          />
          
          {/* Featured badge */}
          {project.featured && (
            <motion.div 
              className="absolute top-4 right-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge variant="primary" size="sm" icon={Sparkles}>
                Featured
              </Badge>
            </motion.div>
          )}
          
          {/* Category badge */}
          <motion.div 
            className="absolute bottom-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge variant="default" size="sm">
              {project.category}
            </Badge>
          </motion.div>

          {/* Images gallery button */}
          {project.images && project.images.length > 1 && (
            <motion.button
              className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onImageGallery(project);
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.4 }}
            >
              <Image className="w-3.5 h-3.5" />
              {project.images.length}
            </motion.button>
          )}
          
          {/* Overlay with action buttons */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent flex items-end justify-center pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="View live demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="View source code"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content with expansion effect */}
        <motion.div 
          className="flex-1 p-6 flex flex-col"
          animate={{
            paddingBottom: isHovered ? "2rem" : "1.5rem"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="text-xl font-semibold text-dark-900 dark:text-white mb-2 transition-colors"
            animate={{
              color: isHovered ? "rgb(59 130 246)" : undefined
            }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-dark-500 dark:text-dark-400 text-sm mb-4"
            animate={{
              height: isHovered ? "auto" : "2.5rem"
            }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: isHovered ? "none" : 2,
              WebkitBoxOrient: "vertical"
            }}
          >
            {isHovered ? project.description : project.problem}
          </motion.p>

          {/* Expanded content on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-xs text-dark-600 dark:text-dark-400 space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <span className="text-primary-500 mt-0.5">•</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {project.impact && (
                  <motion.div 
                    className="mb-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-primary-600 dark:text-primary-400 text-xs font-medium flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      {project.impact}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technologies */}
          {project.technologies && (
            <motion.div 
              className="mt-auto pt-4"
              animate={{
                marginTop: isHovered ? "1rem" : "auto"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-wrap gap-1.5"
                animate={{
                  gap: isHovered ? "0.5rem" : "0.375rem"
                }}
              >
                {project.technologies.slice(0, isHovered ? project.technologies.length : 4).map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.05 * index, type: "spring", stiffness: 200 }}
                  >
                    <Badge 
                      variant="secondary" 
                      size="xs"
                      className={`transition-all ${isHovered ? 'hover:scale-110' : ''}`}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
                {!isHovered && project.technologies.length > 4 && (
                  <Badge variant="secondary" size="xs" className="opacity-60">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <AnimatePresence>
            {isHovered && (project.liveUrl || project.githubUrl) && (
              <motion.div 
                className="flex gap-3 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {project.liveUrl && (
                  <Button 
                    href={project.liveUrl} 
                    variant="primary" 
                    size="sm"
                    className="flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button 
                    href={project.githubUrl} 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </motion.div>
  );
};

/**
 * Projects Section Component
 * Displays project cards with filtering and image carousel
 */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [carouselProject, setCarouselProject] = useState(null);
  const categories = ['All', ...getCategories()];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="projects" 
      className="py-20 lg:py-32 bg-dark-50/50 dark:bg-dark-900/50"
      aria-label="Projects section"
    >
      <div className="section-container">
        <SectionHeader
          subtitle="My recent work"
          title="Featured Projects"
          description="A selection of projects that showcase my skills and passion for building impactful solutions."
          align="center"
        />

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-400 border border-dark-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                onImageGallery={setCarouselProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        {projects.length > 6 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              href="https://github.com/ayush23chaudhary" 
              variant="outline" 
              size="lg"
              icon={Github}
            >
              View All on GitHub
            </Button>
          </motion.div>
        )}
      </div>

      {/* Image Carousel Modal */}
      <AnimatePresence>
        {carouselProject && carouselProject.images && (
          <ImageCarousel
            images={carouselProject.images}
            title={carouselProject.title}
            onClose={() => setCarouselProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
