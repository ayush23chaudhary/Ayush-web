/**
 * Experience & Education Data
 * Add your work experience, internships, and education here.
 */

export const workExperience = [
  {
    id: 1,
    type: "work",
    title: "Machine Learning with Python Trainee",
    company: "JOVAC",
    location: "Remote",
    period: "June 2025 – July 2025",
    current: false,
    description: "Applied engineering and machine learning principles to build and evaluate supervised learning models.",
    achievements: [
      "Evaluated supervised models: Linear Regression, Logistic Regression, Decision Trees, Naïve Bayes, Random Forests, and XGBoost",
      "Prepared, transformed, and visualized datasets using pandas, NumPy, Matplotlib, and Seaborn",
      "Implemented NLP workflows using tokenization and TF-IDF, improving classification accuracy by 10–15%"
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "NLP"]
  }
];

export const education = [
  {
    id: 1,
    type: "education",
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "GLA University",
    location: "Mathura, India",
    period: "Aug 2023 – May 2027",
    gpa: "9.29 (Year 1), 9.04 (Year 2)",
    achievements: [
      "Ranked among the top 1% of engineering students",
      "Two-time NPTEL National Course Topper",
      "Active participant in hackathons and coding competitions",
      "Strong foundation in DSA, OOP, OS, CN, and DBMS"
    ],
    coursework: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "Computer Networks", "Database Management Systems"]
  }
];

export const hackathons = [
  {
    id: 1,
    name: "Smart India Hackathon (Internal) 2025",
    position: "Finalist",
    project: "Innovative solution for national-level problem statement",
    date: "2025"
  },
  {
    id: 2,
    name: "Tata Imagination Challenge",
    position: "National Semi-finalist",
    project: "Creative problem-solving for real-world challenges",
    date: "2024"
  }
];

export const certifications = [
  {
    id: 1,
    name: "Azure AI Engineer Associate (AI-102)",
    issuer: "Microsoft",
    date: "2025",
    credentialUrl: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/"
  },
  {
    id: 2,
    name: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    issuer: "Oracle (1Z0-1085-25)",
    date: "2025",
    credentialUrl: "https://education.oracle.com/oracle-cloud-infrastructure-foundations"
  },
  {
    id: 3,
    name: "NPTEL Course Topper (2x)",
    issuer: "NPTEL - IIT",
    date: "2024",
    credentialUrl: "https://nptel.ac.in/"
  }
];

// Combine work and education for timeline
export const getTimelineItems = () => {
  const workItems = workExperience.map(item => ({ ...item, category: 'work' }));
  const eduItems = education.map(item => ({ ...item, category: 'education' }));
  return [...workItems, ...eduItems].sort((a, b) => {
    const yearA = parseInt(a.period.split(' – ')[0].split(' ').pop() || a.period.split(' ')[0]);
    const yearB = parseInt(b.period.split(' – ')[0].split(' ').pop() || b.period.split(' ')[0]);
    return yearB - yearA;
  });
};

export default {
  workExperience,
  education,
  hackathons,
  certifications,
  getTimelineItems
};
