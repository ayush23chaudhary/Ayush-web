import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Braces, Sparkles, Folder, Heart, Play, Pause, RefreshCw } from 'lucide-react';

const SystemGraph = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [cycleIndex, setCycleIndex] = useState(0);
  const autoCycleTimer = useRef(null);

  // Nodes position inside a 500x500 box (scaled dynamically)
  const nodes = [
    {
      id: 'ayush',
      label: 'AYUSH',
      sublabel: 'SYSTEM_ROOT',
      x: 250,
      y: 250,
      size: 48,
      icon: Braces,
      color: 'text-primary-500',
      fill: 'bg-primary-500/10 border-primary-500',
      description: 'Root system coordinator. Ranked top 1% at GLA. Competitive programmer.'
    },
    {
      id: 'aiml',
      label: 'AI & ML',
      sublabel: 'INTELLIGENCE_LAYER',
      x: 120,
      y: 150,
      size: 38,
      icon: Sparkles,
      color: 'text-purple-500',
      fill: 'bg-purple-500/10 border-purple-500',
      connections: ['ayush', 'speakwise'],
      description: 'Azure AI certified models, NLP tf-idf filters, recommendations.'
    },
    {
      id: 'fullstack',
      label: 'FULL-STACK',
      sublabel: 'APPLICATION_LAYER',
      x: 380,
      y: 150,
      size: 38,
      icon: Terminal,
      color: 'text-blue-500',
      fill: 'bg-blue-500/10 border-blue-500',
      connections: ['ayush', 'transitops', 'diagramnote'],
      description: 'React client ecosystems connected to Node.js & Spring Boot database APIs.'
    },
    {
      id: 'opensource',
      label: 'OPEN SOURCE',
      sublabel: 'COMMUNITY_LAYER',
      x: 250,
      y: 390,
      size: 38,
      icon: Heart,
      color: 'text-green-500',
      fill: 'bg-green-500/10 border-green-500',
      connections: ['ayush'],
      description: 'Public contributions to Node.js Core, React Router docs, Next.js, and React.'
    },
    {
      id: 'speakwise',
      label: 'SpeakWise',
      sublabel: 'SYS_01',
      x: 60,
      y: 270,
      size: 30,
      icon: Folder,
      color: 'text-dark-500 dark:text-dark-300',
      fill: 'bg-dark-100 dark:bg-dark-800 border-dark-300 dark:border-dark-700',
      connections: ['aiml'],
      description: 'AI-driven speech evaluator running live on Gemini evaluation algorithms.'
    },
    {
      id: 'transitops',
      label: 'TransitOps',
      sublabel: 'SYS_02',
      x: 440,
      y: 270,
      size: 30,
      icon: Folder,
      color: 'text-dark-500 dark:text-dark-300',
      fill: 'bg-dark-100 dark:bg-dark-800 border-dark-300 dark:border-dark-700',
      connections: ['fullstack'],
      description: 'Fleet logistics operations coordinator tracking vehicle state consistency.'
    },
    {
      id: 'diagramnote',
      label: 'DiagramNote',
      sublabel: 'SYS_03',
      x: 370,
      y: 360,
      size: 30,
      icon: Folder,
      color: 'text-dark-500 dark:text-dark-300',
      fill: 'bg-dark-100 dark:bg-dark-800 border-dark-300 dark:border-dark-700',
      connections: ['fullstack'],
      description: 'Markdown diagram editor with live debounced compiler & localStorage drafts.'
    }
  ];

  // Connection links configuration
  const links = [
    { source: 'ayush', target: 'aiml' },
    { source: 'ayush', target: 'fullstack' },
    { source: 'ayush', target: 'opensource' },
    { source: 'aiml', target: 'speakwise' },
    { source: 'fullstack', target: 'transitops' },
    { source: 'fullstack', target: 'diagramnote' }
  ];

  // Auto cycling logic
  useEffect(() => {
    if (isAutoCycle) {
      autoCycleTimer.current = setInterval(() => {
        setCycleIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % nodes.length;
          setActiveNode(nodes[nextIndex]);
          return nextIndex;
        });
      }, 4000); // Shift every 4 seconds
    } else {
      clearInterval(autoCycleTimer.current);
    }

    return () => clearInterval(autoCycleTimer.current);
  }, [isAutoCycle]);

  // Set initial active node on mount
  useEffect(() => {
    setActiveNode(nodes[0]);
  }, []);

  const handleNodeHover = (node) => {
    setIsAutoCycle(false); // Pause auto cycling when user hovers manually
    setActiveNode(node);
  };

  const handleMouseLeave = () => {
    // Optional: Resume auto-cycle after mouse leaves, or let the user toggle it back.
    // Let's resume it automatically after a short delay for continuous liveliness.
    setIsAutoCycle(true);
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-dark-50/20 dark:bg-dark-900/10 rounded-3xl border border-dark-200/50 dark:border-dark-800/50 p-4 overflow-hidden bg-grid-blueprint">
      
      {/* SVG connections layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        {links.map((link, idx) => {
          const fromNode = nodes.find(n => n.id === link.source);
          const toNode = nodes.find(n => n.id === link.target);
          if (!fromNode || !toNode) return null;

          const isActive = activeNode && (activeNode.id === link.source || activeNode.id === link.target);

          return (
            <g key={idx}>
              {/* Glow line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isActive ? 'var(--color-primary)' : 'rgba(49, 91, 255, 0.1)'}
                strokeWidth={isActive ? 3 : 1.5}
                className="transition-all duration-300"
              />
              {isActive && (
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="var(--color-primary-light)"
                  strokeWidth={4}
                  strokeDasharray="8 8"
                  animate={{ strokeDashoffset: -20 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes layer */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isActive = activeNode && activeNode.id === node.id;
        
        return (
          <motion.div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: isActive ? 1.15 : 1,
            }}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer z-10 select-none group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${
              isActive 
                ? 'bg-primary-500/20 border-primary-500 shadow-primary-500/30 scale-110' 
                : `${node.fill} group-hover:shadow-primary-500/20`
            }`}>
              <Icon className={`w-5 h-5 ${node.color}`} />
            </div>

            {/* Micro-label */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <div className={`text-[10px] font-bold uppercase font-mono tracking-wider transition-colors duration-300 ${
                isActive ? 'text-primary-500 dark:text-primary-400' : 'text-dark-900 dark:text-white'
              }`}>
                {node.label}
              </div>
              <div className="text-[7px] text-dark-400 dark:text-dark-500 font-mono tracking-widest mt-0.5">
                {node.sublabel}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Blueprint Annotations & Manual Controls */}
      <div className="absolute top-3 left-3 flex items-center gap-3">
        <span className="text-[8px] font-mono text-dark-400 tracking-widest uppercase">
          SYS.NODE_MAP / ACT_01
        </span>
        <button
          onClick={() => setIsAutoCycle(!isAutoCycle)}
          className="p-1 rounded bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center gap-1 text-[8px] font-mono"
          title={isAutoCycle ? "Pause Auto Scan" : "Resume Auto Scan"}
        >
          {isAutoCycle ? <Pause className="w-2 h-2" /> : <Play className="w-2 h-2" />}
          <span>{isAutoCycle ? "AUTO_SCAN" : "MANUAL"}</span>
        </button>
      </div>

      <div className="absolute bottom-3 right-3 text-[8px] font-mono text-dark-400 tracking-widest flex items-center gap-2">
        <RefreshCw className={`w-2.5 h-2.5 ${isAutoCycle ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span>COORD: [250.250.50]</span>
      </div>

      {/* Detail overlay */}
      <div className="absolute bottom-12 left-4 right-4 h-24 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-md p-4 rounded-xl border border-dark-200 dark:border-dark-800 shadow-xl pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                <h4 className="text-xs font-bold font-mono tracking-wider text-primary-500 dark:text-primary-400 uppercase">
                  {activeNode.label} / {activeNode.sublabel}
                </h4>
              </div>
              <p className="text-xs text-dark-600 dark:text-dark-300 font-sans leading-relaxed">
                {activeNode.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SystemGraph;
