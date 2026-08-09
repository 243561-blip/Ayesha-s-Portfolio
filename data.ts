import React from 'react';

import dukaanImg from './assets/images/dukaan_sync_pos_1786254864808.jpg';
import hotelImg from './assets/images/hotel_management_1786254886331.jpg';
import chatImg from './assets/images/online_chat_app_1786254902516.jpg';
import bookImg from './assets/images/book_store_sql_1786254918408.jpg';
import cricketImg from './assets/images/cricket_simulator_1786254937902.jpg';
import libraryImg from './assets/images/library_management_1786254956305.jpg';
import universityImg from './assets/images/university_system_1786254974520.jpg';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  keyPoints: string[];
  visualType: 'pos' | 'hotel' | 'chat' | 'books' | 'cricket' | 'library' | 'university';
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  isMajor?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string; level?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  score: string;
  details?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ayesha Shabbir",
    shortName: "AYESHA.",
    title: "Frontend Developer Intern",
    company: "NeuroFive Solutions",
    location: "Multan, Punjab, Pakistan",
    email: "ayeshashabbirg@gmail.com",
    phone: "+92 301 9080541",
    whatsapp: "+92 341 2312695",
    linkedin: "https://www.linkedin.com/in/ayeshashabbir-875489363",
    github: "https://github.com/243561-blip",
    cvDownload: "Ayesha_Shabbir_CV.pdf",
    tagline: "A Multan-based Computer Science student and frontend developer shaping clean interfaces, full-stack web apps, and multilingual digital experiences.",
    bio: "I'm interning as a Frontend Developer at NeuroFive Solutions while studying Computer Science at Air University, Multan. In parallel, I run taleAndTranslat — translating and adapting websites and blogs into Urdu and English while preserving technical integrity, SEO, and visual fidelity.",
    freelanceNotice: "I run a freelance localization practice alongside my studies — translating and adapting websites and blogs into Urdu and English, while keeping SEO and technical integrity intact.",
    openToRoles: true,
  },
  stats: [
    { value: "7+", label: "Projects Built" },
    { value: "962/1200", label: "ICS Score (80%+)" },
    { value: "3+", label: "Languages Spoken" },
    { value: "100%", label: "Code Dedication" }
  ],
  education: [
    {
      period: "2024–Now",
      degree: "BS Computer Science",
      institution: "Air University, Multan",
      score: "Undergraduate",
      details: "Focus on Data Structures, OOP, Web Technologies, Database Systems & Algorithms."
    },
    {
      period: "2024",
      degree: "ICS (Intermediate in Computer Science)",
      institution: "B.I.S.E Multan",
      score: "962/1200",
      details: "Top percentile academic standing in Computer Science, Math, and Physics."
    },
    {
      period: "2022",
      degree: "Matriculation",
      institution: "B.I.S.E Multan",
      score: "981/1100",
      details: "Science group with distinction."
    }
  ] as EducationItem[],
  experience: [
    {
      period: "2026–Now",
      role: "Frontend Developer Intern",
      company: "NeuroFive Solutions",
      location: "Multan, Pakistan",
      description: "Building responsive, modern, user-centric web applications and frontend components using React, Tailwind CSS, and TypeScript.",
      highlights: [
        "Developing scalable React components with fluid layout and responsive design",
        "Optimizing frontend rendering and state management pipelines",
        "Collaborating with backend teams on REST API integrations"
      ]
    },
    {
      period: "2026–Now",
      role: "Freelance Translator & Localizer",
      company: "taleAndTranslat",
      location: "Remote",
      description: "Translating and adapting web applications, blogs, and marketing assets between English and Urdu with technical & SEO preservation.",
      highlights: [
        "Website localization preserving layout, HTML structure, and SEO metadata",
        "Translation of technical technical documentation and UI copy"
      ]
    }
  ] as ExperienceItem[],
  technologies: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "JavaScript", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Bootstrap", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "C++", category: "Languages" },
    { name: "C#", category: "Languages" },
    { name: "ASP.NET Core", category: "Backend" },
    { name: "SQL & Databases", category: "Database" },
    { name: "REST APIs", category: "Backend" },
    { name: "Git & GitHub", category: "Tools" }
  ],
  languagesSpoken: ["اردو (Urdu - Native)", "English (Professional)", "Punjabi (Native)"],
  interests: ["Front-End Architecture", "3D Web Graphics", "Video Editing", "Social Media Marketing", "Localization"],
  projects: [
    {
      id: "dukaan-sync",
      title: "Dukaan Sync — POS Management System",
      subtitle: "Full-Stack Point of Sale System",
      category: "Full-Stack Web App",
      description: "Full-stack POS system for retail/shop use built with a client-side dashboard and RESTful server backend. Enables real-time inventory tracking, sales processing, and digital receipts.",
      technologies: ["React", "Next.js", "Node.js", "Express", "Axios", "REST API"],
      keyPoints: [
        "Full-stack POS system for retail and local business store management.",
        "Frontend built in React & Next.js with stateful shopping cart and checkout.",
        "Backend in Node.js & Express connected via asynchronous REST API endpoints."
      ],
      visualType: "pos",
      imageUrl: dukaanImg,
      isMajor: true,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "hotel-management",
      title: "Hotel Management System",
      subtitle: "Object-Oriented C++ Software",
      category: "Systems & OOP",
      description: "Robust desktop terminal software implementing fundamental Object-Oriented Programming (OOP) concepts for complete hotel operations management.",
      technologies: ["C++", "OOP", "Data Structures", "File I/O"],
      keyPoints: [
        "Applies core OOP principles — classes, inheritance, encapsulation, polymorphism.",
        "Comprehensive modules for room booking, guest check-in/out, and automated billing."
      ],
      visualType: "hotel",
      imageUrl: hotelImg,
      isMajor: true,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "online-chat",
      title: "Online Chat Application",
      subtitle: "ASP.NET Core Messaging Client",
      category: "Web & Real-Time",
      description: "Interactive real-time web application inspired by modern messaging platforms, built with ASP.NET Core and C# for active multi-user communication.",
      technologies: ["C#", "ASP.NET Core", "WebSockets/SignalR", "CSS3"],
      keyPoints: [
        "Web-based chat application inspired by WhatsApp messaging layout.",
        "Supports active message broadcasting, timestamping, and user conversation bubbles."
      ],
      visualType: "chat",
      imageUrl: chatImg,
      isMajor: true,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "book-store",
      title: "Book Store Management System",
      subtitle: "Relational Database & Query Engine",
      category: "Databases & SQL",
      description: "Relational database system designed with optimized table normalization, primary/foreign key constraints, and custom SQL queries for inventory analytics.",
      technologies: ["SQL", "Relational Design", "Database Optimization", "Stored Procedures"],
      keyPoints: [
        "Relational database schema designed specifically for commercial book inventories.",
        "SQL queries engineered to insert, update, search, and generate stock reports efficiently."
      ],
      visualType: "books",
      imageUrl: bookImg,
      isMajor: true,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "cricket-simulator",
      title: "Cricket Match Simulator",
      subtitle: "Game Engine & Logic in C++",
      category: "Algorithms & Simulation",
      description: "Algorithmic match simulation between two 11-player teams featuring ball-by-ball probability calculation, run tracking, and automated scoreboard generation.",
      technologies: ["C++", "Algorithms", "Game Logic"],
      keyPoints: [
        "Simulates realistic cricket match conditions between two complete teams.",
        "Automated strike rotation, bowler statistics, and live scoreboard update."
      ],
      visualType: "cricket",
      imageUrl: cricketImg,
      isMajor: false,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "library-system",
      title: "Library Management System",
      subtitle: "C# Inventory Application",
      category: "Desktop & OOP",
      description: "Desktop software providing catalog search, book issue/return tracking, overdue fine calculation, and member membership management.",
      technologies: ["C#", "OOP", "GUI / CLI"],
      keyPoints: [
        "OOP-based book search, issue, and return workflow with user fine calculation."
      ],
      visualType: "library",
      imageUrl: libraryImg,
      isMajor: false,
      githubUrl: "https://github.com/243561-blip"
    },
    {
      id: "university-system",
      title: "University Management System",
      subtitle: "Comprehensive Academic Database",
      category: "Database Systems",
      description: "Database architecture designed for higher education institutions handling student enrollment, course registration, professor assignments, and GPA computation.",
      technologies: ["SQL", "Relational Modeling", "Schema Design"],
      keyPoints: [
        "Multi-table relational model capturing student records, transcripts, and faculty rosters."
      ],
      visualType: "university",
      imageUrl: universityImg,
      isMajor: false,
      githubUrl: "https://github.com/243561-blip"
    }
  ] as Project[]
};
