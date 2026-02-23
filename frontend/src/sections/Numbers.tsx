import { useData } from '@/context/DataContext';

export function Numbers() {
  const { data } = useData();
  const content = data.content || {};
  const settings = data.settings || {};

  // Pega apenas estatísticas da seção "numbers"
  const stats = data.stats?.filter(
    (s) => s.section === 'numbers' || !s.section
  ) || [];

  // 🚨 Se não tiver nada no admin, NÃO RENDERIZA NADA
  if (!stats.length) {
    return null;
  }

  // Cores do painel (sem fallback visual hardcoded de números)
  const primaryColor = settings.primary_color || '#00a8e8';
  const secondaryColor = settings.secondary_color || '#0090c9';

  return (
    <section 
      id="numbers"
      className="py-24 relative overflow-hidden min-h-[600px] flex items-center"
      style={{ 
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` 
      }}
    >
      {/* Textura */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M0 38.59V40h1.41l1.1-1.11L1.41 37.78 0 38.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" )`,
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="text-center mb-16">
          {/* EXIBIÇÃO DO TÍTULO */}
          {content['stats.title'] && (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-sm">
              {content['stats.title']}
            </h2>
          )}

          {/* EXIBIÇÃO DO SUBTÍTULO */}
          {content['stats.subtitle'] && (
            <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
              {content['stats.subtitle']}
            </p>
          )}

          {/* EXIBIÇÃO DA DESCRIÇÃO */}
          {content['stats.description'] && (
            <p className="text-white/90 text-lg font-medium opacity-80">
              {content['stats.description']}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-12 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-3 flex flex-col justify-center items-center min-h-[240px] shadow-2xl shadow-black/10"
            >
              <div className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-white/70 font-bold text-sm uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
                {stat.label}
              </div>
            </div>
          ))}

          {stats.length === 5 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-12 hidden lg:flex min-h-[240px] opacity-30" />
          )}
        </div>
      </div>
    </section>
  );
}
