import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Terminal } from 'lucide-react';
import { personalInfo } from '../../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const buildDate = new Date().toISOString().split('T')[0];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter },
    { name: 'Email', icon: Mail, url: `mailto:${personalInfo.social.email}` },
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Open Source', href: '#opensource' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-dark-950 border-t border-dark-800 relative overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundSize: '40px 40px',
        backgroundImage: `
          linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59,130,246,0.05) 1px, transparent 1px)
        `,
      }} />

      <div className="section-container relative z-10 py-14">
        
        {/* System status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-950/30 border border-green-800">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono text-green-400 tracking-widest uppercase font-bold">All Systems Operational</span>
            </div>
            <span className="text-[9px] font-mono text-dark-600 hidden sm:block">
              LAST_DEPLOY: {buildDate}
            </span>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dark-800 text-dark-400 hover:border-primary-700 hover:text-primary-400 transition-all text-[9px] font-mono tracking-wider uppercase"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3 h-3" />
            BACK_TO_TOP
          </motion.button>
        </div>

        {/* Main footer grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Identity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-bold text-white font-mono">
                <span className="text-primary-500">A</span>yush
                <span className="text-dark-500">/SYS</span>
              </span>
            </div>
            <p className="text-xs text-dark-500 leading-relaxed font-sans mb-4">
              Building intelligent, scalable systems with React, Node.js, and ML. Open to internship opportunities in 2025.
            </p>
            {/* Social row */}
            <div className="flex gap-2">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target={name !== 'Email' ? '_blank' : undefined}
                  rel={name !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-dark-900 border border-dark-800 text-dark-500 hover:text-primary-400 hover:border-primary-800 transition-all"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[9px] font-mono text-dark-500 uppercase tracking-widest mb-4">SYS.NAV</div>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-mono text-dark-500 hover:text-primary-400 transition-colors py-1"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* System metadata */}
          <div>
            <div className="text-[9px] font-mono text-dark-500 uppercase tracking-widest mb-4">SYS.META</div>
            <div className="space-y-2.5">
              {[
                { key: 'STACK', value: 'React · Tailwind · Framer' },
                { key: 'BUILD', value: 'Vite v5.4' },
                { key: 'DEPLOY', value: 'Vercel Edge Network' },
                { key: 'UPTIME', value: '99.9%' },
                { key: 'VERSION', value: '2.0.0' },
              ].map(({ key, value }) => (
                <div key={key} className="flex items-center gap-2 text-[9px] font-mono">
                  <span className="text-dark-600 w-16 flex-shrink-0">{key}</span>
                  <span className="text-dark-400">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-dark-800 flex flex-wrap items-center justify-between gap-3 text-[9px] font-mono text-dark-600">
          <span>© {currentYear} {personalInfo.name}. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-primary-500" />
            SYS.COORD: [28.5355, 77.3910] · MATHURA_INDIA
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
