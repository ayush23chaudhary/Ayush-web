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
    liveUrl: null,
    githubUrl: "https://github.com/ayush23chaudhary/internship-recommender",
    image: "/projects/internship-recommender.png",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    slug: "portfolio",
    featured: true,
    problem: "Developers need a modern, recruiter-friendly way to showcase their skills, projects, and experience online.",
    description: "A responsive, animated portfolio website built with React, Tailwind CSS, and Framer Motion featuring dark mode, smooth animations, and easy content management.",
    features: [
      "Dark/Light mode with system preference detection",
      "Smooth Framer Motion animations",
      "Responsive mobile-first design",
      "Easy content customization via data files"
    ],
    impact: "Created a professional online presence for job applications and networking.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite", "Vercel"],
    liveUrl: "https://ayushchaudhary.vercel.app",
    githubUrl: "https://github.com/ayush23chaudhary/portfolio",
    image: "/projects/portfolio.png",
    category: "Full-Stack"
  },
  {
    id: 4,
    title: "DSA Problem Tracker",
    slug: "dsa-tracker",
    featured: false,
    problem: "Competitive programmers struggle to track their progress across multiple platforms and identify weak areas.",
    description: "A web application to track DSA problem-solving progress with statistics, topic-wise analysis, and revision reminders.",
    features: [
      "Problem tracking by topic and difficulty",
      "Progress statistics and visualizations",
      "Revision reminder system",
      "Multi-platform integration"
    ],
    impact: "Helped track 500+ solved problems with better organization.",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    liveUrl: null,
    githubUrl: "https://github.com/ayush23chaudhary/dsa-tracker",
    image: "/projects/dsa-tracker.png",
    category: "Full-Stack"
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
