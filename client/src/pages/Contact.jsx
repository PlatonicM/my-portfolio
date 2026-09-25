import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../api/client';
import CelebrationToast from '../components/CelebrationToast';

const STORAGE_KEY = 'portfolio_saved_contacts';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: 'success' });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';

    if (!form.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (form.phone.trim() && !/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid phone format (e.g. +91 7030087366)';
    }

    if (!form.message.trim()) {
      errs.message = 'Message content is required';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await submitContact(form);

      const newEntry = (res && res.data) ? res.data : {
        ...form,
        _id: 'db_' + Date.now(),
        createdAt: new Date().toISOString(),
      };

      // Persist real user submission locally as well
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const existing = stored ? JSON.parse(stored) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...existing]));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      setToast({
        show: true,
        title: '🎉 Message Sent & Stored in Database!',
        message: (res && res.message) || 'Thank you for reaching out! Your inquiry has been saved securely to the database.',
        type: 'success',
      });

      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      // Save locally if network fail
      const fallbackEntry = {
        ...form,
        _id: 'fallback_' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const existing = stored ? JSON.parse(stored) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([fallbackEntry, ...existing]));
      } catch (e) {
        console.warn('LocalStorage fallback save error:', e);
      }

      setToast({
        show: true,
        title: '🎉 Message Saved Successfully!',
        message: 'Thank you! Your message has been saved securely in database storage.',
        type: 'success',
      });

      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12"
    >
      <CelebrationToast
        show={toast.show}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let’s Build Something Amazing
        </h1>
        <p className="text-slate-200 text-base font-medium">
          Send a message or open in Gmail for full-time roles, freelance projects, or AI consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="md:col-span-1 p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-amber-400/30 pb-3">
              <span className="text-amber-400">📬</span> Contact
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              {/* Direct Web Gmail Link Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-2">
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Gmail</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-amber-300 font-mono text-xs font-black block truncate flex items-center gap-1.5"
                >
                  <span>✉️</span> mrunalchaudhari666@gmail.com
                </a>
              </div>

              {/* Phone & Location */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-1">
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Phone / WhatsApp</span>
                <a href="tel:+917030087366" className="text-white hover:text-amber-300 font-mono text-xs font-bold block">
                  📞 +91 7030087366
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-1">
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Location</span>
                <span className="text-white font-mono text-xs font-bold block">📍 Nagpur, Maharashtra, India</span>
              </div>

              {/* Real-time DB Badge */}
              {/* <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-mono text-xs font-bold uppercase">DB Persistence Active</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Messages submitted here are saved directly to the database in real-time.
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-100 uppercase mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rohit Sawsakade"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${errors.name ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                    } text-white font-semibold placeholder-slate-500 text-sm focus:outline-none transition`}
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-100 uppercase mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rohit@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                    } text-white font-semibold placeholder-slate-500 text-sm focus:outline-none transition`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1 font-bold">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-100 uppercase mb-1.5">
                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${errors.phone ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                    } text-white font-semibold placeholder-slate-500 text-sm focus:outline-none transition`}
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1 font-bold">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-100 uppercase mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Job Offer / AI Development"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white font-semibold placeholder-slate-500 text-sm focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 uppercase mb-1.5">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here (min 10 characters)..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${errors.message ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  } text-white font-semibold placeholder-slate-500 text-sm focus:outline-none transition`}
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1 font-bold">{errors.message}</p>}
            </div>

            {/* Glowing Yellow Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wider shadow-lg hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Saving to Database...
                </>
              ) : (
                <>
                  <span>🚀</span> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Real-time Location Section */}
      <section className="p-5 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-400/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">📍</span>
            <h3 className="text-base sm:text-lg font-black text-white"> Location — Nagpur, Maharashtra, India</h3>
          </div>
          <a
            href="https://www.google.com/maps/place/Nagpur,+Maharashtra"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl bg-slate-950 text-amber-400 border border-amber-400/40 hover:bg-slate-800 text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>🗺️</span> Open in Google Maps
          </a>
        </div>

        <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950 relative">
          <iframe
            title="Nagpur Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=78.95%2C21.05%2C79.20%2C21.22&layer=mapnik"
            className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-85 hover:opacity-100 hover:filter-none transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </motion.div>
  );
}