import { useState, useMemo, useEffect } from 'react';

export function useProjectFilter(projects = []) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('mrunal_portfolio_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mrunal_portfolio_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (projectName) => {
    setFavorites((prev) =>
      prev.includes(projectName)
        ? prev.filter((name) => name !== projectName)
        : [...prev, projectName]
    );
  };

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    projects.forEach((p) => {
      const name = p.name.toLowerCase();
      const stack = (p.stack || []).map((s) => s.toLowerCase());
      
      if (name.includes('ai') || stack.some((s) => s.includes('ai') || s.includes('rag') || s.includes('llm') || s.includes('langchain'))) {
        cats.add('AI & RAG');
      }
      if (stack.some((s) => s.includes('react') || s.includes('next') || s.includes('node') || s.includes('django') || s.includes('fastapi'))) {
        cats.add('Full-Stack & SaaS');
      }
      if (name.includes('vegee') || name.includes('sugar') || name.includes('fresh') || stack.some((s) => s.includes('stripe') || s.includes('cart'))) {
        cats.add('E-Commerce');
      }
      if (name.includes('scraper') || name.includes('crawl') || stack.some((s) => s.includes('playwright') || s.includes('beautifulsoup') || s.includes('redis'))) {
        cats.add('Data & Automation');
      }
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search text match
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.subtitle?.toLowerCase().includes(query) ||
        p.desc?.toLowerCase().includes(query) ||
        p.stack?.some((s) => s.toLowerCase().includes(query));

      // Favorite filter
      if (showFavoritesOnly && !favorites.includes(p.name)) {
        return false;
      }

      // Category match
      if (selectedCategory === 'All') return matchesSearch;

      const name = p.name.toLowerCase();
      const stack = (p.stack || []).map((s) => s.toLowerCase());

      if (selectedCategory === 'AI & RAG') {
        return matchesSearch && (name.includes('ai') || stack.some((s) => s.includes('ai') || s.includes('rag') || s.includes('llm') || s.includes('agent')));
      }
      if (selectedCategory === 'Full-Stack & SaaS') {
        return matchesSearch && stack.some((s) => s.includes('react') || s.includes('next') || s.includes('fastapi') || s.includes('node'));
      }
      if (selectedCategory === 'E-Commerce') {
        return matchesSearch && (name.includes('vegee') || name.includes('sugar') || name.includes('fresh') || stack.some((s) => s.includes('stripe')));
      }
      if (selectedCategory === 'Data & Automation') {
        return matchesSearch && (name.includes('scraper') || stack.some((s) => s.includes('playwright') || s.includes('redis') || s.includes('nlp')));
      }

      return matchesSearch;
    });
  }, [projects, search, selectedCategory, favorites, showFavoritesOnly]);

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProjects,
    favorites,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  };
}
