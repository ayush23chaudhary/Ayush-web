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
    image: "/projects/projects-png/Speakwise.png",
    images: [
      "/projects/projects-png/Speakwise.png"
    ],
    category: "AI/ML"
  },
  {
    id: 1.5,
    title: "AnonChat – Real-Time Anonymous Messaging Platform",
    slug: "anonchat",
    featured: true,
    problem: "Users often seek a safe, private space to express themselves freely and connect with others instantly without the pressure of revealing their identity or creating accounts.",
    description: "A real-time anonymous chat application designed for seamless and secure communication. It allows users to pair up instantly and converse without needing any registration or personal data.",
    features: [
      "Real-time bi-directional messaging",
      "Instant anonymous user pairing",
      "No user registration or data collection required",
      "Responsive and intuitive user interface",
      "Secure and low-latency WebSocket connections"
    ],
    impact: "Provided a fast, reliable, and privacy-first platform for secure online interactions.",
    technologies: ["React", "Java Spring Boot", "WebSocket", "Tailwind CSS"],
    liveUrl: "https://anon-chat-weld.vercel.app",
    githubUrl: "https://github.com/ayush23chaudhary/Anon-Chat",
    image: "/projects/projects-png/Anonchat.png",
    images: [
      "/projects/projects-png/Anonchat.png"
    ],
    category: "Full-Stack"
  },
  {
    id: 1.7,
    title: "DiagramNote – Premium Note Maker & Mermaid Editor",
    slug: "diagramnote",
    featured: true,
    problem: "Developers and writers lack a streamlined, high-performance editor to draft Markdown notes alongside synchronized, theme-aware live-rendered Mermaid diagrams.",
    description: "A premium, high-performance, single-page Markdown and Mermaid.js v11 diagramming editor that auto-saves drafts locally and provides a live preview as you type.",
    features: [
      "Mermaid.js v11 support with live dynamic updates",
      "Theme-aware rendering synchronizing with dark and light modes",
      "Debounced live preview (300ms) for typing responsiveness",
      "GitHub-style callouts/alerts support with inline SVGs",
      "Local persistence via localStorage draft cycling",
      "Flexible export to Markdown (.md), standalone HTML, or PDF"
    ],
    impact: "Enables fast, responsive documentation and design drawing from a single sleek glassmorphic workspace.",
    technologies: ["HTML", "CSS", "JavaScript", "Mermaid.js", "Vite"],
    liveUrl: "https://diagram-note-three.vercel.app",
    githubUrl: "https://github.com/ayush23chaudhary/DiagramNote",
    image: "/projects/projects-png/DiagramNote.png",
    images: [
      "/projects/projects-png/DiagramNote.png"
    ],
    category: "Front-End"
  },
  {
    id: 1.8,
    title: "TransitOps – Smart Transport Operations Platform",
    slug: "transitops",
    featured: true,
    problem: "Transport operations are often fragmented, leading to conflicting assignments, expired compliance issues, and disconnected tracking of fleet resources.",
    description: "An intelligent end-to-end transport operations platform designed to unify fleet management, smart dispatch, driver compliance, maintenance, expense tracking, and operational analytics.",
    features: [
      "State-enforced Trip Dispatcher preventing conflicting assignments",
      "Vehicle registry with automated state tracking (Available, On Trip, In Shop)",
      "Driver & safety registry with license compliance tracking",
      "Maintenance lifecycle management connected to vehicle availability",
      "Fuel and expense tracking with vehicle-level cost analysis",
      "Unified operations dashboard with fleet utilization analytics"
    ],
    impact: "Brings fleet management under one operational truth by coordinating real-time status transitions.",
    technologies: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://transitops-smart-transport-platform.vercel.app/",
    githubUrl: "https://github.com/ayush23chaudhary/Transitops-smart-transport-platform",
    image: "/projects/projects-png/TransitOps.png",
    images: [
      "/projects/projects-png/TransitOps.png"
    ],
    category: "Full-Stack"
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
    image: "/projects/projects-png/Brajpath.png",
    images: [
      "/projects/projects-png/Brajpath.png"
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
    image: "/projects/projects-png/internship-recommendation.png",
    images: [
      "/projects/projects-png/internship-recommendation.png"
    ],
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
