import { Navbar, Footer } from './components/layout';
import { 
  Hero, 
  About, 
  Skills, 
  Projects, 
  Experience, 
  Resume, 
  Contact 
} from './components/sections';

/**
 * Main App Component
 * Assembles all sections into a complete portfolio website
 */
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300 relative overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero / Landing Section */}
        <Hero />
        
        {/* About Me Section */}
        <About />
        
        {/* Skills & Tech Stack Section */}
        <Skills />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Experience & Education Section */}
        <Experience />
        
        {/* Resume Section */}
        <Resume />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
