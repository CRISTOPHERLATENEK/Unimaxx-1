
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, Phone, Play, Star,
  RefreshCw, AlertCircle, ArrowLeft, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { fetchSolutionPageBySlug } from '@/services/solutionPagesService';
import type { SolutionPage } from '@/types';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace('/api', '');

function resolveImageUrl(path?: string): string | null {
  if (!path) return null;
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

const colorGradientMap: Record<string, string> = {
  orange: 'from-orange-500 to-orange-600',
  blue:   'from-blue-500 to-blue-600',
  green:  'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  black:  'from-gray-800 to-gray-900',
  white:  'from-gray-100 to-gray-200',
};

// ── Loading State ──
function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <RefreshCw className="w-12 h-12 animate-spin text-orange-500" />
        <p className="text-lg">Carregando solução...</p>
      </div>
    </div>
  );
}

// ── Error State ──
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {message.includes('não encontrada') ? 'Solução não encontrada' : 'Erro ao carregar'}
        </h1>
        <p className="text-gray-500 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button onClick={onRetry} className="bg-orange-500 hover:bg-orange-600 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
          <Link to="/solucoes">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver todas as soluções
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Componente Principal ──
export default function SolutionPageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SolutionPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = async () => {
    if (!slug) {
      setError('Slug da solução não informado');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSolutionPageBySlug(slug);
      setPage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect com slug como dependência: recarrega se a URL mudar
  useEffect(() => {
    loadPage();
  }, [slug]);

  // ── Head/SEO dinâmico ──
  useEffect(() => {
    if (page) {
      document.title = page.meta_title || `${page.title} | Unimaxx`;
    }
    return () => {
      document.title = 'Unimaxx';
    };
  }, [page]);

  if (loading) return <LoadingState />;
  if (error || !page) return (
    <>
      <Header />
      <ErrorState message={error || 'Solução não encontrada'} onRetry={loadPage} />
      <Footer />
    </>
  );

  const gradient = colorGradientMap[page.color_theme] || colorGradientMap.orange;
  const heroImageUrl = resolveImageUrl(page.hero_image);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className={`relative py-32 overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
                <Layers size={16} />
                <span>Solução Unimaxx</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {page.title}
              </h1>
              {page.subtitle && (
                <p className="text-xl text-white/80 mb-4">{page.subtitle}</p>
              )}
              <p className="text-lg text-white/70 mb-8">{page.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cliente">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                    <Phone className="mr-2" size={20} />
                    Falar com Especialista
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  <Play className="mr-2" size={20} />
                  Ver Demonstração
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt={page.title}
                  className="rounded-2xl shadow-2xl max-h-80 object-cover"
                />
              ) : (
                <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                  <Layers className="w-32 h-32 text-white/40" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ── */}
      {page.features.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Tudo que você <span className="text-orange-500">precisa</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BENEFÍCIOS ── */}
      {page.benefits.length > 0 && (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full"
              style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)` }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Resultados <span className="text-orange-400">comprovados</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {page.benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-3">
                    <Star className="text-orange-400 fill-orange-400" size={28} />
                  </div>
                  <p className="text-white text-lg font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INTEGRAÇÕES ── */}
      {page.integrations.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Ecossistema
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Integrações disponíveis</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {page.integrations.map((integration, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-orange-300 transition-colors">
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)` }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para transformar seu <span className="text-orange-400">negócio</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Fale com um especialista e descubra como o {page.title} pode ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cliente">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Agendar Demonstração
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/solucoes">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Ver todas as soluções
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}