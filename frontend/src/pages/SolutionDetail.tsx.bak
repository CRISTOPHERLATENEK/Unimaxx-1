// src/pages/SolutionDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  Building2, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  FileText,
  Package,
  Zap,
  Shield,
  TrendingUp,
  ChevronRight,
  Play,
  Star,
  Users,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { SolutionPage } from '@/types/solution-page';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ShoppingCart,
  CreditCard,
  Truck,
  FileText,
  Package,
};

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<SolutionPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/solution-pages/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPage(data);
      } else {
        navigate('/solucoes');
      }
    } catch (error) {
      console.error('Error fetching solution page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"></div>
      </div>
    );
  }

  if (!page) return null;

  const IconComponent = iconMap[page.icon] || Building2;
  const themeColor = page.color_theme === 'orange' ? 'orange' : page.color_theme === 'black' ? 'black' : 'gray';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Gradiente Laranja para Preto */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-black text-white overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-orange-100 mb-8 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/solucoes" className="hover:text-white transition-colors">Soluções</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-semibold">{page.title}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide uppercase">Solução Unimaxx</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {page.title}
                </h1>
                <p className="text-2xl text-orange-100 mb-6 font-light">
                  {page.subtitle}
                </p>
                <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
                  {page.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    Solicitar Demonstração
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 text-lg backdrop-blur-sm"
                  >
                    <Play className="mr-2 w-5 h-5" /> Ver Vídeo
                  </Button>
                </div>

                {/* Stats rápidas */}
                <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
                  <div>
                    <div className="text-3xl font-bold">+500</div>
                    <div className="text-orange-200 text-sm">Clientes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">99.9%</div>
                    <div className="text-orange-200 text-sm">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-orange-200 text-sm">Suporte</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                {page.hero_image ? (
                  <img 
                    src={page.hero_image} 
                    alt={page.title}
                    className="rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <div className="aspect-square flex items-center justify-center">
                      <IconComponent className="w-48 h-48 text-white/30" />
                    </div>
                  </div>
                )}
                {/* Badge flutuante */}
                <div className="absolute -bottom-6 -left-6 bg-black text-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <span className="font-bold">4.9/5</span>
                    <span className="text-gray-400 text-sm">(127 avaliações)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator - CORRIGIDO: removi o espaço na URL */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mb-4 px-4 py-1 text-sm">
              Funcionalidades
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tudo que você precisa em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                um só lugar
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Recursos completos desenvolvidos para otimizar seus processos e aumentar sua produtividade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.features?.map((feature, index) => (
              <Card 
                key={index} 
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                    <Zap className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Funcionalidade integrada ao seu fluxo de trabalho para máxima eficiência e produtividade.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-orange-500 text-white mb-6 px-4 py-1">
                  Benefícios
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Por que escolher o{' '}
                  <span className="text-orange-500">{page.title}</span>?
                </h2>
                <p className="text-gray-400 text-xl mb-10">
                  Solução desenvolvida com foco em resultados reais para o seu negócio
                </p>
                
                <div className="space-y-6">
                  {page.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1 group-hover:text-orange-400 transition-colors">{benefit}</h4>
                        <p className="text-gray-500">
                          Resultado comprovado por centenas de clientes satisfeitos em todo o Brasil
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl transform rotate-3 opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors group">
                      <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-4xl font-bold text-white mb-1">+40%</div>
                      <div className="text-sm text-gray-400">Produtividade</div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors group">
                      <Shield className="w-10 h-10 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-4xl font-bold text-white mb-1">100%</div>
                      <div className="text-sm text-gray-400">Seguro</div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors group col-span-2">
                      <Users className="w-10 h-10 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-5xl font-bold text-orange-500 mb-2">+500</div>
                      <div className="text-lg text-gray-300">Empresas atendidas</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-orange-200">
                        Implementação em até 7 dias úteis
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-black text-white mb-4 px-4 py-1">
              Integrações
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Conecte com outras soluções
            </h2>
            <p className="text-xl text-gray-600">
              O {page.title} se integra perfeitamente com o ecossistema Unimaxx
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {page.integrations?.map((integration, index) => (
              <div 
                key={index}
                className="group px-8 py-4 bg-white rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="font-bold text-gray-800 text-lg">{integration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Precisa de uma integração personalizada?</p>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como o {page.title} pode ajudar sua empresa a crescer de forma inteligente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-900 font-bold px-10 text-lg shadow-2xl hover:shadow-black/50 transition-all hover:-translate-y-1"
            >
              Falar com Consultor
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-10 text-lg transition-all hover:-translate-y-1"
            >
              Ver Planos e Preços
            </Button>
          </div>
          
          <p className="mt-8 text-orange-200 text-sm">
            ✓ Teste gratuito por 14 dias ✓ Sem cartão de crédito ✓ Cancelamento fácil
          </p>
        </div>
      </section>

      {/* Navegação inferior */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/solucoes')}
            className="text-gray-600 hover:text-orange-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para todas as soluções
          </Button>
        </div>
      </div>
    </div>
  );
}