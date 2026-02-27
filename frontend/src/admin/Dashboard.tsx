// src/admin/Dashboard.tsx - VERSÃO MELHORADA COM MAIS OPÇÕES

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Briefcase, Tags, BarChart3, Eye, ArrowRight,
  Image, Layers, HelpCircle, Settings, Zap, TrendingUp,
  Globe, Activity, Clock, ChevronRight, Star, Package,
  Monitor, ShoppingCart, Users, Layout, ExternalLink,
  RefreshCw, CheckCircle, AlertCircle, Info
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function Dashboard() {
  const { data, loading, refreshData } = useData();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [solutionPagesCount, setSolutionPagesCount] = useState(0);
  const [solutionPagesActive, setSolutionPagesActive] = useState(0);
  const [loadingExtra, setLoadingExtra] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, navigate]);

  // Atualizar relógio
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Buscar contagem de páginas de soluções
  useEffect(() => {
    const fetchSolutionPages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/admin/solution-pages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const pages = await res.json();
          setSolutionPagesCount(pages.length);
          setSolutionPagesActive(pages.filter((p: any) => p.is_active).length);
        }
      } catch {
        // silencioso
      } finally {
        setLoadingExtra(false);
      }
    };
    if (isAuthenticated) fetchSolutionPages();
  }, [isAuthenticated]);

  const totalBanners = data.banners?.length || 0;
  const activeBanners = data.banners?.filter((b: any) => b.active === 1).length || 0;
  const activeSolutions = data.solutions.filter(s => s.active === 1).length;
  const activeSegments = data.segments.filter(s => s.active === 1).length;

  // Saudação
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  // ─── CARDS DE ESTATÍSTICAS ───
  const statsCards = [
    {
      title: 'Soluções Ativas',
      value: activeSolutions,
      total: data.solutions.length,
      icon: Briefcase,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/admin/solucoes',
      trend: '+0 hoje',
    },
    {
      title: 'Segmentos',
      value: activeSegments,
      total: data.segments.length,
      icon: Tags,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/admin/segmentos',
      trend: 'Ativos',
    },
    {
      title: 'Estatísticas',
      value: data.stats.length,
      total: data.stats.length,
      icon: BarChart3,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/admin/estatisticas',
      trend: 'Indicadores',
    },
    {
      title: 'Itens de Conteúdo',
      value: Object.keys(data.content).length,
      total: Object.keys(data.content).length,
      icon: FileText,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/admin/conteudo',
      trend: 'Textos do site',
    },
    {
      title: 'Banners / Carrossel',
      value: activeBanners,
      total: totalBanners,
      icon: Image,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      link: '/admin/banners',
      trend: `${totalBanners - activeBanners} inativos`,
    },
    {
      title: 'Págs. de Soluções',
      value: solutionPagesActive,
      total: solutionPagesCount,
      icon: Layers,
      color: 'bg-cyan-500',
      lightColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      link: '/admin/paginas-solucoes',
      trend: `${solutionPagesCount - solutionPagesActive} inativas`,
    },
  ];

  // ─── AÇÕES RÁPIDAS ───
  const quickActions = [
    {
      title: 'Editar Conteúdo',
      description: 'Textos, títulos e informações do site',
      icon: FileText,
      link: '/admin/conteudo',
      color: 'text-blue-600 bg-blue-50 group-hover:bg-blue-100',
      badge: null,
    },
    {
      title: 'Gerenciar Soluções',
      description: 'Adicione e edite soluções do site',
      icon: Briefcase,
      link: '/admin/solucoes',
      color: 'text-green-600 bg-green-50 group-hover:bg-green-100',
      badge: String(activeSolutions),
    },
    {
      title: 'Págs. de Soluções',
      description: 'Páginas completas com imagens e conteúdo',
      icon: Layers,
      link: '/admin/paginas-solucoes',
      color: 'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-100',
      badge: solutionPagesCount > 0 ? String(solutionPagesCount) : null,
    },
    {
      title: 'Banners / Carrossel',
      description: 'Gerencie imagens das páginas',
      icon: Image,
      link: '/admin/banners',
      color: 'text-pink-600 bg-pink-50 group-hover:bg-pink-100',
      badge: totalBanners > 0 ? String(totalBanners) : null,
    },
    {
      title: 'Segmentos',
      description: 'Setores atendidos pela empresa',
      icon: Tags,
      link: '/admin/segmentos',
      color: 'text-purple-600 bg-purple-50 group-hover:bg-purple-100',
      badge: String(activeSegments),
    },
    {
      title: 'Estatísticas',
      description: 'Números e métricas do site',
      icon: BarChart3,
      link: '/admin/estatisticas',
      color: 'text-orange-600 bg-orange-50 group-hover:bg-orange-100',
      badge: String(data.stats.length),
    },
    {
      title: 'Links Rápidos',
      description: 'Acesso rápido para usuários do site',
      icon: Zap,
      link: '/admin/links-rapidos',
      color: 'text-yellow-600 bg-yellow-50 group-hover:bg-yellow-100',
      badge: null,
    },
    {
      title: 'Central de Ajuda',
      description: 'Artigos e categorias de suporte',
      icon: HelpCircle,
      link: '/admin/central-ajuda',
      color: 'text-teal-600 bg-teal-50 group-hover:bg-teal-100',
      badge: null,
    },
    {
      title: 'Configurações',
      description: 'Cores, perfil e configurações gerais',
      icon: Settings,
      link: '/admin/configuracoes',
      color: 'text-gray-600 bg-gray-50 group-hover:bg-gray-100',
      badge: null,
    },
  ];

  // ─── CHECKLIST DO SITE ───
  const checklist = [
    {
      label: 'Pelo menos 1 solução cadastrada',
      ok: data.solutions.length > 0,
    },
    {
      label: 'Pelo menos 1 segmento cadastrado',
      ok: data.segments.length > 0,
    },
    {
      label: 'Dados de contato preenchidos',
      ok: !!(data.content?.['contact.phone'] || data.content?.['contact.email']),
    },
    {
      label: 'Banner da página inicial criado',
      ok: (data.banners || []).some((b: any) => b.page === 'home' && b.active === 1),
    },
    {
      label: 'Páginas de soluções criadas',
      ok: solutionPagesCount > 0,
    },
    {
      label: 'Estatísticas configuradas',
      ok: data.stats.length > 0,
    },
  ];

  const checklistScore = checklist.filter(c => c.ok).length;
  const checklistPercent = Math.round((checklistScore / checklist.length) * 100);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-[#00a8e8] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Boas-vindas ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, {user?.name?.split(' ')[0] || 'Admin'}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Painel administrativo Unimaxx —{' '}
            {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={refreshData}
            className="text-gray-600 border-gray-200">
            <RefreshCw className="w-4 h-4 mr-2" /> Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}
            className="text-[#00a8e8] border-[#00a8e8]/30 hover:bg-[#00a8e8] hover:text-white">
            <ExternalLink className="w-4 h-4 mr-2" /> Ver Site
          </Button>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}
              className="hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-[#00a8e8]/20"
              onClick={() => navigate(stat.link)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.title}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                      {stat.total !== stat.value && (
                        <p className="text-sm text-gray-400">/ {stat.total}</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-[#00a8e8] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Área de Conteúdo Principal ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Ações Rápidas (ocupa 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00a8e8]" />
            Ações Rápidas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.link)}
                  className="group text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-[#00a8e8]/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center transition-colors`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {action.badge && (
                      <Badge className="bg-[#00a8e8]/10 text-[#00a8e8] border-0 text-xs font-bold">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {action.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-[#00a8e8] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Acessar</span>
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checklist do Site */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00a8e8]" />
            Status do Site
          </h2>

          <Card className="border-2 border-gray-100">
            <CardContent className="p-5 space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Completude</span>
                  <span className={`text-sm font-bold ${
                    checklistPercent >= 100 ? 'text-green-600' :
                    checklistPercent >= 60  ? 'text-[#00a8e8]' :
                    'text-orange-500'
                  }`}>{checklistPercent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      checklistPercent >= 100 ? 'bg-green-500' :
                      checklistPercent >= 60  ? 'bg-[#00a8e8]' :
                      'bg-orange-400'
                    }`}
                    style={{ width: `${checklistPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {checklistScore} de {checklist.length} itens concluídos
                </p>
              </div>

              <div className="space-y-2.5">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.ok ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {item.ok ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className={`text-xs leading-snug ${
                      item.ok ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card de acesso ao site */}
          <Card className="bg-gradient-to-br from-[#00a8e8] to-[#0077aa] border-0 text-white">
            <CardContent className="p-5">
              <Globe className="w-8 h-8 text-white/70 mb-3" />
              <h3 className="font-bold text-lg mb-1">Visualizar Site</h3>
              <p className="text-white/70 text-sm mb-4">
                Veja como está aparecendo para os visitantes
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-[#00a8e8] hover:bg-gray-50 font-semibold"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" /> Abrir Site
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Acesso rápido às soluções ── */}
      {data.solutions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#00a8e8]" />
              Soluções Cadastradas
            </h2>
            <Button variant="ghost" size="sm" className="text-[#00a8e8]" onClick={() => navigate('/admin/solucoes')}>
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.solutions.slice(0, 8).map((solution) => (
              <div key={solution.solution_id}
                className={`flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#00a8e8]/30 hover:shadow-sm transition-all cursor-pointer ${
                  solution.active === 0 ? 'opacity-50' : ''
                }`}
                onClick={() => navigate('/admin/solucoes')}>
                <div className="w-8 h-8 rounded-lg bg-[#00a8e8]/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-[#00a8e8]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{solution.title}</p>
                  <p className="text-xs text-gray-400">{solution.features?.length || 0} recursos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
