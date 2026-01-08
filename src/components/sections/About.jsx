import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { SectionHeader } from '../ui';
import { personalInfo } from '../../data';

const About = () => {
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 lg:py-32 bg-dark-50 dark:bg-dark-900"
      aria-label="About me section"
    >
      <div className="section-container">
        <SectionHeader
          badge="About Me"
          title="Get to Know Me"
          subtitle="A passionate developer with a love for creating impactful digital experiences"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl transform rotate-3" />
              <div className="relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-dark-200 dark:border-dark-700 transform -rotate-0 shadow-xl">
                <img
                  src={personalInfo.avatar || '/placeholder-avatar.jpg'}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="card p-6">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">
                Who I Am
              </h3>
              {personalInfo.about.description.map((paragraph, index) => (
                <p key={index} className="text-dark-600 dark:text-dark-400 leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Quick Info */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-4 text-center">
                <MapPin className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-dark-500 dark:text-dark-400">Location</p>
                <p className="font-medium text-dark-900 dark:text-white">{personalInfo.location}</p>
              </div>
              <div className="card p-4 text-center">
                <GraduationCap className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-dark-500 dark:text-dark-400">Education</p>
                <p className="font-medium text-dark-900 dark:text-white">B.Tech CSE</p>
              </div>
              <div className="card p-4 text-center">
                <Briefcase className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-dark-500 dark:text-dark-400">Focus</p>
                <p className="font-medium text-dark-900 dark:text-white">Full Stack</p>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {personalInfo.highlights?.map((highlight, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                >
                  {highlight}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
