import { 
  Store, ShoppingCart, Globe, CreditCard, Truck, BarChart3,
  CheckCircle2, ArrowRight, Zap, Shield, Headphones, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Solucoes() {
  const solucoes = [
    {
      id: 'erp',
      icon: <Store size={48} />,
      title: 'Maxx ERP',
      subtitle: 'Gestão Empresarial Completa',
      description: 'Sistema integrado que conecta todas as áreas do seu negócio, desde o financeiro até o controle de estoque, proporcionando uma visão 360° da sua operação.',
      features: [
        'Gestão financeira completa',
        'Controle de estoque em tempo real',
        'Fiscal e tributário integrado',
        'Gestão de compras e fornecedores',
        'Relatórios gerenciais',
        'Integração com marketplaces'
      ],
      beneficios: ['Redução de 30% nos custos operacionais', 'Aumento de 25% na produtividade', 'Tomada de decisão mais rápida'],
      cor: 'from-orange-500 to-orange-600'
    },
    {
      id: 'pdv',
      icon: <ShoppingCart size={48} />,
      title: 'Maxx PDV',
      subtitle: 'Ponto de Venda Moderno',
      description: 'Sistema de ponto de venda rápido, intuitivo e completo. Projetado para acelerar o atendimento e aumentar a satisfação dos seus clientes.',
      features: [
        'Venda rápida com atalhos inteligentes',
        'Múltiplas formas de pagamento',
        'Programa de fidelização integrado',
        'Funcionamento offline',
        'Gestão de promoções e descontos',
        'Integração com TEF'
      ],
      beneficios: ['Atendimento 40% mais rápido', 'Redução de filas', 'Aumento da satisfação do cliente'],
      cor: 'from-amber-500 to-amber-600'
    },
    {
      id: 'pay',
      icon: <CreditCard size={48} />,
      title: 'TEF',
      subtitle: 'Soluções de Pagamento',
      description: 'Ecossistema completo de pagamentos integrado ao seu negócio. Aceite todas as formas de pagamento com segurança e praticidade.',
      features: [
        'TEF integrado ao PDV',
        'Maquininhas de cartão',
        'Split de pagamentos',
        'Antecipação de recebíveis',
        'Link de pagamento',
        'Pix integrado'
      ],
      beneficios: ['Taxas competitivas', 'Recebimento em D+1', 'Conciliação automática'],
      cor: 'from-orange-600 to-orange-700'
    },
    {
      id: 'delivery',
      icon: <Truck size={48} />,
      title: 'Maxx Delivery',
      subtitle: 'Gestão de Entregas',
      description: 'Sistema completo para gestão de entregas e logística. Otimize rotas, acompanhe em tempo real e integre com os principais apps.',
      features: [
        'Roteirização inteligente',
        'Rastreamento em tempo real',
        'Integração com iFood',
        'App do entregador',
        'Gestão de frota',
        'Provas de entrega'
      ],
      beneficios: ['Redução de 35% nos custos de entrega', 'Entregas mais rápidas', 'Maior satisfação do cliente'],
      cor: 'from-red-500 to-red-600'
    },
    {
      id: 'bi',
      icon: <BarChart3 size={48} />,
      title: 'Maxx Notas',
      subtitle: 'Inteligência de Negócio',
      description: 'Business Intelligence poderoso para transformar dados em insights acionáveis. Dashboards intuitivos e relatórios em tempo real.',
      features: [
        'Dashboards personalizáveis',
        'Relatórios em tempo real',
        'Análise preditiva',
        'KPIs e indicadores',
        'Exportação de dados',
        'Alertas automáticos'
      ],
      beneficios: ['Decisões baseadas em dados', 'Identificação de oportunidades', 'Previsão de tendências'],
      cor: 'from-orange-400 to-orange-500'
    },
  ];

  const diferenciais = [
    { icon: <Zap size={24} />, title: 'Implementação Rápida', desc: 'Comece a usar em poucos dias' },
    { icon: <Shield size={24} />, title: 'Segurança', desc: 'Dados protegidos e criptografados' },
    { icon: <Headphones size={24} />, title: 'Suporte 24/7', desc: 'Atendimento sempre que precisar' },
    { icon: <TrendingUp size={24} />, title: 'Escalabilidade', desc: 'Cresça sem limitações' },
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
          Portfólio
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Nossas <span className="text-orange-400">Soluções</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Mais de 180 soluções para atender todas as necessidades do varejo brasileiro.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="solucoes" fallback={heroFallback} />

      {/* Diferenciais */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções Detalhadas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {solucoes.map((solucao, index) => (
              <div key={solucao.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${solucao.cor} rounded-full text-white text-sm font-medium mb-6`}>
                    {solucao.icon}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{solucao.title}</h2>
                  <p className="text-xl text-orange-600 mb-4">{solucao.subtitle}</p>
                  <p className="text-slate-600 mb-6">{solucao.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {solucao.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-orange-600 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Benefícios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {solucao.beneficios.map((beneficio, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          {beneficio}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to={`/solucao/${solucao.id}`}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      Conheça o {solucao.title}
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </div>

                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${solucao.cor} rounded-3xl blur-2xl opacity-20 transform rotate-3`} />
                  <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <div className="aspect-video bg-slate-50 rounded-2xl shadow-inner flex items-center justify-center">
                      <div className={`text-transparent bg-clip-text bg-gradient-to-br ${solucao.cor}`}>
                        <div className="transform scale-150">{solucao.icon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  Encontre a <span className="text-orange-400">solução ideal</span> para seu negócio
                </h2>
                <p className="text-slate-400 text-base">
                  Nossos especialistas estão prontos para ajudar você a escolher a melhor solução.
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

export default Solucoes;