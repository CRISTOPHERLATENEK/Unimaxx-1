import { Trophy, Heart, Lightbulb, Puzzle } from 'lucide-react';
import { useData } from '@/context/DataContext';

const differentials = [
  {
    icon: Trophy,
    title: 'Líder de Mercado',
    description: '45,6% de market share no Brasil'
  },
  {
    icon: Heart,
    title: 'Foco no Cliente',
    description: '97% de satisfação em atendimento'
  },
  {
    icon: Lightbulb,
    title: 'Inovação Constante',
    description: '+180 soluções no portfólio'
  },
  {
    icon: Puzzle,
    title: 'Ecossistema Completo',
    description: 'Tudo em um só lugar'
  }
];

export function Differentials() {
  const { data } = useData();
  const content = data.content;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {content['differentials.title'] || 'Por que Linx?'}
          </h2>
          <p className="text-4xl sm:text-5xl font-bold text-[#00a8e8]">
            {content['differentials.subtitle'] || 'Nossos'}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {content['differentials.subtitle2'] || 'diferenciais'}
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00a8e8] to-[#0077aa] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {diff.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {diff.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
