import { Router } from 'express';
import Blog from '../models/Blog.js';

const router = Router();

const fallback = [
  {
    _id: '6ab0afeb76f8f2a7687d3651',
    id: '6ab0afeb76f8f2a7687d3651',
    slug: 'examforge-ai-architecture',
    title: 'Building ExamForge-AI: Scalable RAG & Document Intelligence',
    subtitle: 'How we structured Next.js, FastAPI, Zod, and OCR for real-time exam prep',
    excerpt: 'An inside engineering look at building an AI-powered study companion with instant flashcard generation, mock tests, and PDF document analysis.',
    tag: 'AI Architecture',
    author: 'Mrunal Chaudhari',
    date: 'Aug 15, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
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
- **Client Reliability**: Implemented strict Zod contracts between client inputs and API endpoints to eliminate runtime payload crashes.`,
  },
  {
    _id: '6ab0afeb76f8f2a7687d3652',
    id: '6ab0afeb76f8f2a7687d3652',
    slug: 'ai-bos-saas-platform',
    title: 'Architecting AI-BOS: Multi-Tenant AI Business Operating System',
    subtitle: 'Designing CRM, Sales Automation, and Revenue Forecasting with FastAPI & Redis',
    excerpt: 'Deep dive into microservices, role-based access control (RBAC), multi-tenant schema isolation, and predictive AI models.',
    tag: 'Full-Stack & Cloud',
    author: 'Mrunal Chaudhari',
    date: 'May 28, 2025',
    readTime: '8 min read',
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
- Instant natural language querying across enterprise document repositories via RAG pipelines.`,
  },
  {
    _id: '6ab0afeb76f8f2a7687d3653',
    id: '6ab0afeb76f8f2a7687d3653',
    slug: 'fastapi-postgresql-optimization',
    title: 'Optimizing API Latency: PostgreSQL Indexing & Asynchronous Python',
    subtitle: 'How query profiling, composite indexes, and Redis reduced REST endpoint latency by 35%',
    excerpt: 'Practical backend performance tuning strategies for high-traffic Python REST APIs.',
    tag: 'Backend Engineering',
    author: 'Mrunal Chaudhari',
    date: 'Jul 14, 2024',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    projectId: '',
    content: `## Diagnosing API Bottlenecks
In enterprise web platforms, API latency degradation often stems from unindexed database queries and synchronous blocking I/O calls.

### Engineering Interventions
1. **Composite Database Indexing**: Analyzed slow query logs in PostgreSQL and added composite B-tree indexes for frequently joined foreign keys.
2. **AWS S3 Storage Adapter**: Replaced inline payload binary streams with direct AWS S3 pre-signed upload URLs, freeing worker memory.
3. **Async Microservices**: Migrated heavy file parsing to FastAPI async background tasks, freeing main worker threads immediately.

### Key Results
- 35% reduction in 99th-percentile API response latency across core business endpoints.`,
  },
];

let inMemoryBlogs = [...fallback];

// Helper to seed initial blogs into DB if empty
async function seedBlogsIfEmpty() {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(fallback);
    }
  } catch { }
}
seedBlogsIfEmpty();

// GET /api/blog - List all blogs
router.get('/', async (_req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 }).lean();
    return res.json(posts.length ? posts : inMemoryBlogs);
  } catch {
    return res.json(inMemoryBlogs);
  }
});

// GET /api/blog/:id - Get single blog post
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let post = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Blog.findById(id).lean();
    }
    if (!post) {
      post = await Blog.findOne({ $or: [{ _id: id }, { slug: id }] }).lean();
    }
    if (post) return res.json(post);
  } catch { }

  const found = inMemoryBlogs.find((b) => b._id === id || b.id === id || b.slug === id);
  if (found) return res.json(found);
  return res.status(404).json({ error: 'Blog post not found' });
});

// POST /api/blog - Create new blog article
router.post('/', async (req, res) => {
  const newPost = {
    title: req.body.title || 'Untitled Article',
    subtitle: req.body.subtitle || '',
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    tag: req.body.tag || 'Engineering',
    author: 'Mrunal A. Chaudhari',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.max(3, Math.ceil((req.body.content || '').length / 400))} min read`,
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    projectId: req.body.projectId || '',
  };

  try {
    const saved = await Blog.create(newPost);
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    const fallbackPost = { _id: Date.now().toString(), ...newPost };
    inMemoryBlogs.unshift(fallbackPost);
    return res.status(201).json({ success: true, data: fallbackPost, fallback: true });
  }
});

// PUT /api/blog/:id - Update existing blog article
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let doc = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      doc = await Blog.findById(id);
    }
    if (!doc) {
      doc = await Blog.findOne({ _id: id });
    }
    if (doc) {
      Object.assign(doc, req.body);
      await doc.save();
      return res.json({ success: true, data: doc });
    }
  } catch { }

  const index = inMemoryBlogs.findIndex((b) => b._id === id || b.id === id);
  if (index !== -1) {
    inMemoryBlogs[index] = { ...inMemoryBlogs[index], ...req.body };
    return res.json({ success: true, data: inMemoryBlogs[index] });
  }

  return res.status(404).json({ error: 'Blog not found for editing' });
});

// DELETE /api/blog/:id - Delete blog article
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      await Blog.findByIdAndDelete(id);
    } else {
      await Blog.deleteOne({ _id: id });
    }
  } catch { }
  inMemoryBlogs = inMemoryBlogs.filter((b) => b._id !== id && b.id !== id);
  return res.json({ success: true });
});

export default router;


