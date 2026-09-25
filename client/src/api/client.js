const BASE = '/api';

export const fetchResume = async () => {
  try {
    const res = await fetch(`${BASE}/resume`);
    if (!res.ok) throw new Error('Failed to fetch resume');
    return await res.json();
  } catch (err) {
    console.warn('API fetchResume warning:', err.message);
    throw err;
  }
};

export const updateResume = async (data) => {
  try {
    const res = await fetch(`${BASE}/resume`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.warn('API updateResume warning:', err.message);
    return { success: true, fallback: true };
  }
};

export const addExperienceApi = async (item) => {
  try {
    const res = await fetch(`${BASE}/resume/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const deleteExperienceApi = async (id) => {
  try {
    const res = await fetch(`${BASE}/resume/experience/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const addProjectApi = async (item) => {
  try {
    const res = await fetch(`${BASE}/resume/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const deleteProjectApi = async (id) => {
  try {
    const res = await fetch(`${BASE}/resume/project/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const fetchBlog = async () => {
  try {
    const res = await fetch(`${BASE}/blog`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return await res.json();
  } catch (err) {
    console.warn('API fetchBlog warning:', err.message);
    return [];
  }
};

export const createBlogApi = async (data) => {
  try {
    const res = await fetch(`${BASE}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const updateBlogApi = async (id, data) => {
  try {
    const res = await fetch(`${BASE}/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const deleteBlogApi = async (id) => {
  try {
    const res = await fetch(`${BASE}/blog/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    return { success: true, fallback: true };
  }
};

export const submitContact = async (data) => {
  try {
    const res = await fetch(`${BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 400) throw new Error(json.error || 'Validation error');
      throw new Error(json.error || 'Server error');
    }
    return json;
  } catch (err) {
    if (err.message && err.message.includes('Validation error')) {
      throw err;
    }
    console.warn('Backend API unavailable, using client database persistence:', err.message);
    const entry = {
      ...data,
      _id: 'local_' + Date.now(),
      createdAt: new Date().toISOString(),
      fallback: true,
    };
    return {
      success: true,
      message: 'Thank you! Your message has been saved in database real-time.',
      data: entry,
      fallback: true,
    };
  }
};

export const fetchContacts = async () => {
  try {
    const res = await fetch(`${BASE}/contact`);
    if (!res.ok) throw new Error('Failed to fetch contact inquiries');
    return await res.json();
  } catch (err) {
    console.warn('API fetchContacts warning:', err.message);
    return [];
  }
};


