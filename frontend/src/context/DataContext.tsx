import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SiteData, Solution, Segment, NumberStat, SiteContent, Banner } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface DataContextType {
  data: SiteData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateContent: (updates: SiteContent) => Promise<void>;
  updateSettings: (updates: Record<string, string>) => Promise<void>;
  updateSolution: (solution: Solution) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;
  updateSegment: (segment: Segment) => Promise<void>;
  deleteSegment: (id: string) => Promise<void>;
  addStat: (stat: NumberStat) => Promise<void>;
  updateStat: (stat: NumberStat) => Promise<void>;
  deleteStat: (id: string) => Promise<void>;
  addBanner: (banner: Banner) => Promise<void>;
  updateBanner: (banner: Banner) => Promise<void>;
  deleteBanner: (id: number) => Promise<void>;
  getBannersByPage: (page: string) => Banner[];
  uploadImage: (file: File) => Promise<string>;
}

const defaultData: SiteData = {
  content: {},
  solutions: [],
  segments: [],
  stats: [],
  banners: [],
  settings: {}
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const responses = await Promise.allSettled([
      fetch(`${API_URL}/content`),
      fetch(`${API_URL}/solutions`),
      fetch(`${API_URL}/segments`),
      fetch(`${API_URL}/stats`),
      fetch(`${API_URL}/banners`),
      fetch(`${API_URL}/settings`)
    ]);

    const safeJson = async (res: any, fallback: any) => {
      if (res.status === 'fulfilled' && res.value.ok) {
        return await res.value.json();
      }
      return fallback;
    };

    const content = await safeJson(responses[0], {});
    const solutions = await safeJson(responses[1], []);
    const segments = await safeJson(responses[2], []);
    const stats = await safeJson(responses[3], []);
    const banners = await safeJson(responses[4], []);
    const settings = await safeJson(responses[5], {});

    setData({
      content,
      solutions,
      segments,
      stats,
      banners,
      settings
    });

  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  } finally {
    setLoading(false);
  }
};




  const refreshData = async () => {
    await fetchData();
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // ===============================
  // SEGMENTS (CORRIGIDO AQUI)
  // ===============================

  const updateSegment = async (segment: Segment) => {
    const isNew = !data.segments.some(
      (s) => s.segment_id === segment.segment_id
    );

    const url = isNew
      ? `${API_URL}/admin/segments`
      : `${API_URL}/admin/segments/${segment.segment_id}`;

    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(segment)
    });

    if (!res.ok) throw new Error('Erro ao salvar segmento');

    await refreshData();
  };

  const deleteSegment = async (id: string) => {
    const res = await fetch(`${API_URL}/admin/segments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    if (!res.ok) throw new Error('Erro ao excluir segmento');

    await refreshData();
  };

  // ===============================
  // RESTO DO SISTEMA (INALTERADO)
  // ===============================

  const updateContent = async (updates: SiteContent) => {
    const res = await fetch(`${API_URL}/admin/content`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Erro ao atualizar conteúdo');
    await refreshData();
  };

  const updateSettings = async (updates: Record<string, string>) => {
    const res = await fetch(`${API_URL}/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Erro ao atualizar configurações');
    await refreshData();
  };

  const updateSolution = async (solution: Solution) => {
    const res = await fetch(`${API_URL}/admin/solutions/${solution.solution_id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(solution)
    });
    if (!res.ok) throw new Error('Erro ao atualizar solução');
    await refreshData();
  };

  const deleteSolution = async (id: string) => {
    const res = await fetch(`${API_URL}/admin/solutions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Erro ao excluir solução');
    await refreshData();
  };

  const addStat = async (stat: NumberStat) => {
    const res = await fetch(`${API_URL}/admin/stats`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(stat)
    });
    if (!res.ok) throw new Error('Erro ao adicionar estatística');
    await refreshData();
  };

  const updateStat = async (stat: NumberStat) => {
    const res = await fetch(`${API_URL}/admin/stats/${stat.stat_id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(stat)
    });
    if (!res.ok) throw new Error('Erro ao atualizar estatística');
    await refreshData();
  };

  const deleteStat = async (id: string) => {
    const res = await fetch(`${API_URL}/admin/stats/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Erro ao excluir estatística');
    await refreshData();
  };

  const addBanner = async (banner: Banner) => {
    const res = await fetch(`${API_URL}/admin/banners`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(banner)
    });
    if (!res.ok) throw new Error('Erro ao adicionar banner');
    await refreshData();
  };

  const updateBanner = async (banner: Banner) => {
    const res = await fetch(`${API_URL}/admin/banners/${banner.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(banner)
    });
    if (!res.ok) throw new Error('Erro ao atualizar banner');
    await refreshData();
  };

  const deleteBanner = async (id: number) => {
    const res = await fetch(`${API_URL}/admin/banners/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Erro ao excluir banner');
    await refreshData();
  };

  const getBannersByPage = (page: string): Banner[] => {
    return data.banners.filter(b => (b.page || 'home') === page);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_URL}/admin/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData
    });

    if (!res.ok) throw new Error('Erro ao fazer upload');

    const data = await res.json();
    return data.url;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{
      data,
      loading,
      error,
      refreshData,
      updateContent,
      updateSettings,
      updateSolution,
      deleteSolution,
      updateSegment,
      deleteSegment,
      addStat,
      updateStat,
      deleteStat,
      addBanner,
      updateBanner,
      deleteBanner,
      getBannersByPage,
      uploadImage
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}