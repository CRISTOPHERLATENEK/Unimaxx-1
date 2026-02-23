import { Shirt, Footprints, Pill, Sparkles, UtensilsCrossed, Bike, Gift, Tv, Glasses, Home, Fuel, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

const iconMap: { [key: string]: React.ElementType } = {
  Shirt,
  Footprints,
  Pill,
  Sparkles,
  UtensilsCrossed,
  Bike,
  Gift,
  Tv,
  Glasses,
  Home,
  Fuel,
};

export function Segments() {
  const { data } = useData();
  const content = data.content || {};
  const settings = data.settings || {};
  const primaryColor = settings.primary_color || '#f97316'; // laranja padrão

  // 🔥 CORREÇÃO AQUI
  const segments = (data.segments || [])
    .filter((s) => Number(s.active) === 1)
    .sort((a, b) => a.order_num - b.order_num);

  if (!segments.length) return null;

  return (
    <section id="segmentos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {content['segments.title'] || 'Atendemos'}
          </h2>

          <p className="text-4xl sm:text-5xl font-bold" style={{ color: primaryColor }}>
            {content['segments.subtitle'] || 'todos os segmentos'}
          </p>

          <p className="text-2xl font-bold text-gray-900">
            {content['segments.subtitle2'] || 'do varejo'}
          </p>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {content['segments.description'] || 'Soluções especializadas para cada tipo de negócio.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {segments.map((segment) => {
            const Icon = iconMap[segment.icon] || Shirt;

            return (
              <button
                key={segment.segment_id}
                className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center mb-3 transition-colors">
                  <Icon
                    className="w-7 h-7 group-hover:text-white transition-colors"
                    style={{ color: primaryColor }}
                  />
                </div>

                <span className="text-sm font-medium text-gray-700 group-hover:text-white text-center transition-colors">
                  {segment.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Botão */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-2 px-8 py-4 border-2 font-semibold rounded-lg hover:text-white transition-all"
            style={{ borderColor: primaryColor, color: primaryColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = primaryColor;
            }}
          >
            {content['segments.viewAll'] || 'Ver Todos os Segmentos'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}