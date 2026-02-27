// frontend/src/services/solutionPagesService.ts

import type { SolutionPage } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Busca todas as páginas de soluções ativas (público, sem auth)
 */
export async function fetchSolutionPages(): Promise<SolutionPage[]> {
  const res = await fetch(`${API_URL}/solution-pages`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Erro ${res.status} ao buscar soluções`);
  }

  return res.json();
}

/**
 * Busca uma página de solução pelo slug (público, sem auth)
 */
export async function fetchSolutionPageBySlug(slug: string): Promise<SolutionPage> {
  const res = await fetch(`${API_URL}/solution-pages/${encodeURIComponent(slug)}`);

  if (res.status === 404) {
    throw new Error('Página de solução não encontrada');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Erro ${res.status} ao buscar solução`);
  }

  return res.json();
}