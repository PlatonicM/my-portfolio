import 'dotenv/config';
import { connectDB } from './config/db.js';
import Resume from './models/Resume.js';
import Blog from './models/Blog.js';
import Contact from './models/Contact.js';
import { resumeData } from './data/resume.js';

async function seed() {
  await connectDB();
  console.log('Seeding Database...');

  await Resume.deleteMany({});
  await Resume.create(resumeData);
  console.log('Resume seeded successfully.');

  const sampleBlogs = [
    {
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

  await Blog.deleteMany({});
  await Blog.insertMany(sampleBlogs);
  console.log('Blogs seeded successfully.');

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
