import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    profile: {
      name: { type: String, default: 'Mrunal A. Chaudhari' },
      title: { type: String, default: 'Software Engineer | Full-Stack Developer' },
      location: { type: String, default: 'Nagpur, Maharashtra' },
      phone: { type: String, default: '+91 7030087366' },
      email: { type: String, default: 'mrunalchaudhari666@gmail.com' },
      linkedin: { type: String, default: 'https://linkedin.com/in/mrunal-chaudhari03' },
      github: { type: String, default: 'https://github.com/PlatonicM' },
      photo: { type: String, default: '/profile.png' },
      summary: { type: String, default: '' },
    },
    skills: { type: Map, of: [String], default: {} },
    experience: [
      {
        id: String,
        company: String,
        role: String,
        period: String,
        location: String,
        link: String,
        points: [String],
      },
    ],
    projects: [
      {
        id: String,
        name: String,
        subtitle: String,
        desc: String,
        stack: [String],
        link: String,
        github: String,
        featured: Boolean,
      },
    ],
    education: {
      degree: String,
      school: String,
      location: String,
      period: String,
    },
    links: [
      {
        label: String,
        value: String,
        href: String,
        icon: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
