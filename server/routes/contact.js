import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();
const memory = [];

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation logic
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (phone && phone.trim() && !/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Please enter a valid phone number format.' });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
  }

  const entry = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : '',
    subject: subject && subject.trim() ? subject.trim() : 'Portfolio Contact Inquiry',
    message: message.trim(),
    createdAt: new Date(),
  };

  try {
    const saved = await Contact.create(entry);
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been saved to the database and sent successfully.',
      data: saved,
    });
  } catch (err) {
    console.warn('MongoDB not available, using in-memory store fallback:', err.message);
    memory.push(entry);
    return res.status(201).json({
      success: true,
      message: 'Your message has been stored successfully.',
      data: entry,
      fallback: true,
    });
  }
});

router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json(contacts.length ? contacts : memory);
  } catch {
    res.json(memory);
  }
});

export default router;
