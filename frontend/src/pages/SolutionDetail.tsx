import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Shield, Headphones, TrendingUp,
  RefreshCw, AlertCircle, Package, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';
import { fetchSolutionPages } from '@/services/solutionPagesService';
import type { SolutionPage } from '@/types';

// Mapa de cores para temas
const colorMap: Record<string, string> = {
  orange: 'from-orange-500 to-orange-600',
  blue:   'from-blue-500 to-blue-600',
  green:  'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  black:  'from-gray-800 to-gray-900',
  white:  'from-gray-100 to-gray-200',
};

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace('/api', '');

function resolveImageUrl(path?: string): string | null {
  if (!path) return null;
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

// ── Estado de Loading ──
function LoadingState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-4 text-gray-400">
      <RefreshCw className="w-10 h-10 animate-spin text-orange-500" />
      <p className="text-lg">Carregando soluções...</p>
    </div>
  );
}

// ── Estado de Erro ──
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div>
        <p className="text-xl font-bold text-gray-800 mb-2">Erro ao carregar soluções</p>
        <p className="text-gray-500 text-sm max-w-md">{message}</p>
      </div>
      <Button onClick={onRetry} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
        <RefreshCw className="w-4 h-4 mr-2" />
        Tentar novamente
      </Button>
    </div>
  );
}

// ── Estado Vazio ──
function EmptyState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-xl font-bold text-gray-700">Nenhuma solução disponível</p>
      <p className="text-gray-500 text-sm">As soluções serão exibidas aqui quando cadastradas no painel.</p>
    </div>
  );
}

// ── Card de Solução ──
function SolutionCard({ page, index }: { page: SolutionPage; index: number }) {
  const gradient = colorMap[page.color_theme] || colorMap.orange;
  const isReversed = index % 2 === 1;
  const imageUrl = resolveImageUrl(page.hero_image);

  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? '' : ''}`}>
      {/* Conteúdo */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${gradient} rounded-full text-white text-sm font-medium mb-6`}>
          <Layers className="w-4 h-4" />
          <span>Solução</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{page.title}</h2>
        {page.subtitle && (
          <p className="text-xl text-orange-600 mb-4">{page.subtitle}</p>
        )}
        <p className="text-slate-600 mb-6">{page.description}</p>

        {page.features.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {page.features.slice(0, 6).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-orange-500 block" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        )}

        {page.benefits.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2 text-sm">Benefícios principais:</h4>
            <div className="flex flex-wrap gap-2">
              {page.benefits.slice(0, 3).map((b, i) => (
                <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link to={`/solucoes/${page.slug}`}>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Conheça a solução
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Visual */}
      <div className={`relative ${isReversed ? 'lg:order-1' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-20 transform rotate-3`} />
        <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={page.title}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className={`aspect-video flex items-center justify-center bg-gradient-to-br ${gradient} opacity-80`}>
              <Package className="w-20 h-20 text-white/60" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Componente Principal ──
export default function SolutionsPage() {
  const [pages, setPages] = useState<SolutionPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSolutionPages();
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []); // ✅ dependências corretas: array vazio = executa só na montagem

  const diferenciais = [
    { icon: <Zap size={24} />,         title: 'Implementação Rápida', desc: 'Comece a usar em poucos dias' },
    { icon: <Shield size={24} />,       title: 'Segurança',            desc: 'Dados protegidos e criptografados' },
    { icon: <Headphones size={24} />,   title: 'Suporte 24/7',         desc: 'Atendimento sempre que precisar' },
    { icon: <TrendingUp size={24} />,   title: 'Escalabilidade',       desc: 'Cresça sem limitações' },
  ];

  const heroFallback = (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6 border border-orange-500/30">
          Portfólio
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Nossas <span className="text-orange-400">Soluções</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Tecnologia completa para o seu negócio crescer.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageBanner page="solucoes" fallback={heroFallback} />

      {/* Diferenciais */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={loadPages} />}
          {!loading && !error && pages.length === 0 && <EmptyState />}
          {!loading && !error && pages.length > 0 && (
            <div className="space-y-24">
              {pages.map((page, index) => (
                <SolutionCard key={page.id} page={page} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {!loading && pages.length > 0 && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Encontre a <span className="text-orange-400">solução ideal</span> para seu negócio
                  </h2>
                  <p className="text-slate-400 text-base">
                    Nossos especialistas estão prontos para ajudar.
                  </p>
                </div>
                <div>
                  <Link to="/cliente">
                    <Button size="default" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-base font-semibold rounded-full">
                      Falar com um Especialista
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}