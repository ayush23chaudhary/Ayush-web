/**
 * Projects Data
 * Add or modify projects here to update the Projects section.
 * Each project will automatically appear on the website.
 */

export const projects = [
  {
    id: 1,
    title: "SpeakWise – AI Speech Quality & Style Analyzer",
    slug: "speakwise",
    featured: true,
    problem: "People struggle to improve their public speaking skills without real-time, personalized feedback on their speech quality and delivery style.",
    description: "An AI-driven software solution that analyzes speech quality and style in real-time, providing personalized feedback and exercises to help users improve their communication skills.",
    features: [
      "Real-time Speech-to-Text analysis",
      "Gemini AI-powered feedback and evaluation",
      "Performance metrics: Clarity, Confidence, Fluency, Pace, Tone",
      "Personalized exercises and goal tracking",
      "Progress monitoring with streaks and achievements"
    ],
    impact: "Improved evaluation accuracy and user experience by 40% through AI integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "Speech-to-Text"],
    liveUrl: "https://www.speakwise.co.in/",
    githubUrl: "https://github.com/ayush23chaudhary/SpeakWise-Speech-AI-Coach",
    image: "/projects/speakwise/hero.svg",
    images: [
      "/projects/speakwise/hero.svg",
      "/projects/speakwise/studio.svg",
      "/projects/speakwise/metrics.svg",
      "/projects/speakwise/feedback.svg",
      "/projects/speakwise/profile.svg"
    ],
    category: "AI/ML"
  },
  {
    id: 2,
    title: "BrajPath – Mathura Heritage & Tourism Platform",
    slug: "brajpath",
    featured: true,
    problem: "Tourists visiting Mathura and Vrindavan struggle to find comprehensive information about temples, cultural sites, and local experiences in one place.",
    description: "A full-stack web platform showcasing the rich cultural heritage of Mathura-Vrindavan, featuring temples, tourist attractions, local festivals, and travel guides to help visitors explore the sacred land of Lord Krishna.",
    features: [
      "Interactive temple and tourist spot directory",
      "Detailed information about historical significance",
      "Festival calendar and cultural events",
      "Travel guides and local recommendations",
      "Responsive design for mobile tourists",
      "Image galleries of heritage sites"
    ],
    impact: "Created a comprehensive digital guide for cultural tourism in Mathura-Vrindavan region.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    //liveUrl: "https://brajpath.vercel.app",
    githubUrl: "https://github.com/ayush23chaudhary/Braj-Path",
    image: "/projects/brajpath/hero.svg",
    images: [
      "/projects/brajpath/hero.svg"
    ],
    category: "Full-Stack"
  },
  {
    id: 3,
    title: "ML-Powered Internship Recommendation System",
    slug: "internship-recommender",
    featured: true,
    problem: "Students waste hours scrolling through irrelevant internship listings that don't match their skills, education, or location preferences.",
    description: "A recommendation engine that delivers 3-5 highly relevant internship opportunities per user based on their skills, education, and location using machine learning.",
    features: [
      "TF-IDF vectorization for skill matching",
      "Cosine similarity-based recommendations",
      "Responsive frontend interface",
      "Scalable MongoDB data handling"
    ],
    impact: "Improved recommendation relevance and efficiency by approximately 40%.",
    technologies: ["Python", "Flask", "MongoDB", "TF-IDF", "Scikit-learn", "React"],
    liveUrl: "https://pm-internship-recommendation-engine.vercel.app/",
    githubUrl: "https://github.com/ayush23chaudhary/PM_Internship_recommendation_engine",
    image: "/projects/pm-internship/form.svg",
    category: "AI/ML"
  }
];

// Get featured projects only
export const getFeaturedProjects = () => projects.filter(p => p.featured);

// Get projects by category
export const getProjectsByCategory = (category) => 
  projects.filter(p => p.category === category);

// Get all unique categories
export const getCategories = () => 
  [...new Set(projects.map(p => p.category))];

export default projects;
