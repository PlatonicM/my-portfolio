import { createContext, useContext, useEffect, useState } from 'react';
import { fetchResume } from '../api/client';
import fallback from '../data/resume';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const remote = await fetchResume();
        if (remote && remote.profile) {
          const merged = {
            ...fallback,
            ...remote,
            skills:
              remote.skills && Object.keys(remote.skills).length > 0
                ? remote.skills
                : fallback.skills,
            experience:
              remote.experience && remote.experience.length > 0
                ? remote.experience
                : fallback.experience,
            projects:
              remote.projects && remote.projects.length > 0
                ? remote.projects
                : fallback.projects,
          };
          setData(merged);
        } else {
          setData(fallback);
        }
      } catch {
        setData(fallback);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ResumeContext.Provider value={{ data, loading }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
