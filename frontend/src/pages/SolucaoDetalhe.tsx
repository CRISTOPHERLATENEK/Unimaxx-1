import { useParams, Link } from 'react-router-dom';
import { 
  Store, ShoppingCart, Globe, CreditCard, Truck, BarChart3,
  CheckCircle2, ArrowRight, Phone, Play, Star, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function SolucaoDetalhe() {
  const { id } = useParams<{ id: string }>();

  const solucoes: Record<string, any> = {
    erp: {
      titulo: 'Maxx ERP',
      subtitulo: 'Seus Sistema ERP Completo',
      descricao: 'Simplifique a sua empresa com o Maxx Gestão.',
      icon: <Store size={64} />,
      cor: 'from-blue-500 to-blue-600',
      imagem: '🏢',
      features: [
        'Gestão financeira completa com contas a pagar e receber',
        'Controle de estoque em tempo real com alertas automáticos',
        'Módulo fiscal integrado com todas as obrigações',
        'Gestão de compras e cotações com fornecedores',
        'Relatórios gerenciais personalizáveis',
        'Integração com marketplaces e e-commerce'
      ],
      beneficios: [
        { numero: '30%', texto: 'Redução nos custos operacionais' },
        { numero: '25%', texto: 'Aumento na produtividade' },
        { numero: '50%', texto: 'Menos tempo em tarefas manuais' },
      ],
      depoimento: {
        texto: 'O Linx ERP transformou completamente nossa gestão. Conseguimos ter visibilidade total do nosso negócio e tomar decisões muito mais rápidas.',
        autor: 'Maria Silva',
        cargo: 'Diretora Financeira',
        empresa: 'Moda Express'
      },
      planos: [
        { nome: 'Essencial', preco: 'R$ 299', periodo: '/mês', descricao: 'Ideal para pequenas empresas' },
        { nome: 'Profissional', preco: 'R$ 599', periodo: '/mês', descricao: 'Para empresas em crescimento', destaque: true },
        { nome: 'Enterprise', preco: 'Sob consulta', periodo: '', descricao: 'Para grandes operações' },
      ]
    },
    pdv: {
      titulo: 'Maxx PDV',
      subtitulo: 'Ponto de Venda Moderno',
      descricao: 'O Linx PDV é um sistema de ponto de venda rápido, intuitivo e completo. Projetado para acelerar o atendimento, reduzir filas e aumentar a satisfação dos seus clientes.',
      icon: <ShoppingCart size={64} />,
      cor: 'from-green-500 to-green-600',
      imagem: '🛒',
      features: [
        'Venda rápida com atalhos inteligentes e touch',
        'Múltiplas formas de pagamento incluindo Pix',
        'Programa de fidelização integrado',
        'Funcionamento offline sem interrupções',
        'Gestão de promoções e descontos automáticos',
        'Integração nativa com TEF'
      ],
      beneficios: [
        { numero: '40%', texto: 'Atendimento mais rápido' },
        { numero: '60%', texto: 'Redução de filas' },
        { numero: '35%', texto: 'Aumento na satisfação' },
      ],
      depoimento: {
        texto: 'Desde que implementamos o Linx PDV, nossos caixas ficaram muito mais ágeis. O atendimento melhorou e nossos clientes notaram a diferença.',
        autor: 'João Santos',
        cargo: 'Gerente de Loja',
        empresa: 'Supermercados Bom Preço'
      },
      planos: [
        { nome: 'Básico', preco: 'R$ 99', periodo: '/mês', descricao: '1 caixa' },
        { nome: 'Plus', preco: 'R$ 199', periodo: '/mês', descricao: 'Até 3 caixas', destaque: true },
        { nome: 'Pro', preco: 'R$ 399', periodo: '/mês', descricao: 'Caixas ilimitados' },
      ]
    },
    // commerce: {
    //   titulo: 'Linx Commerce',
    //   subtitulo: 'E-commerce Completo',
    //   descricao: 'O Linx Commerce é uma plataforma de e-commerce robusta e escalável para vender online com a mesma eficiência da loja física. Integração total omnichannel.',
    //   icon: <Globe size={64} />,
    //   cor: 'from-purple-500 to-purple-600',
    //   imagem: '🌐',
    //   features: [
    //     'Loja virtual personalizável e responsiva',
    //     'Integração com marketplaces (Amazon, Mercado Livre)',
    //     'Gestão omnichannel unificada',
    //     'App mobile nativo para iOS e Android',
    //     'SEO otimizado para melhor ranqueamento',
    //     'Checkout transparente e one-click buy'
    //   ],
    //   beneficios: [
    //     { numero: '50%', texto: 'Aumento nas vendas online' },
    //     { numero: '3x', texto: 'Mais conversão' },
    //     { numero: '70%', texto: 'Menos abandono de carrinho' },
    //   ],
    //   depoimento: {
    //     texto: 'A integração entre nossa loja física e online ficou perfeita. O Linx Commerce nos deu a ferramenta que precisávamos para crescer no digital.',
    //     autor: 'Ana Costa',
    //     cargo: 'E-commerce Manager',
    //     empresa: 'Fashion Store'
    //   },
    //   planos: [
    //     { nome: 'Start', preco: 'R$ 199', periodo: '/mês', descricao: 'Até 500 produtos' },
    //     { nome: 'Business', preco: 'R$ 499', periodo: '/mês', descricao: 'Produtos ilimitados', destaque: true },
    //     { nome: 'Enterprise', preco: 'Sob consulta', periodo: '', descricao: 'Personalizado' },
    //   ]
    // },
    pay: {
      titulo: 'TEF ',
      subtitulo: 'Soluções de Pagamento',
      descricao: 'O Linx Pay é um ecossistema completo de pagamentos integrado ao seu negócio. Aceite todas as formas de pagamento com segurança, praticidade e taxas competitivas.',
      icon: <CreditCard size={64} />,
      cor: 'from-orange-500 to-orange-600',
      imagem: '💳',
      features: [
        'TEF integrado diretamente ao PDV',
        'Maquininhas de cartão modernas',
        'Split de pagamentos automático',
        'Antecipação de recebíveis',
        'Link de pagamento para vendas online',
        'Pix integrado com QR Code'
      ],
      beneficios: [
        { numero: 'D+1', texto: 'Recebimento rápido' },
        { numero: '30%', texto: 'Taxas reduzidas' },
        { numero: '100%', texto: 'Conciliação automática' },
      ],
      depoimento: {
        texto: 'As taxas do Linx Pay são muito competitivas e a conciliação automática nos economiza horas de trabalho todo mês.',
        autor: 'Pedro Lima',
        cargo: 'Proprietário',
        empresa: 'Loja do Pedro'
      },
      planos: [
        { nome: 'Pay Start', preco: '2,5%', periodo: '/transação', descricao: 'Sem mensalidade' },
        { nome: 'Pay Pro', preco: '1,99%', periodo: '/transação', descricao: 'R$ 49/mês', destaque: true },
        { nome: 'Pay Enterprise', preco: 'Sob consulta', periodo: '', descricao: 'Volume alto' },
      ]
    },
    delivery: {
      titulo: 'Maxx Delivery',
      subtitulo: 'Gestão de Entregas',
      descricao: 'O Linx Delivery é um sistema completo para gestão de entregas e logística. Otimize rotas, acompanhe em tempo real e integre com os principais apps de delivery.',
      icon: <Truck size={64} />,
      cor: 'from-red-500 to-red-600',
      imagem: '🚚',
      features: [
        'Roteirização inteligente com otimização',
        'Rastreamento de entregas em tempo real',
        'Integração nativa com iFood e outros',
        'App do entregador com GPS',
        'Gestão completa de frota',
        'Provas de entrega com foto e assinatura'
      ],
      beneficios: [
        { numero: '35%', texto: 'Redução nos custos' },
        { numero: '25%', texto: 'Entregas mais rápidas' },
        { numero: '90%', texto: 'Satisfação do cliente' },
      ],
      depoimento: {
        texto: 'A roteirização inteligente do Linx Delivery reduziu nossos custos de entrega em mais de 30%. Uma ferramenta indispensável.',
        autor: 'Carlos Mendes',
        cargo: 'Gerente de Logística',
        empresa: 'Restaurante Sabor Caseiro'
      },
      planos: [
        { nome: 'Delivery Start', preco: 'R$ 149', periodo: '/mês', descricao: 'Até 500 entregas' },
        { nome: 'Delivery Pro', preco: 'R$ 299', periodo: '/mês', descricao: 'Entregas ilimitadas', destaque: true },
        { nome: 'Delivery Enterprise', preco: 'Sob consulta', periodo: '', descricao: 'Frota própria' },
      ]
    },
    bi: {
      titulo: 'Maxx Notas',
      subtitulo: 'Inteligência de Negócio',
      descricao: 'O Linx BI é uma ferramenta de Business Intelligence poderosa para transformar dados em insights acionáveis. Dashboards intuitivos e relatórios em tempo real.',
      icon: <BarChart3 size={64} />,
      cor: 'from-cyan-500 to-cyan-600',
      imagem: '📊',
      features: [
        'Dashboards personalizáveis e interativos',
        'Relatórios em tempo real atualizados',
        'Análise preditiva com machine learning',
        'KPIs e indicadores customizáveis',
        'Exportação de dados em múltiplos formatos',
        'Alertas automáticos por e-mail'
      ],
      beneficios: [
        { numero: '5x', texto: 'Mais rapidez nas decisões' },
        { numero: '40%', texto: 'Identificação de oportunidades' },
        { numero: '100%', texto: 'Visibilidade do negócio' },
      ],
      depoimento: {
        texto: 'O Linx BI nos deu visibilidade total do nosso negócio. Agora tomamos decisões baseadas em dados, não em achismos.',
        autor: 'Fernanda Oliveira',
        cargo: 'CEO',
        empresa: 'Grupo Oliveira'
      },
      planos: [
        { nome: 'BI Start', preco: 'R$ 199', periodo: '/mês', descricao: '5 usuários' },
        { nome: 'BI Pro', preco: 'R$ 499', periodo: '/mês', descricao: 'Usuários ilimitados', destaque: true },
        { nome: 'BI Enterprise', preco: 'Sob consulta', periodo: '', descricao: 'Customizado' },
      ]
    },
  };

  const solucao = id ? solucoes[id] : null;

  if (!solucao) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solução não encontrada</h1>
          <Link to="/solucoes">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Ver todas as soluções
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Hero estático (fallback quando não há banner cadastrado no admin para esta solução)
  const heroFallback = (
    <section className={`relative py-32 overflow-hidden bg-gradient-to-br ${solucao.cor}`}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              <Zap size={16} />
              <span>Solução Linx</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {solucao.titulo}
            </h1>
            <p className="text-xl text-white/80 mb-4">{solucao.subtitulo}</p>
            <p className="text-lg text-white/70 mb-8">{solucao.descricao}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cliente">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                  <Phone className="mr-2" size={20} />
                  Falar com Especialista
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                <Play className="mr-2" size={20} />
                Ver Demonstração
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="text-[200px] leading-none">{solucao.imagem}</div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page={`solucao-${id}`} fallback={heroFallback} />

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Funcionalidades
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você <span className="text-orange-500">precisa</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucao.features.map((feature: string, index: number) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Resultados <span className="linx-gradient-text">comprovados</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solucao.beneficios.map((beneficio: any, index: number) => (
              <div key={index} className="glass rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">{beneficio.numero}</div>
                <div className="text-white">{beneficio.texto}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-orange-500 fill-orange-500" size={24} />
              ))}
            </div>
            <blockquote className="text-2xl text-gray-700 italic mb-8">
              "{solucao.depoimento.texto}"
            </blockquote>
            <div>
              <p className="font-bold text-gray-900">{solucao.depoimento.autor}</p>
              <p className="text-gray-600">{solucao.depoimento.cargo}</p>
              <p className="text-orange-500">{solucao.depoimento.empresa}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Planos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano <span className="text-orange-500">ideal</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solucao.planos.map((plano: any, index: number) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 ${plano.destaque ? 'ring-2 ring-orange-500 shadow-xl' : 'shadow-sm'} hover:shadow-lg transition-all`}
              >
                {plano.destaque && (
                  <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium mb-4">
                    Mais Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plano.nome}</h3>
                <p className="text-gray-600 text-sm mb-4">{plano.descricao}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plano.preco}</span>
                  <span className="text-gray-500">{plano.periodo}</span>
                </div>
                <Link to="/cliente">
                  <Button 
                    className={`w-full ${plano.destaque ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Começar Agora
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para transformar seu <span className="linx-gradient-text">negócio</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Fale com um de nossos especialistas e descubra como o {solucao.titulo} pode ajudar.
          </p>
          <Link to="/cliente">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Agendar Demonstração
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SolucaoDetalhe;
