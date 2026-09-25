import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBlog, createBlogApi, updateBlogApi } from '../api/client';
import CelebrationToast from '../components/CelebrationToast';

const defaultImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80', // AI / Code
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', // Dashboard / Data
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80', // Servers / Cloud
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80', // Security & Code
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  // Form state for creating/editing blogs
  const [blogForm, setBlogForm] = useState({
    title: '',
    subtitle: '',
    tag: 'AI Architecture',
    excerpt: '',
    content: '',
    coverImage: '',
    projectId: 'examforge-ai',
  });

  const fallbackBlogs = [
    {
      _id: 'blog-examforge-ai',
      id: 'blog-examforge-ai',
      slug: 'examforge-ai-architecture',
      title: 'Building ExamForge-AI: Scalable RAG & Document Intelligence',
      subtitle: 'How we structured Next.js 14, FastAPI, Zod, and OCR for real-time exam prep',
      excerpt: 'An inside engineering look at building an AI-powered study companion with instant flashcard generation, mock tests, and PDF document analysis.',
      tag: 'AI Architecture',
      author: 'Mrunal Chaudhari',
      date: 'Aug 15, 2026',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
      projectId: 'examforge-ai',
      content: `## System Architecture & Technical Vision
ExamForge-AI is engineered to transform unstructured study materials—textbooks, PDFs, and lecture slides—into dynamic assessment engines. By combining Optical Character Recognition (OCR) with Retrieval-Augmented Generation (RAG), the system generates validated flashcards, practice questions, and goal-tracking analytics.

### Core Stack & Layered Responsibilities
1. **Frontend Layer (Next.js 14 & TypeScript)**: Built using React Hook Form, Zod schema validation, and Framer Motion for smooth step-by-step UI flows.
2. **State Management (TanStack Query)**: Utilizes optimistic UI updates, automated query key invalidation, and background refetching to keep document libraries synchronized.
3. **Backend Microservices (FastAPI & Python)**: Asynchronous REST endpoints backed by Celery background workers for non-blocking document ingestion and OCR execution.
4. **Vector Search & RAG**: Extracted text chunks are embedded and indexed into vector stores, enabling context-aware LLM completions with low latency.

### Key Engineering Wins
- **Indexing Throughput**: Offloaded OCR document extraction to async Celery queues, boosting file throughput by 40%.
- **Client Reliability**: Implemented strict Zod contracts between client inputs and API endpoints to eliminate runtime payload crashes.`
    },
    {
      _id: 'blog-ai-bos',
      id: 'blog-ai-bos',
      slug: 'ai-bos-saas-platform',
      title: 'Architecting AI-BOS: Multi-Tenant AI Business Operating System',
      subtitle: 'Designing CRM, Sales Automation, and Revenue Forecasting with FastAPI & Redis',
      excerpt: 'Deep dive into microservices, role-based access control (RBAC), multi-tenant schema isolation, and predictive AI models.',
      tag: 'Enterprise SaaS',
      author: 'Mrunal Chaudhari',
      date: 'May 28, 2025',
      readTime: '9 min read',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      projectId: 'ai-bos',
      content: `## Enterprise Multi-Tenancy & Operational Intelligence
AI-BOS (AI Business Operating System) unites core business workflows—CRM, automated sales follow-ups, smart lead capture, and predictive revenue forecasting—into a single multi-tenant SaaS workspace.

### Architectural Breakdown
- **Service & Repository Pattern**: Microservices are organized into service logic, data repositories, and storage adapters for clean testability and code isolation.
- **Database Strategy**: Uses MongoDB for flexible tenant workspace metadata and PostgreSQL for relational sales analytics and audit logs.
- **Security & RBAC**: Enforces fine-grained Role-Based Access Control using JWT tokens and scope middleware.
- **Redis Caching**: Caches high-frequency tenant lead scores and session limits to maintain under 50ms API response times.

### Business Impact
- Unified multi-tenant architecture supporting lead scoring, churn prediction, and sentiment analysis.
- Instant natural language querying across enterprise document repositories via RAG pipelines.`
    },
    {
      _id: 'blog-ats-resume-builder',
      id: 'blog-ats-resume-builder',
      slug: 'ats-resume-builder-nlp',
      title: 'Engineering ATS-Resume-Builder: Real-Time Keyword Matching & PDF Generation',
      subtitle: 'Building TF-IDF keyword extraction, ATS scoring, and headless PDF compilation in FastAPI',
      excerpt: 'How we engineered an ATS evaluation engine that parses target job descriptions, computes skill match vectors, and exports parseable PDFs.',
      tag: 'NLP & AI Tooling',
      author: 'Mrunal Chaudhari',
      date: 'Jan 10, 2026',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
      projectId: 'ats-resume-builder',
      content: `## The ATS Matching Problem
Modern Automated Applicant Tracking Systems (ATS) reject up to 75% of candidate resumes due to unparseable layouts, missing technical keywords, or improper section hierarchies.

### Technical System Design
1. **NLP Keyword Extraction**: Extracts n-grams, technical competencies, and required frameworks from raw Job Description text using Python NLP libraries.
2. **TF-IDF & Cosine Match Vector**: Computes similarity metrics comparing the candidate's resume sections against target JD requirements.
3. **Layout Inspection Engine**: Scans formatting structure to flag multi-column tables, inline graphics, or unparseable fonts that break ATS parsers.
4. **Headless PDF Compiler**: Renders HTML/CSS templates via a headless browser instance in FastAPI to generate 100% text-selectable, ATS-ready PDF files.

### Key Performance Highlights
- Sub-second ATS match score calculation and feedback generation.
- Zero formatting degradation across all major ATS parsers (Workday, Greenhouse, Lever).`
    },
    {
      _id: 'blog-agentforge',
      id: 'blog-agentforge',
      slug: 'agentforge-multi-agent-dag',
      title: 'Building AgentForge: DAG-Based Autonomous Multi-Agent Workflows',
      subtitle: 'Orchestrating stateful LLM agent nodes, custom function-calling tools, and vector memory',
      excerpt: 'Deep dive into constructing Directed Acyclic Graph (DAG) execution engines for multi-agent AI collaboration and tool usage.',
      tag: 'AI Agents & DAGs',
      author: 'Mrunal Chaudhari',
      date: 'Feb 18, 2026',
      readTime: '10 min read',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      projectId: 'agentforge',
      content: `## Why DAGs for Autonomous AI Agents?
Single-prompt LLM agents suffer from hallucination and lack of structured task control. Representing agent workflows as Directed Acyclic Graphs (DAGs) guarantees execution ordering, state isolation, and deterministic tool execution.

### Architectural Blueprint
- **Node-Based Subroutines**: Each graph node represents a specialized agent routine (e.g., Searcher, SQL Query Generator, Validator).
- **Shared Global Context**: A shared context store enables memory propagation across execution steps while maintaining transaction safety.
- **Function-Calling Tool Registry**: Agents dynamically select and execute registered tools (Web Search, API Requests, Database Queries).
- **Async Execution Queue**: Powered by FastAPI and Redis task queues to run long-running agent workflows asynchronously without blocking HTTP clients.

### Developer Insights
- Built an interactive React dashboard for live step-by-step agent trajectory visualization and token consumption analytics.`
    },
    {
      _id: 'blog-mentor',
      id: 'blog-mentor',
      slug: 'mentor-edtech-platform',
      title: 'Building Mentor: High-Scale EdTech & Real-Time Q&A Architecture',
      subtitle: 'Structuring video streaming pathways, RBAC authentication, and interactive course dashboards',
      excerpt: 'Architecting an IT learning platform with interactive video modules, mentor-student discussion threads, and automated certifications.',
      tag: 'Full-Stack EdTech',
      author: 'Mrunal Chaudhari',
      date: 'Nov 04, 2025',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
      projectId: 'mentor',
      content: `## Engineering High-Engagement E-Learning
The Mentor platform was designed to bridge the gap between senior IT professionals and aspiring developers through structured video curricula and interactive Q&A.

### Technical Implementation
1. **Modular Course Hierarchy**: Designed MongoDB document schemas representing courses, chapters, video lessons, and student progress metrics.
2. **Role-Based Access Control (RBAC)**: Implemented granular middleware separating Mentor, Student, and Admin portal capabilities.
3. **Interactive Q&A Forum**: Enabled real-time threaded discussion beneath course modules for rapid mentor feedback.
4. **Automated Skill Certification**: Generates dynamic PDF completion certificates with unique QR code verification links upon course completion.`
    },
    {
      _id: 'blog-amazon-scraper',
      id: 'blog-amazon-scraper',
      slug: 'amazon-scraper-data-pipeline',
      title: 'High-Throughput E-Commerce Scraping with Playwright, FastAPI & Redis',
      subtitle: 'Bypassing anti-bot mechanisms, proxy rotation, and real-time price change alerts',
      excerpt: 'Technical strategies for building resilient web scraping pipelines capable of extracting price data at scale.',
      tag: 'Data Scraping',
      author: 'Mrunal Chaudhari',
      date: 'Dec 12, 2025',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
      projectId: 'amazon-scraper',
      content: `## Challenges in E-Commerce Scraping
Scraping modern e-commerce portals requires bypassing IP rate limits, CAPTCHAs, dynamic DOM rendering, and strict anti-bot headers.

### Pipeline Architecture
- **Headless Playwright Workers**: Managed pool of headless browser instances rendering dynamic JavaScript elements.
- **Smart Proxy Rotation**: Rotates residential and datacenter proxies with custom user-agent headers to minimize blocks.
- **DOM Parsing & Schema Normalization**: Uses BeautifulSoup4 to parse raw HTML into validated Pydantic models.
- **Webhook Price Alerts**: Compares newly scraped prices against historical PostgreSQL records and emits Redis events on price drops.`
    },
    {
      _id: 'blog-fastapi-postgresql',
      id: 'blog-fastapi-postgresql',
      slug: 'fastapi-postgresql-optimization',
      title: 'Optimizing API Latency: PostgreSQL Indexing & Asynchronous Python',
      subtitle: 'How query profiling, composite indexes, and Redis reduced REST endpoint latency by 35%',
      excerpt: 'Practical backend performance tuning strategies for high-traffic Python REST APIs.',
      tag: 'Backend Performance',
      author: 'Mrunal Chaudhari',
      date: 'Jul 14, 2024',
      readTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
      projectId: '',
      content: `## Diagnosing API Bottlenecks
In enterprise web platforms, API latency degradation often stems from unindexed database queries and synchronous blocking I/O calls.

### Engineering Interventions
1. **Composite Database Indexing**: Analyzed slow query logs in PostgreSQL and added composite B-tree indexes for frequently joined foreign keys.
2. **AWS S3 Storage Adapter**: Replaced inline payload binary streams with direct AWS S3 pre-signed upload URLs, freeing worker memory.
3. **Async Microservices**: Migrated heavy file parsing to FastAPI async background tasks, freeing main worker threads immediately.

### Key Results
- 35% reduction in 99th-percentile API response latency across core business endpoints.`
    }
  ];

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchBlog();
      if (Array.isArray(data) && data.length > 0) {
        setBlogs(data);
      } else {
        setBlogs(fallbackBlogs);
      }
    } catch {
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setBlogForm({
      title: post.title || '',
      subtitle: post.subtitle || '',
      tag: post.tag || 'AI Architecture',
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || '',
      projectId: post.projectId || 'examforge-ai',
    });
    setEditMode(true);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setBlogForm({
      title: '',
      subtitle: '',
      tag: 'Full-Stack & AI',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
      projectId: 'examforge-ai',
    });
    setEditMode(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) return;

    try {
      if (editingPost) {
        await updateBlogApi(editingPost._id || editingPost.id, blogForm);
        setToast({ show: true, title: '🎉 Blog Updated!', message: 'Blog post saved successfully' });
      } else {
        await createBlogApi(blogForm);
        setToast({ show: true, title: '🎉 New Blog Published!', message: 'Blog post created and stored' });
      }
      setEditMode(false);
      loadBlogs();
    } catch (err) {
      setToast({ show: true, title: 'Error', message: 'Failed to save blog post.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10"
    >
      <CelebrationToast
        show={toast.show}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Header Bar with Amber Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
        <div>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30 uppercase tracking-widest inline-block mb-2">
            Relatable Engineering Blog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Articles & Case Studies
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium">
            Technical breakdowns matching real projects like ExamForge-AI and AI-BOS.
          </p>
        </div>

        {/* Create / Edit Blog Button */}
        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition flex items-center gap-2"
        >
          <span>✍️</span> Publish / Edit Article
        </button>
      </div>

      {/* Create / Edit Blog Drawer Modal */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl space-y-5"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-amber-400">📝</span> {editingPost ? 'Edit Blog Post' : 'Create New Relatable Article'}
              </h3>
              <button onClick={() => setEditMode(false)} className="text-slate-400 hover:text-white font-bold text-xs">
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="Blog Title..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={blogForm.subtitle}
                    onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                    placeholder="Subtitle or tagline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Tag / Category</label>
                  <input
                    type="text"
                    value={blogForm.tag}
                    onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value })}
                    placeholder="e.g. AI Architecture"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Related Project</label>
                  <select
                    value={blogForm.projectId}
                    onChange={(e) => setBlogForm({ ...blogForm, projectId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none font-mono"
                  >
                    <option value="examforge-ai">ExamForge-AI</option>
                    <option value="ai-bos">AI-BOS</option>
                    <option value="full-stack">Full-Stack Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-200 font-bold mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={blogForm.coverImage}
                    onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Short Excerpt</label>
                <input
                  type="text"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Summary for blog card..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">Full Article Markdown Content *</label>
                <textarea
                  rows="6"
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write full article here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 transition shadow-lg"
                >
                  💾 Save Article
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-amber-400">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium">Loading Relatable Articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b, idx) => {
            const blogId = b._id || b.id;
            const projectImg =
              b.coverImage ||
              defaultImages[idx % defaultImages.length];

            return (
              <motion.article
                key={blogId}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 p-6 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between relative"
              >
                <div>
                  {/* Related Project Image Banner */}
                  <div className="h-48 rounded-2xl overflow-hidden mb-5 relative border border-slate-800">
                    <img
                      src={projectImg}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-950/90 text-amber-300 border border-amber-400/40">
                      {b.tag || 'Relatable Project Blog'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition leading-snug mb-2">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 mb-6 font-normal leading-relaxed">
                    {b.excerpt || b.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <Link
                    to={`/blog/${blogId}`}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs text-center transition hover:from-amber-300 shadow-md"
                  >
                    Read Full Article →
                  </Link>

                  {/* Edit Blog Button Only (No Delete) */}
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-400/30 text-xs font-mono font-bold transition"
                    title="Edit Article"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
