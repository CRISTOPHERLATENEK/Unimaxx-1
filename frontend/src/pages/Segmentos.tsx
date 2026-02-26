import { 
  Shirt, Footprints, Pill, Sparkles, UtensilsCrossed, 
  Sandwich, Bike, Gift, Tv, Glasses, Home, Fuel,
  ArrowRight, CheckCircle2, Store, TrendingUp, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Segmentos() {
  const segmentos = [
    {
      id: 'moda',
      icon: <Shirt size={40} />,
      emoji: '👕',
      nome: 'Moda e Acessórios',
      descricao: 'Soluções completas para lojas de roupas, acessórios e moda em geral.',
      solucoes: ['Gestão de coleções', 'Controle de tamanhos e cores', 'Promoções sazonais', 'Fidelização de clientes'],
      estatistica: '+2.500 lojas atendidas'
    },
    {
      id: 'calcados',
      icon: <Footprints size={40} />,
      emoji: '👟',
      nome: 'Calçados',
      descricao: 'Sistema especializado para lojas de calçados e acessórios.',
      solucoes: ['Grade de numeração', 'Gestão de pares', 'Troca facilitada', 'Controle de estoque'],
      estatistica: '+1.800 lojas atendidas'
    },
    {
      id: 'farmacia',
      icon: <Pill size={40} />,
      emoji: '💊',
      nome: 'Farmácia',
      descricao: 'Soluções específicas para o setor farmacêutico com todas as regulamentações.',
      solucoes: ['Controle de medicamentos', 'Receituário digital', 'PBM integrado', 'Rastreabilidade'],
      estatistica: '+3.200 farmácias'
    },
    {
      id: 'perfumaria',
      icon: <Sparkles size={40} />,
      emoji: '✨',
      nome: 'Perfumaria e Cosméticos',
      descricao: 'Sistema completo para perfumarias e lojas de cosméticos.',
      solucoes: ['Gestão de validade', 'Testers e amostras', 'Programa VIP', 'Kits e presentes'],
      estatistica: '+1.500 lojas atendidas'
    },
    {
      id: 'restaurantes',
      icon: <UtensilsCrossed size={40} />,
      emoji: '🍽️',
      nome: 'Bares e Restaurantes',
      descricao: 'Solução completa para food service com controle de mesas e comandas.',
      solucoes: ['Controle de mesas', 'Comanda digital', 'Split de conta', 'Delivery integrado'],
      estatistica: '+4.500 restaurantes'
    },
    {
      id: 'fastfood',
      icon: <Sandwich size={40} />,
      emoji: '🍔',
      nome: 'Fast Food',
      descricao: 'Sistema rápido e eficiente para operações de fast food.',
      solucoes: ['Pedido self-service', 'Painel de cozinha', 'Drive-thru', 'Combos e promoções'],
      estatistica: '+2.800 unidades'
    },
    {
      id: 'delivery',
      icon: <Bike size={40} />,
      emoji: '🛵',
      nome: 'Delivery',
      descricao: 'Gestão completa de operações de delivery e entregas.',
      solucoes: ['Integração iFood', 'Roteirização', 'App entregador', 'Rastreamento'],
      estatistica: '+5.000 operações'
    },
    {
      id: 'presentes',
      icon: <Gift size={40} />,
      emoji: '🎁',
      nome: 'Presentes e Produtos em Geral',
      descricao: 'Solução versátil para lojas de presentes e variedades.',
      solucoes: ['Embalagem para presente', 'Lista de casamento', 'Troca fácil', 'Controle de estoque'],
      estatistica: '+2.200 lojas atendidas'
    },
    {
      id: 'magazines',
      icon: <Tv size={40} />,
      emoji: '📺',
      nome: 'Magazines',
      descricao: 'Sistema robusto para lojas de eletrodomésticos e eletrônicos.',
      solucoes: ['Garantia estendida', 'Entrega agendada', 'Financiamento', 'Assistência técnica'],
      estatistica: '+1.600 lojas atendidas'
    },
    {
      id: 'otica',
      icon: <Glasses size={40} />,
      emoji: '👓',
      nome: 'Ótica',
      descricao: 'Solução especializada para óticas com controle de receitas.',
      solucoes: ['Receituário oftalmológico', 'Montagem de óculos', 'Planos de saúde', 'Agendamento'],
      estatistica: '+900 óticas atendidas'
    },
    {
      id: 'casa',
      icon: <Home size={40} />,
      emoji: '🏠',
      nome: 'Casa e Decoração',
      descricao: 'Sistema para lojas de móveis, decoração e utilidades domésticas.',
      solucoes: ['Entrega montada', 'Cálculo de frete', 'Cores e acabamentos', 'Montagem de ambientes'],
      estatistica: '+1.300 lojas atendidas'
    },
    {
      id: 'posto',
      icon: <Fuel size={40} />,
      emoji: '⛽',
      nome: 'Postos de Combustível',
      descricao: 'Solução integrada para postos de combustível e lojas de conveniência.',
      solucoes: ['Controle de bombas', 'Frota e convênios', 'Loja de conveniência', 'Abastecimento'],
      estatistica: '+2.100 postos atendidos'
    },
  ];

  const diferenciais = [
    { icon: <Store size={24} />, titulo: 'Solução Especializada', descricao: 'Cada segmento tem suas particularidades' },
    { icon: <TrendingUp size={24} />, titulo: 'Resultados Comprovados', descricao: 'Milhares de clientes satisfeitos' },
    { icon: <Users size={24} />, titulo: 'Suporte Especializado', descricao: 'Equipe conhece seu negócio' },
  ];

  // Hero estático (fallback quando não há banner cadastrado no admin)
  const heroFallback = (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6 border border-orange-500/30">
          Segmentos
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Atendemos <span className="text-orange-400">todos os segmentos</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Soluções especializadas para cada tipo de negócio do varejo brasileiro.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="segmentos" fallback={heroFallback} />

      {/* Diferenciais */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {diferenciais.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 shadow-sm text-center border border-slate-200">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.titulo}</h3>
                <p className="text-slate-600 text-sm">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segmentos Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Escolha seu <span className="text-orange-600">segmento</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Temos a solução perfeita para o seu tipo de negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {segmentos.map((segmento) => (
              <div key={segmento.id} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all group border border-slate-200 hover:border-orange-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{segmento.emoji}</div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {segmento.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {segmento.nome}
                </h3>
                <p className="text-slate-600 mb-4 text-sm">{segmento.descricao}</p>
                
                <div className="space-y-2 mb-4">
                  {segmento.solucoes.slice(0, 3).map((solucao, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={14} className="text-orange-600 flex-shrink-0" />
                      {solucao}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-semibold text-orange-600">{segmento.estatistica}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* CTA */}
{/* CTA */}
<section className="py-12 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-slate-900 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Não encontrou seu <span className="text-orange-400">segmento?</span>
          </h2>
          <p className="text-slate-400 text-base">
            Entre em contato conosco. Temos soluções para todos os tipos de negócio.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <Link to="/cliente">
            <Button size="default" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all">
              Falar com um Especialista
            </Button>
          </Link>
          <span className="text-slate-500 text-xs">*Atendimento personalizado</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}

export default Segmentos;