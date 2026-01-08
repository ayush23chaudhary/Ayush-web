/**
 * Skills Data
 * Organize your technical skills by category.
 * Each skill can have an icon name from Lucide icons.
 */

export const skillCategories = [
  {
    id: 1,
    name: "Programming Languages",
    description: "Languages I code with daily",
    icon: "Code2",
    skills: [
      { name: "Java", level: 90, icon: "Coffee" },
      { name: "Python", level: 85, icon: "Terminal" },
      { name: "JavaScript", level: 85, icon: "Braces" },
      { name: "C", level: 75, icon: "Cpu" },
      { name: "SQL", level: 80, icon: "Database" }
    ]
  },
  {
    id: 2,
    name: "Web Technologies",
    description: "Frontend & Backend frameworks",
    icon: "Layers",
    skills: [
      { name: "React", level: 85, icon: "Atom" },
      { name: "Node.js", level: 80, icon: "Server" },
      { name: "Express", level: 80, icon: "Zap" },
      { name: "Flask", level: 75, icon: "Zap" },
      { name: "HTML/CSS", level: 90, icon: "FileCode" },
      { name: "RESTful APIs", level: 85, icon: "Globe" }
    ]
  },
  {
    id: 3,
    name: "Databases & Cloud",
    description: "Data storage & cloud platforms",
    icon: "Cloud",
    skills: [
      { name: "MongoDB", level: 80, icon: "Database" },
      { name: "Microsoft Azure", level: 80, icon: "Cloud" },
      { name: "Vercel", level: 85, icon: "Triangle" },
      { name: "Render", level: 75, icon: "Server" },
      { name: "SQL Databases", level: 80, icon: "Database" }
    ]
  },
  {
    id: 4,
    name: "DevOps & Tools",
    description: "Development workflow tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: 90, icon: "GitBranch" },
      { name: "Docker", level: 75, icon: "Container" },
      { name: "CI/CD Pipelines", level: 70, icon: "RefreshCw" },
      { name: "VS Code", level: 95, icon: "Code2" },
      { name: "PyCharm", level: 80, icon: "Code2" }
    ]
  },
  {
    id: 5,
    name: "CS Fundamentals",
    description: "Core computer science knowledge",
    icon: "Lightbulb",
    skills: [
      { name: "Data Structures & Algorithms", level: 90, icon: "Network" },
      { name: "Object-Oriented Programming", level: 90, icon: "Boxes" },
      { name: "Operating Systems", level: 75, icon: "Cpu" },
      { name: "Computer Networks", level: 75, icon: "Globe" },
      { name: "DBMS", level: 80, icon: "Database" }
    ]
  },
  {
    id: 6,
    name: "Machine Learning",
    description: "AI/ML technologies I work with",
    icon: "Lightbulb",
    skills: [
      { name: "Scikit-learn", level: 75, icon: "Settings" },
      { name: "Pandas/NumPy", level: 80, icon: "Terminal" },
      { name: "TF-IDF/NLP", level: 70, icon: "FileCode" },
      { name: "Matplotlib/Seaborn", level: 75, icon: "Paintbrush" }
    ]
  }
];

// Flatten all skills for quick access
export const getAllSkills = () => 
  skillCategories.flatMap(category => category.skills);

// Get skill by name
export const getSkillByName = (name) => 
  getAllSkills().find(skill => skill.name === name);

export default skillCategories;
