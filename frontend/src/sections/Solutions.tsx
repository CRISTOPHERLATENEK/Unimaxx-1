import { Building2, Monitor, ShoppingCart, CreditCard, Truck, BarChart3, ArrowRight, Check } from 'lucide-react';
import { useData } from '@/context/DataContext';

const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  Monitor,
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
};

export function Solutions() {
  const { data } = useData();
  const content = data.content;
  const solutions = data.solutions ? data.solutions.filter(s => s.active === 1) : [];
  const settings = data.settings || {};
  const primaryColor = settings.primary_color || '#00a8e8';

  return (
    <section id="solucoes" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {content['solutions.title'] || 'Nossas Soluções'}
          </h2>
          <p className="text-xl text-gray-600">
            <span className="font-semibold">{content['solutions.subtitle'] || 'Sim, nós temos o que seu'}</span>
            <br />
            <span className="font-semibold" style={{ color: primaryColor }}>{content['solutions.subtitle2'] || 'negócio precisa!'}</span>
          </p>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {content['solutions.description'] || 'A Linx possui mais de 50 soluções em ERP, PDV, digital, autoatendimento, delivery e muito mais.'}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => {
            const Icon = iconMap[solution.icon] || Building2;
            return (
              <div
                key={solution.solution_id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(to br, ${primaryColor}, ${settings.secondary_color || primaryColor})` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button 
                    className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all"
                    style={{ color: primaryColor }}
                  >
                    {solution.cta_text}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            {content['solutions.viewAll'] || 'Ver Todas as Soluções'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
