import React, { useState, useEffect, useRef } from 'react';
import { Canvas3D } from './components/Canvas3D';
import { PORTFOLIO_DATA, Project } from './data';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Terminal, 
  Code, 
  Cpu, 
  Globe, 
  Send,
  Download,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  Layers
} from 'lucide-react';

function ProjectHeroCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' }}
      className="glass-card p-6 sm:p-8 flex flex-col gap-6 border border-white/10 hover:border-[#F27D26]/60 hover:shadow-2xl hover:shadow-[#F27D26]/15 group transition-all"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl font-black text-[#F27D26] bg-[#F27D26]/10 px-3 py-1 rounded-lg border border-[#F27D26]/20">
            0{index + 1}
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold group-hover:text-[#F27D26] transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-[#14b8a6]">{project.subtitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20">
            {project.category}
          </span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Large 16:9 Visual Image with 3D Parallax & Overlay */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 group/img">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />

        {/* Hover interaction badge */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover/img:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/img:translate-y-0 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-[#F27D26]/40 text-xs font-mono text-[#F27D26]">
          <Sparkles className="w-3.5 h-3.5" /> Case Study Visual
        </div>
      </div>

      {/* Description & Key Points */}
      <div className="space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#F27D26] tracking-wider font-semibold">Key Highlights:</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
            {project.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <CheckCircle className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technologies */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono text-gray-500 uppercase mr-2">Tech Stack:</span>
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 text-gray-200 border border-white/10 group-hover:border-[#14b8a6]/40 transition-all"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass-card p-5 flex flex-col justify-between group hover:border-[#14b8a6]/50 transition-all hover:-translate-y-1">
      <div>
        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 border border-white/10 bg-black/50 group/simg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/simg:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14b8a6]/10 text-[#14b8a6]">
            {project.category}
          </span>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <h4 className="text-base font-bold text-white group-hover:text-[#F27D26] transition-colors mb-2">
          {project.title}
        </h4>

        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
        {project.technologies.map((tech, i) => (
          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'experience' | 'contact'>('home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync route with window hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'projects', 'experience', 'contact'].includes(hash)) {
        setActiveTab(hash as any);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab: 'home' | 'about' | 'projects' | 'experience' | 'contact') => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors = { name: '', email: '', message: '' };

    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!contactForm.email.trim() || !/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Valid email is required';
      valid = false;
    }
    if (!contactForm.message.trim() || contactForm.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setFormError(errors);

    if (valid) {
      setFormSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#F27D26] selection:text-black">
      {/* 3D R3F Canvas Background */}
      <Canvas3D currentSection={activeTab} />

      {/* Main Container Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col min-h-screen">
        
        {/* Header Navigation */}
        <header className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between mb-8">
          <div 
            onClick={() => navigateTo('home')} 
            className="cursor-pointer text-2xl font-extrabold tracking-widest text-[#F27D26] flex items-center gap-2"
          >
            <span className="inline-block w-3 h-3 bg-[#14b8a6] rounded-full animate-ping" />
            AYESHA<span className="text-white">.</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {(['home', 'about', 'projects', 'experience', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F27D26] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 rounded-lg bg-[#F27D26] hover:bg-[#d86b1e] text-black font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F27D26]/20"
          >
            Let's Talk
          </button>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="md:hidden flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
          {(['home', 'about', 'projects', 'experience', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => navigateTo(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#F27D26] text-black font-bold'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content View Routing */}
        <main className="flex-1 flex flex-col justify-center">

          {/* HOME VIEW */}
          {activeTab === 'home' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-auto">
              
              {/* Left Identity Sidebar */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="glass-card p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-[#14b8a6] text-xs font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> Identity Profile
                    </div>
                    <h2 className="text-lg font-bold mb-3">{PORTFOLIO_DATA.personal.name}</h2>
                    <p className="text-xs text-gray-300 leading-relaxed mb-6">
                      {PORTFOLIO_DATA.personal.title} at <span className="text-[#F27D26] font-semibold">{PORTFOLIO_DATA.personal.company}</span>.
                      Crafting immersive 3D digital experiences and high-performance software.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-500">LOCATION</span>
                      <span className="text-[#F27D26]">Pakistan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">STATUS</span>
                      <span className="text-[#14b8a6]">Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">DEGREE</span>
                      <span className="text-white">BS Computer Science</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Hero Core Focus */}
              <div className="lg:col-span-6 flex flex-col justify-center items-center text-center p-8 glass-card my-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/30 text-[#14b8a6] text-xs font-mono uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-ping" />
                  Hi, I'm Ayesha!
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4 leading-none">
                  FRONTEND <br />
                  <b className="font-extrabold text-[#F27D26]">DEVELOPER</b>
                </h1>

                <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                  {PORTFOLIO_DATA.personal.tagline}
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="px-6 py-3 rounded-lg bg-[#F27D26] hover:bg-[#d86b1e] text-black font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F27D26]/25 flex items-center gap-2"
                  >
                    Let's Work Together <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('projects')}
                    className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2"
                  >
                    View Projects <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Projects Preview Sidebar */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="glass-card p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" /> Major Projects
                    </div>

                    <div className="space-y-4">
                      {PORTFOLIO_DATA.projects.slice(0, 4).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => {
                            setSelectedProject(proj);
                            navigateTo('projects');
                          }}
                          className="p-3 rounded-lg border-l-2 border-white/10 hover:border-[#F27D26] bg-white/[0.02] hover:bg-[#F27D26]/5 transition-all cursor-pointer group"
                        >
                          <div className="text-sm font-semibold group-hover:text-[#F27D26] transition-colors">
                            {proj.title}
                          </div>
                          <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                            {proj.subtitle}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('projects')}
                    className="mt-6 text-xs text-[#14b8a6] hover:underline font-mono flex items-center gap-1"
                  >
                    +3 More Projects In Archive <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ABOUT VIEW */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
              <div className="lg:col-span-5 glass-card p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-3">(01) About Me</div>
                  <h2 className="text-3xl font-light mb-6">
                    The developer who speaks <span className="font-bold text-[#F27D26]">two languages</span>.
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {PORTFOLIO_DATA.personal.bio}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                    "{PORTFOLIO_DATA.personal.freelanceNotice}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.languagesSpoken.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="glass-card p-8">
                  <div className="text-[#14b8a6] text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Academic Nodes
                  </div>

                  <div className="space-y-6">
                    {PORTFOLIO_DATA.education.map((edu, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <div className="text-sm font-bold text-white">{edu.degree}</div>
                          <div className="text-xs text-gray-400">{edu.institution}</div>
                          {edu.details && <div className="text-[11px] text-gray-500 mt-1">{edu.details}</div>}
                        </div>
                        <div className="text-right sm:text-right">
                          <span className="inline-block px-2.5 py-1 rounded bg-[#F27D26]/10 text-[#F27D26] font-mono text-xs font-semibold">
                            {edu.score}
                          </span>
                          <div className="text-[10px] font-mono text-gray-500 mt-1">{edu.period}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Technical Constellation
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO_DATA.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#14b8a6] text-xs font-mono transition-colors">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS VIEW */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-12 my-auto max-w-5xl mx-auto w-full py-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-1">(02) Case Studies & Systems</div>
                  <h2 className="text-3xl font-bold">Featured Projects & Software Architecture</h2>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">
                    High-impact application software, full-stack POS systems, real-time engines, and normalized database schemas built with modern engineering standards.
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
                  {PORTFOLIO_DATA.projects.length} Total Projects
                </div>
              </div>

              {/* Major Projects Stack */}
              <div className="flex flex-col gap-10">
                {PORTFOLIO_DATA.projects.filter(p => p.isMajor).map((project, idx) => (
                  <ProjectHeroCard key={project.id} project={project} index={idx} />
                ))}
              </div>

              {/* Smaller Projects Showcase */}
              <div className="pt-8 border-t border-white/10 space-y-6">
                <div>
                  <div className="text-[#14b8a6] text-xs font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> Small Projects & Core Algorithms
                  </div>
                  <h3 className="text-xl font-bold">Simulations & Management Modules</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PORTFOLIO_DATA.projects.filter(p => !p.isMajor).map((project) => (
                    <SmallProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE VIEW */}
          {activeTab === 'experience' && (
            <div className="max-w-4xl mx-auto w-full glass-card p-8 my-auto">
              <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-2">(03) Career Track</div>
              <h2 className="text-3xl font-bold mb-8">Work Experience</h2>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
                {PORTFOLIO_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-[#14b8a6]/20 border border-[#14b8a6] flex items-center justify-center text-[#14b8a6]">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                          <div className="text-xs text-[#F27D26] font-semibold">{exp.company} — {exp.location}</div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-gray-400 border border-white/10">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 text-xs text-gray-400">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#14b8a6] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT VIEW */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
              <div className="lg:col-span-5 glass-card p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase mb-3">(04) Get In Touch</div>
                  <h2 className="text-3xl font-light mb-6">
                    Let's build <span className="font-bold text-[#F27D26]">something great.</span>
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-8">
                    Open to frontend and full-stack internship opportunities, freelance web development, or localization projects.
                  </p>

                  <div className="space-y-4 font-mono text-xs">
                    <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:border-[#F27D26] transition-colors">
                      <Mail className="w-4 h-4 text-[#F27D26]" />
                      <span>{PORTFOLIO_DATA.personal.email}</span>
                    </a>
                    <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:border-[#14b8a6] transition-colors">
                      <Phone className="w-4 h-4 text-[#14b8a6]" />
                      <span>{PORTFOLIO_DATA.personal.phone}</span>
                    </a>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{PORTFOLIO_DATA.personal.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#F27D26] text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#14b8a6] text-gray-300 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 glass-card p-8">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 focus:border-[#F27D26] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
                    />
                    {formError.name && <span className="text-red-400 text-xs font-mono mt-1 block">{formError.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 focus:border-[#F27D26] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
                    />
                    {formError.email && <span className="text-red-400 text-xs font-mono mt-1 block">{formError.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Message</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/15 focus:border-[#F27D26] focus:outline-none text-sm text-white placeholder-gray-600 transition-colors resize-none"
                    />
                    {formError.message && <span className="text-red-400 text-xs font-mono mt-1 block">{formError.message}</span>}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-lg bg-[#F27D26] hover:bg-[#d86b1e] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>

                    {formSubmitted && (
                      <span className="text-[#14b8a6] text-xs font-mono flex items-center gap-1.5 animate-fade-in">
                        <CheckCircle className="w-4 h-4" /> Message sent successfully!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>

        {/* Footer Bar */}
        <footer className="glass-panel rounded-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono mt-8">
          <div>
            © 2026 {PORTFOLIO_DATA.personal.name} • {PORTFOLIO_DATA.personal.title}
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6]" /> R3F 3D Engine Active
            </span>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-white transition-colors">
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
