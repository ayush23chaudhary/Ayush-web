# Personal Portfolio Website

A modern, recruiter-friendly developer portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, minimal UI with glassmorphism effects and subtle animations
- **Dark & Light Mode**: Automatic system preference detection with manual toggle
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Easy Customization**: All content managed through data files
- **Accessible**: ARIA labels, keyboard navigation, and semantic HTML
- **Performance Optimized**: Fast load times with Vite bundler
- **SEO Ready**: Meta tags, Open Graph, and structured content

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── favicon.svg
│   ├── profile.jpg          # Your profile photo
│   ├── resume.pdf           # Your resume
│   └── projects/            # Project images
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Skills, etc.
│   │   └── ui/              # Reusable components
│   ├── data/                # Content data files
│   │   ├── personal.js      # Personal info & about
│   │   ├── projects.js      # Project listings
│   │   ├── skills.js        # Skills by category
│   │   └── experience.js    # Work, education, certs
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:
   ```bash
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## ✏️ Customization Guide

### 1. Personal Information

Edit `src/data/personal.js` to update:
- Your name and roles
- Hero section tagline
- About section content
- Social media links
- Contact information

### 2. Projects

Edit `src/data/projects.js` to add/modify projects:

```javascript
{
  id: 1,
  title: "Project Name",
  featured: true,                    // Show in featured section
  problem: "Problem statement",
  description: "Full description",
  features: ["Feature 1", "Feature 2"],
  impact: "Impact statement",
  technologies: ["React", "Node.js"],
  liveUrl: "https://demo.example.com",
  githubUrl: "https://github.com/...",
  category: "Full-Stack"
}
```

### 3. Skills

Edit `src/data/skills.js` to update your tech stack by category.

### 4. Experience & Education

Edit `src/data/experience.js` to update:
- Work experience
- Education
- Hackathons
- Certifications

### 5. Profile Image & Resume

1. Add your profile photo as `public/profile.jpg`
2. Add your resume PDF as `public/resume.pdf`
3. Add project screenshots in `public/projects/`

### 6. Theme Customization

Edit `tailwind.config.js` to customize:
- Colors (primary, accent)
- Fonts
- Shadows
- Animations

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with default settings

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📧 Contact Form Integration

The contact form currently logs submissions to console. For production, integrate with:

1. **Formspree**: Add your Formspree endpoint
2. **Netlify Forms**: Add `netlify` attribute to form
3. **Custom Backend**: Send POST request to your API

Example with Formspree:
```javascript
// In Contact.jsx, update handleSubmit:
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 📝 License

This project is open source and available under the MIT License.

---

Made with ❤️ by Ayush Chaudhary
