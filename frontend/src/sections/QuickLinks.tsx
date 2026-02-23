import { Building2, Monitor, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  Monitor,
  ShoppingCart,
  BarChart3,
};

export function QuickLinks() {
  const { data } = useData();
  const content = data.content;

  const links = [
    {
      id: content['quicklinks.0.id'] || 'erp',
      title: content['quicklinks.0.title'] || 'ERP',
      subtitle: content['quicklinks.0.subtitle'] || 'Gestão Completa',
      icon: 'Building2',
      color: 'from-blue-500 to-blue-600',
      href: '#solucoes'
    },
    {
      id: content['quicklinks.1.id'] || 'pdv',
      title: content['quicklinks.1.title'] || 'PDV',
      subtitle: content['quicklinks.1.subtitle'] || 'Ponto de Venda',
      icon: 'Monitor',
      color: 'from-green-500 to-green-600',
      href: '#solucoes'
    },
    {
      id: content['quicklinks.2.id'] || 'digital',
      title: content['quicklinks.2.title'] || 'Digital',
      subtitle: content['quicklinks.2.subtitle'] || 'E-commerce',
      icon: 'ShoppingCart',
      color: 'from-purple-500 to-purple-600',
      href: '#solucoes'
    },
    {
      id: content['quicklinks.3.id'] || 'bi',
      title: content['quicklinks.3.title'] || 'BI',
      subtitle: content['quicklinks.3.subtitle'] || 'Inteligência',
      icon: 'BarChart3',
      color: 'from-orange-500 to-orange-600',
      href: '#solucoes'
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white -mt-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || Building2;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.href)}
                className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 text-left"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} bg-gray-100 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                    {link.subtitle}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#00a8e8] group-hover:text-white transition-colors">
                    <span>Conhecer</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
