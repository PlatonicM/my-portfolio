import { Router } from 'express';
import Resume from '../models/Resume.js';
import { resumeData } from '../data/resume.js';

const router = Router();
let inMemoryResume = { ...resumeData };

// Helper to get active resume document or fallback
async function getResumeDoc() {
  try {
    let doc = await Resume.findOne();
    if (!doc) {
      doc = await Resume.create(resumeData);
    }
    return doc;
  } catch (err) {
    return null;
  }
}

// GET /api/resume
router.get('/', async (_req, res) => {
  const doc = await getResumeDoc();
  if (doc) {
    return res.json(doc.toObject());
  }
  return res.json(inMemoryResume);
});

// PUT /api/resume - Update entire resume object
router.put('/', async (req, res) => {
  try {
    const updatedData = req.body;
    let doc = await Resume.findOne();
    if (doc) {
      Object.assign(doc, updatedData);
      await doc.save();
      return res.json({ success: true, data: doc });
    }
    inMemoryResume = { ...inMemoryResume, ...updatedData };
    return res.json({ success: true, data: inMemoryResume });
  } catch (err) {
    inMemoryResume = { ...inMemoryResume, ...req.body };
    return res.json({ success: true, data: inMemoryResume, fallback: true });
  }
});

// POST /api/resume/experience - Add experience item
router.post('/experience', async (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  try {
    let doc = await Resume.findOne();
    if (doc) {
      doc.experience.unshift(newItem);
      await doc.save();
      return res.status(201).json({ success: true, data: doc });
    }
  } catch {}
  inMemoryResume.experience.unshift(newItem);
  return res.status(201).json({ success: true, data: inMemoryResume });
});

// DELETE /api/resume/experience/:id - Remove experience item
router.delete('/experience/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let doc = await Resume.findOne();
    if (doc) {
      doc.experience = doc.experience.filter((e) => e.id !== id && e._id?.toString() !== id);
      await doc.save();
      return res.json({ success: true, data: doc });
    }
  } catch {}
  inMemoryResume.experience = inMemoryResume.experience.filter((e) => e.id !== id);
  return res.json({ success: true, data: inMemoryResume });
});

// POST /api/resume/project - Add project item
router.post('/project', async (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  try {
    let doc = await Resume.findOne();
    if (doc) {
      doc.projects.unshift(newItem);
      await doc.save();
      return res.status(201).json({ success: true, data: doc });
    }
  } catch {}
  inMemoryResume.projects.unshift(newItem);
  return res.status(201).json({ success: true, data: inMemoryResume });
});

// DELETE /api/resume/project/:id - Delete project item
router.delete('/project/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let doc = await Resume.findOne();
    if (doc) {
      doc.projects = doc.projects.filter((p) => p.id !== id && p._id?.toString() !== id);
      await doc.save();
      return res.json({ success: true, data: doc });
    }
  } catch {}
  inMemoryResume.projects = inMemoryResume.projects.filter((p) => p.id !== id);
  return res.json({ success: true, data: inMemoryResume });
});

export default router;
