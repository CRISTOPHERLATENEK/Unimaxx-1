import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { ReactNode } from 'react';

interface PageBannerProps {
  /** Identificador da página para buscar banners (ex: 'solucoes', 'solucao-erp', 'segmentos') */
  page: string;
  /** Conteúdo padrão exibido quando não há banners cadastrados para a página */
  fallback?: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BASE_URL = API_URL.replace('/api', '');

/**
 * Componente de banner dinâmico para páginas internas.
 * Exibe banners cadastrados no admin para a página especificada.
 * Se não houver banners, exibe o conteúdo fallback (hero estático original).
 */
export function PageBanner({ page, fallback }: PageBannerProps) {
  const { getBannersByPage } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = getBannersByPage(page);

  // Auto-avanço dos slides a cada 5 segundos
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Se não houver banners cadastrados, exibe o fallback (hero estático)
  if (banners.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <section className="relative bg-gray-900 pt-16 overflow-hidden" style={{ minHeight: '420px' }}>
      <div className="relative h-full" style={{ minHeight: '420px' }}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Fundo do Banner: Imagem ou Cor Sólida com Textura */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: banner.use_default_bg === 1 ? (banner.bg_color || '#00a8e8') : 'transparent'
              }}
            >
              {banner.use_default_bg === 1 ? (
                <>
                  {/* Textura de Grade */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                  {/* Gradiente para profundidade */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
                </>
              ) : (
                banner.image && (
                  <img
                    src={banner.image.startsWith('http') ? banner.image : `${BASE_URL}${banner.image}`}
                    alt={banner.title || ''}
                    className="w-full h-full object-cover"
                  />
                )
              )}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Conteúdo do Banner */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-24">
              <div className="max-w-2xl text-white">
                {banner.subtitle && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{banner.subtitle}</span>
                  </div>
                )}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-lg text-white/90 mb-8 drop-shadow-md">
                  {banner.description}
                </p>
                {banner.cta_text && (
                  <a
                    href={banner.cta_link || '#'}
                    className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: banner.use_default_bg === 1 ? '#fff' : '#00a8e8',
                      color: banner.use_default_bg === 1 ? (banner.bg_color || '#00a8e8') : '#fff'
                    }}
                  >
                    {banner.cta_text}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setas de Navegação */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores (Bolinhas) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
