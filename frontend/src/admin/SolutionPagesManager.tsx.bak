// src/admin/SolutionPagesManager.tsx - AJUSTADO DEFINITIVO

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Layout,
  Check,
  Building2,
  ShoppingCart,
  CreditCard,
  Truck,
  FileText,
  Package,
  Search,
  ExternalLink,
  RefreshCw,
  WifiOff
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface SolutionPage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  integrations: string[];
  hero_image?: string;
  icon: string;
  color_theme: 'orange' | 'black' | 'white';
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

export default function SolutionPagesManager() {
  const [pages, setPages] = useState<SolutionPage[]>([]);
  const [editingPage, setEditingPage] = useState<SolutionPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [backendError, setBackendError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setBackendError(false);

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/admin/solution-pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro na resposta');

      const data = await response.json();

      const parsed = data.map((page: any) => ({
        ...page,
        features:
          typeof page.features === 'string'
            ? JSON.parse(page.features)
            : page.features,
        benefits:
          typeof page.benefits === 'string'
            ? JSON.parse(page.benefits)
            : page.benefits,
        integrations:
          typeof page.integrations === 'string'
            ? JSON.parse(page.integrations)
            : page.integrations,
      }));

      setPages(parsed);
    } catch (error) {
      console.error('Erro ao buscar páginas:', error);
      setBackendError(true);

      toast({
        title: 'Backend indisponível',
        description:
          'Verifique se o servidor está rodando corretamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (pageData: any, id?: number) => {
    if (backendError) return;

    try {
      const token = localStorage.getItem('token');

      const url = id
        ? `${API_URL}/api/admin/solution-pages/${id}`
        : `${API_URL}/api/admin/solution-pages`;

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      toast({
        title: 'Sucesso!',
        description: 'Página salva com sucesso.',
      });

      fetchPages();
      setEditingPage(null);
      setIsCreating(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza?')) return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${API_URL}/api/admin/solution-pages/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Erro ao excluir');

      toast({
        title: 'Excluído!',
        description: 'Página removida com sucesso.',
      });

      fetchPages();
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Carregando...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Páginas de Soluções
        </h2>

        <Button
          onClick={() => setIsCreating(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Nova Página
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pages
          .filter((p) =>
            p.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((page) => (
            <Card key={page.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">
                    {page.title}
                  </h3>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingPage(page)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  /solucoes/{page.slug}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}