import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../hooks/useResume';

const projectDetails = {
  'examforge-ai': {
    id: 'examforge-ai',
    name: 'ExamForge-AI',
    subtitle: 'AI-Powered Exam Preparation & Study Intelligence Platform',
    desc: 'Developed responsive frontend workflows for goal management, document library, notes, flashcards, planner, mock tests, and progress tracking. Engineered document upload workflows supporting educational content with FastAPI backend.',
    fullDescription: `
ExamForge-AI is an intelligent learning ecosystem designed to revolutionize how students prepare for exams. By leveraging Advanced Retrieval-Augmented Generation (RAG) and Optical Character Recognition (OCR), ExamForge-AI ingests textbooks, hand-written lecture notes, and syllabus PDFs, converting them into structured flashcard decks, adaptive mock examinations, and smart study planners.
    `,
    category: 'AI Platform & EdTech',
    role: 'Lead Full-Stack Developer',
    period: 'May/2026 – Aug/2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zod', 'TanStack Query', 'FastAPI', 'RAG', 'OCR'],
    keyFeatures: [
      'Automated OCR & Document Ingestion for PDF & Images',
      'AI-Powered Adaptive Mock Test & Flashcard Generator',
      'Interactive Student Dashboard with Progress Metrics & Analytics',
      'Optimistic State Management with TanStack Query',
      'Strict Type-Safe Schema Validation with Zod & React Hook Form',
    ],
    architecture: [
      'Modular frontend presentation layer in Next.js 14 with Server/Client component separation.',
      'FastAPI async backend service handling compute-heavy OCR parsing and vector storage.',
      'JWT Authentication & RBAC user access control for multi-tenant student workflows.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Aniket-Athanikar/Exam_Forge',
  },
  'ats-resume-builder': {
    id: 'ats-resume-builder',
    name: 'ATS-Resume-Builder',
    subtitle: 'ATS-Optimized Software Engineering Resume Builder & Match Evaluator',
    desc: 'Engineered an ATS-friendly resume creation platform. Implemented automated keyword extraction, real-time match scoring against job descriptions, PDF compilation engine, and structural formatting checks to maximize ATS compliance.',
    fullDescription: `
ATS-Resume-Builder is an intelligent, ATS (Applicant Tracking System) optimized resume building and evaluation platform designed specifically for software engineers and tech professionals.

It bridges the gap between candidate resumes and modern automated hiring software by analyzing target job descriptions, extracting core technical competencies, computing keyword density match scores, highlighting missing skill gaps, and rendering pixel-perfect, parseable PDF resumes.
    `,
    category: 'AI & Career Tooling',
    role: 'Lead Full-Stack Developer',
    period: '2025',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
    stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'NLP', 'PDF Engine', 'Zod'],
    keyFeatures: [
      'Real-Time ATS Compliance & Keyword Match Scoring against target Job Descriptions',
      'Automated NLP Skill & Technical Term Extraction from JD text',
      'Pixel-Perfect ATS-Ready PDF Export Engine',
      'Dynamic Section Order & Reusable Layout Customization',
      'Structural Formatting Inspector to prevent unparseable graphics or columns',
    ],
    architecture: [
      'Modular React & Next.js presentation layer with live side-by-side Markdown and PDF preview.',
      'Python FastAPI backend microservice performing NLP parsing, TF-IDF term scoring, and headless PDF generation.',
      'Client-side state validation with Zod schemas and persistent local workspace storage.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/ATS-Resume-Builder',
  },
  'mentor': {
    id: 'mentor',
    name: 'Mentor',
    subtitle: 'High-Level IT Industry E-Learning & Developer Mentorship Platform',
    desc: 'Developed an e-learning and developer mentorship platform for IT industry courses. Engineered course management workflows, interactive video modules, student-mentor live Q&A, assignment submission systems, and skill certification.',
    fullDescription: `
Mentor is an immersive e-learning and mentorship ecosystem built for high-level IT industry courses and software engineering career growth.

It empowers senior industry mentors and instructors to publish structured video curricula, conduct live mentoring, assign coding challenges, grade student submissions, track learning progress analytics, and deliver verified skill certifications.
    `,
    category: 'EdTech & Mentorship',
    role: 'Full-Stack Developer',
    period: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    stack: ['React', 'Next.js', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT Auth', 'REST APIs'],
    keyFeatures: [
      'Structured Course Pathways with Interactive Video Player & Progress Analytics',
      'Real-Time Student-Mentor Q&A Forum & Private Discussion Threads',
      'Coding Assignment Submission, Verification & Grading Dashboard',
      'Role-Based Access Control (RBAC) for Mentors, Students, and Admins',
      'Automated Skill Certification Generator with QR Verification',
    ],
    architecture: [
      'Responsive Single-Page Application built with React and Next.js utilizing Tailwind CSS and Framer Motion.',
      'RESTful API backend layer with MongoDB schemas for course hierarchies, video metadata, and progress tracking.',
      'JWT authentication with token refreshing and granular route permission middleware.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/Mnetor',
  },
  'mnetor': {
    id: 'mnetor',
    name: 'Mentor',
    subtitle: 'High-Level IT Industry E-Learning & Developer Mentorship Platform',
    desc: 'Developed an e-learning and developer mentorship platform for IT industry courses. Engineered course management workflows, interactive video modules, student-mentor live Q&A, assignment submission systems, and skill certification.',
    fullDescription: `
Mentor is an immersive e-learning and mentorship ecosystem built for high-level IT industry courses and software engineering career growth.

It empowers senior industry mentors and instructors to publish structured video curricula, conduct live mentoring, assign coding challenges, grade student submissions, track learning progress analytics, and deliver verified skill certifications.
    `,
    category: 'EdTech & Mentorship',
    role: 'Full-Stack Developer',
    period: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    stack: ['React', 'Next.js', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT Auth', 'REST APIs'],
    keyFeatures: [
      'Structured Course Pathways with Interactive Video Player & Progress Analytics',
      'Real-Time Student-Mentor Q&A Forum & Private Discussion Threads',
      'Coding Assignment Submission, Verification & Grading Dashboard',
      'Role-Based Access Control (RBAC) for Mentors, Students, and Admins',
      'Automated Skill Certification Generator with QR Verification',
    ],
    architecture: [
      'Responsive Single-Page Application built with React and Next.js utilizing Tailwind CSS and Framer Motion.',
      'RESTful API backend layer with MongoDB schemas for course hierarchies, video metadata, and progress tracking.',
      'JWT authentication with token refreshing and granular route permission middleware.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/Mnetor',
  },
  'agentforge': {
    id: 'agentforge',
    name: 'AgentForge',
    subtitle: 'Autonomous AI Agent & Multi-Agent Workflow Orchestration Framework',
    desc: 'Architected a multi-agent AI orchestration platform. Designed DAG-based agent execution graphs, function-calling tool registries, persistent vector memory, and visual control dashboards for complex autonomous workflows.',
    fullDescription: `
AgentForge is a modular framework and developer toolkit for constructing, testing, and orchestrating autonomous AI agents and multi-agent teams.

By representing agent execution flows as Directed Acyclic Graphs (DAGs), AgentForge enables agents to collaborate, share global context, invoke custom API tools, search external knowledge bases, and maintain persistent long-term memory across long-running tasks.
    `,
    category: 'AI Agents & Systems',
    role: 'AI & Backend Architect',
    period: '2025 – 2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'LangChain', 'LlamaIndex', 'Vector DB', 'Redis', 'Gemini API', 'Docker'],
    keyFeatures: [
      'DAG-Based Multi-Agent Workflow Execution Engine',
      'Extensible Tool Registry supporting SQL, Web Search, & API Actions',
      'RAG Vector Memory Integration for Long-Term Conversational Context',
      'Interactive Visual Control Center for Agent Step Tracing & Debugging',
      'Asynchronous Task Execution Queue with Resilience & Retries',
    ],
    architecture: [
      'FastAPI async engine running non-blocking LLM execution graphs and stateful agent nodes.',
      'Distributed task queue backed by Redis for concurrent background agent invocations.',
      'React & TypeScript control center displaying live agent trajectories, tool inputs/outputs, and token metrics.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Aniket-Athanikar/Agentforge',
  },
  'freshvegee': {
    id: 'freshvegee',
    name: 'FreshVegee',
    subtitle: 'Direct Farm-to-Door Fresh Produce E-Commerce Platform',
    desc: 'Built a responsive fresh produce e-commerce platform with real-time inventory tracking, category filtering, cart management, checkout integration, and order status updates.',
    fullDescription: `
FreshVegee is a full-stack e-commerce platform designed to streamline direct farm-to-door fresh vegetable and organic produce ordering.

It provides customers with dynamic product filtering, real-time inventory updates, persistent shopping cart state, seamless checkout workflows with payment gateways, and automated delivery scheduling.
    `,
    category: 'E-Commerce & Retail',
    role: 'Full-Stack Developer',
    period: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop&q=80',
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux', 'Stripe API'],
    keyFeatures: [
      'Farm-to-Table Product Catalog with Dynamic Search & Price Filters',
      'Persistent Shopping Cart & Express Checkout Workflows with Payment Webhooks',
      'Order Tracking Dashboard with Automated Email Confirmations',
      'Admin Management Panel for Stock Inventory Updates & Product Categories',
      'Mobile-Optimized Responsive Dark/Light UI Design',
    ],
    architecture: [
      'Next.js presentation layer with SSR product pages optimized for search engines and fast page loads.',
      'REST API backend microservice with MongoDB collections for product inventory and user order histories.',
      'Stripe integration handling payment processing and automated webhook state validation.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/FreshVegee',
  },
  'amazon-scraper': {
    id: 'amazon-scraper',
    name: 'Amazon-Scraper',
    subtitle: 'High-Performance E-Commerce Data Scraping & Price Tracker API',
    desc: 'Engineered an automated Amazon web scraper and price intelligence pipeline. Supports headless browser rendering, proxy rotation, anti-bot bypass, structured product data extraction, and real-time price alerts.',
    fullDescription: `
Amazon-Scraper is an automated web scraping, data extraction, and price monitoring engine engineered for e-commerce market research and competitive pricing intelligence.

Built with Python, Playwright, FastAPI, and Redis, it handles dynamic JavaScript rendering, automated proxy rotation, anti-detection browser headers, structured product schema parsing, and real-time webhook price alerts.
    `,
    category: 'Data Engineering & Web Automation',
    role: 'Backend & Data Engineer',
    period: '2025',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
    stack: ['Python', 'Playwright', 'FastAPI', 'BeautifulSoup4', 'Redis', 'PostgreSQL', 'Docker', 'Asyncio'],
    keyFeatures: [
      'Automated Extraction of Product Details (Price, Ratings, Reviews, Availability)',
      'Headless Browser Automation with Rotating Proxies & Anti-Detection Headers',
      'Real-Time Price Drop & Competitor Change Detection Webhooks',
      'Async Redis Task Queue for High-Throughput Concurrent Scrape Jobs',
      'Structured JSON Export & PostgreSQL Analytics Database Storage',
    ],
    architecture: [
      'FastAPI async API endpoints accepting URL batches and scrape configuration parameters.',
      'Distributed Playwright workers operating asynchronously to bypass rate limits and anti-bot obstacles.',
      'PostgreSQL data storage layer coupled with Redis cache for fast price history queries.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/amazon-scraper',
  },
  'sugarrush': {
    id: 'sugarrush',
    name: 'SugarRush',
    subtitle: 'Interactive Gourmet Confectionery & Bakery E-Store',
    desc: 'Designed and developed an interactive online bakery and confectionery platform featuring customized cake builders, subscription boxes, interactive dessert menus, and order scheduling.',
    fullDescription: `
SugarRush is an interactive e-commerce experience designed for gourmet bakeries and confectionery shops.

It features a custom cake builder allowing users to choose flavors, toppings, and delivery dates, along with fluid micro-animations, subscription boxes, interactive dessert menus, and customer account portals.
    `,
    category: 'Web Application & Retail',
    role: 'Full-Stack Developer',
    period: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    keyFeatures: [
      'Custom Bakery Builder for Tiered Cakes & Custom Dessert Boxes',
      'Interactive Fluid Animations & Smooth Motion Transitions',
      'Scheduled Delivery Date Selector & Order Tracking Portal',
      'Role-Based Customer Account & Past Order History Dashboard',
      'Responsive Modern Dark Glassmorphism Aesthetics',
    ],
    architecture: [
      'React & TypeScript frontend interface utilizing Framer Motion for interactive UI customizer.',
      'Node.js / Express backend service handling custom item configurations, cart checkout, and customer authentication.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/SugarRush',
  },
  'vegee': {
    id: 'vegee',
    name: 'Vegee',
    subtitle: 'Smart Fresh Vegetables & Organic Grocery Supply Platform',
    desc: 'Developed a modern fresh vegetable and organic produce management web application with interactive product browsing, automated pricing tiers, subscription delivery options, and inventory controls.',
    fullDescription: `
Vegee is a full-stack fresh produce management and delivery web application built to streamline farm-fresh organic vegetable distribution.

It provides real-time produce stock updates, dynamic category filtering, flexible weekly subscription boxes, and a robust admin dashboard for inventory tracking and price tier management.
    `,
    category: 'E-Commerce & Supply Chain',
    role: 'Full-Stack Developer',
    period: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'PostgreSQL', 'Redis'],
    keyFeatures: [
      'Interactive Produce Catalog with Real-Time Stock Availability & Search',
      'Subscription-Based Weekly Organic Box Delivery Selector',
      'Dynamic Price Tier & Discount Management',
      'Store Admin Dashboard for Real-Time Order & Inventory Tracking',
    ],
    architecture: [
      'React & TypeScript frontend interface styled with Tailwind CSS for clean user interactions.',
      'Python FastAPI backend microservice managing PostgreSQL database queries and Redis session caching.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/Vegee',
  },
  'ai-growth-engine': {
    id: 'ai-growth-engine',
    name: 'AI-Growth-Engine',
    subtitle: 'AI-Driven Marketing Automation & Customer Growth Platform',
    desc: 'Architected an intelligent growth and marketing automation engine. Utilizes predictive analytics, customer segmentation, automated email campaign triggers, and AI-driven copy generation to boost user retention.',
    fullDescription: `
AI-Growth-Engine is an intelligent enterprise growth and marketing automation system designed to optimize customer acquisition and retention.

By integrating predictive machine learning models, RAG document knowledge extraction, automated campaign triggers, and generative AI copy writing, AI-Growth-Engine helps SaaS businesses convert leads and reduce user churn.
    `,
    category: 'Enterprise AI & Marketing',
    role: 'AI & Full-Stack Developer',
    period: '2025 – 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    stack: ['FastAPI', 'Python', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'RAG', 'LLM API', 'PostgreSQL', 'Redis'],
    keyFeatures: [
      'Predictive Customer Segmentation & Churn Risk Analytics',
      'AI-Powered Automated Copywriting & Campaign Content Generation',
      'Real-Time Event Trigger Integration & Webhook Automation',
      'Comprehensive Conversion Analytics & ROI Tracking Dashboards',
    ],
    architecture: [
      'Next.js 14 frontend control panel with interactive data visualizations and campaign editors.',
      'FastAPI async engine backed by PostgreSQL and Redis task queues for background analytics processing.',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/PlatonicM/ai-growth-engine',
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: resume } = useResume();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Check local dictionary or resume projects
    if (id && projectDetails[id.toLowerCase()]) {
      setProject(projectDetails[id.toLowerCase()]);
    } else if (resume?.projects) {
      const found = resume.projects.find(
        (p) => p.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === id || p.id === id
      );
      if (found) {
        const fallbackImages = {
          'examforge-ai': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
          'ai-bos': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
          'ats-resume-builder': 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
          'mentor': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
          'agentforge': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
          'freshvegee': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop&q=80',
          'amazon-scraper': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
          'sugarrush': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80',
          'vegee': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80',
          'ai-growth-engine': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        };
        setProject({
          ...found,
          id: id,
          fullDescription: found.desc,
          githubUrl: found.github || 'https://github.com/PlatonicM',
          image: fallbackImages[id.toLowerCase()] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
          keyFeatures: [
            'Scalable architecture & clean REST API endpoints',
            'Full responsive dark mode glassmorphism user interface',
            'Role-based access control & state revalidation',
          ],
          architecture: ['Service-repository-storage architectural pattern with automated tests.'],
        });
      }
    }
  }, [id, resume]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-slate-400 mb-6">The requested project ID "{id}" could not be located.</p>
        <Link
          to="/projects"
          className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-yellow-300 transition"
        >
          <span>←</span> Back to All Projects
        </Link>
      </div>

      {/* Hero Visual Header */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 bg-slate-900 shadow-2xl">
        <div className="h-52 sm:h-96 relative overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-center filter brightness-75 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="p-5 sm:p-10 -mt-20 sm:-mt-24 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest shadow-md">
              {project.category || 'Featured Project'}
            </span>
            {project.period && (
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 text-amber-300 border border-amber-400/30">
                📅 {project.period}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3">
            {project.name}
          </h1>
          <p className="text-sm sm:text-xl text-amber-300 font-semibold mb-6">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold border border-amber-400/40 flex items-center justify-center gap-2 transition shadow-lg text-xs sm:text-sm"
              >
                <span>💻</span> View GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black flex items-center justify-center gap-2 transition shadow-lg text-xs sm:text-sm"
              >
                <span>🚀</span> Live Application
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Grid Overview Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Deep Overview */}
          <div className="p-5 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2 border-b border-amber-400/30 pb-3">
              <span className="text-amber-400">📌</span> Project Overview
            </h3>
            <p className="text-slate-100 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-medium">
              {project.fullDescription || project.desc}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && (
            <div className="p-5 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-black text-white mb-5 flex items-center gap-2 border-b border-amber-400/30 pb-3">
                <span className="text-amber-400">⚡</span> Key Features & Capabilities
              </h3>
              <ul className="space-y-3">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-100 text-xs sm:text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black shadow-sm">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architecture && (
            <div className="p-5 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2 border-b border-amber-400/30 pb-3">
                <span className="text-amber-400">🏗️</span> Architectural Highlights
              </h3>
              <ul className="space-y-3 text-slate-100 text-xs sm:text-sm font-medium">
                {project.architecture.map((arch, idx) => (
                  <li key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    {arch}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Info (1 col) */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-950 text-amber-300 border border-amber-400/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Developer Role */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl space-y-4">
            <div>
              <span className="text-[11px] text-amber-400 font-mono font-bold uppercase tracking-wider block">Role</span>
              <span className="text-white font-black text-sm">{project.role || 'Full-Stack Developer'}</span>
            </div>
            <div>
              <span className="text-[11px] text-amber-400 font-mono font-bold uppercase tracking-wider block">Author</span>
              <span className="text-white font-black text-sm">Mrunal A. Chaudhari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
