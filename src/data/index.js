// Re-export all data from a single entry point
export { personalInfo } from './personal.js';
export { projects, getFeaturedProjects, getProjectsByCategory, getCategories } from './projects.js';
export { skillCategories, getAllSkills, getSkillByName } from './skills.js';
export { 
  workExperience, 
  education, 
  hackathons, 
  certifications, 
  getTimelineItems 
} from './experience.js';
