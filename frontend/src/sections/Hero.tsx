import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

export function Hero() {
  const { data } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const BASE_URL = API_URL.replace('/api', '');

  const banners = data.banners || [];

  // Efeito para passar os slides automaticamente a cada 5 segundos
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Se não houver banners cadastrados, não exibe nada (ou pode exibir um placeholder)
  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-screen bg-gray-900 pt-16 overflow-hidden">
      <div className="relative h-full min-h-screen">
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
                  {/* Textura de Grade do Print */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                  {/* Gradiente para dar profundidade */}
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
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
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
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#00a8e8] text-white font-bold rounded-lg hover:bg-[#0090c9] transition-all transform hover:scale-105 shadow-lg"
                    style={{ backgroundColor: banner.use_default_bg === 1 ? '#fff' : '#00a8e8', color: banner.use_default_bg === 1 ? (banner.bg_color || '#00a8e8') : '#fff' }}
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
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Onda na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
