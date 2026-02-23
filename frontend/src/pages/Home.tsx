import { useEffect, useState } from 'react';
import { 
  ChevronRight, Phone, Users, Building2, Globe, 
  ShoppingCart, BarChart3, Zap, 
  ArrowRight, CheckCircle2, Store, Truck, CreditCard,
  MessageSquare, Mail, MapPin, Clock, TrendingUp,
  Award, Target, Cpu, Wallet, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = ['solucoes', 'numeros', 'segmentos', 'diferenciais', 'contato'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSolutionClick = (title: string, description: string) => {
    setDialogContent({ title, description });
    setShowDialog(true);
  };

  const solutions = [
    {
      icon: <Store size={32} />,
      title: 'Linx ERP',
      description: 'Sistema completo de gestão empresarial para varejo de todos os segmentos. Integre todas as áreas do seu negócio.',
      features: ['Gestão financeira', 'Controle de estoque', 'Fiscal', 'Compras'],
      link: '/solucao/erp'
    },
    {
      icon: <ShoppingCart size={32} />,
      title: 'Linx PDV',
      description: 'Ponto de venda moderno e integrado para todas as operações. Rápido, seguro e fácil de usar.',
      features: ['Venda rápida', 'Múltiplas formas de pagamento', 'Fidelização', 'Offline'],
      link: '/solucao/pdv'
    },
    {
      icon: <Globe size={32} />,
      title: 'Linx Commerce',
      description: 'Plataforma completa de e-commerce para vender online. Integração total com lojas físicas.',
      features: ['Loja virtual', 'Marketplaces', 'Integração omnichannel', 'Mobile'],
      link: '/solucao/commerce'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Linx Pay',
      description: 'Soluções de pagamento integradas ao seu negócio. Aceite todas as formas de pagamento.',
      features: ['TEF', 'Maquininhas', 'Split de pagamentos', 'Antecipação'],
      link: '/solucao/pay'
    },
    {
      icon: <Truck size={32} />,
      title: 'Linx Delivery',
      description: 'Gestão completa de entregas e logística. Otimize suas rotas e entregas.',
      features: ['Roteirização', 'Rastreamento', 'Integração com iFood', 'App entregador'],
      link: '/solucao/delivery'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Linx BI',
      description: 'Business Intelligence para decisões baseadas em dados. Dashboards e relatórios em tempo real.',
      features: ['Dashboards', 'Relatórios', 'Análise preditiva', 'KPIs'],
      link: '/solucao/bi'
    },
  ];

  const segments = [
    { name: 'Moda e Acessórios', icon: '👕' },
    { name: 'Calçados', icon: '👟' },
    { name: 'Farmácia', icon: '💊' },
    { name: 'Perfumaria', icon: '✨' },
    { name: 'Restaurantes', icon: '🍽️' },
    { name: 'Fast Food', icon: '🍔' },
    { name: 'Delivery', icon: '🛵' },
    { name: 'Presentes', icon: '🎁' },
    { name: 'Magazines', icon: '📺' },
    { name: 'Ótica', icon: '👓' },
    { name: 'Casa e Decoração', icon: '🏠' },
    { name: 'Postos de Combustível', icon: '⛽' },
  ];

  const diferenciais = [
    { icon: <Award size={32} />, title: 'Líder de Mercado', desc: '45,6% de market share no Brasil' },
    { icon: <Target size={32} />, title: 'Foco no Cliente', desc: '97% de satisfação em atendimento' },
    { icon: <Cpu size={32} />, title: 'Inovação Constante', desc: '+180 soluções no portfólio' },
    { icon: <Wallet size={32} />, title: 'Ecossistema Completo', desc: 'Tudo em um só lugar' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center linx-purple overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-orange-400 text-sm font-medium mb-6 border border-white/10">
                <Zap size={16} className="animate-pulse" />
                <span>Líder em Tecnologia para Varejo</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Tem solução pra tudo,{' '}
                <span className="linx-gradient-text">tem Linx pra tudo</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
                De cada esquina às maiores redes varejistas, nós estamos lá. 
                Somos a resposta confiável que você precisa para prosperar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cliente">
                  <Button 
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all animate-pulse-glow"
                  >
                    <Phone className="mr-2" size={20} />
                    Receba uma Ligação
                  </Button>
                </Link>
                <Link to="/solucoes">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg transition-all"
                  >
                    Conheça as Soluções
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 flex-wrap">
                {[
                  { value: '60K+', label: 'Empresas' },
                  { value: '180+', label: 'Soluções' },
                  { value: '45%', label: 'Market Share' },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur-2xl opacity-30 transform rotate-6" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Store size={40} />, title: 'ERP', desc: 'Gestão Completa', link: '/solucao/erp' },
                      { icon: <ShoppingCart size={40} />, title: 'PDV', desc: 'Ponto de Venda', link: '/solucao/pdv' },
                      { icon: <Globe size={40} />, title: 'Digital', desc: 'E-commerce', link: '/solucao/commerce' },
                      { icon: <BarChart3 size={40} />, title: 'BI', desc: 'Inteligência', link: '/solucao/bi' },
                    ].map((item, index) => (
                      <Link key={index} to={item.link}>
                        <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-6 text-center transition-all hover:scale-105 cursor-pointer group">
                          <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                          <div className="text-white font-semibold">{item.title}</div>
                          <div className="text-gray-400 text-sm">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section 
        id="solucoes" 
        className={`py-24 bg-gray-50 transition-all duration-700 ${isVisible['solucoes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Nossas Soluções
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sim, nós temos o que seu{' '}
              <span className="text-orange-500">negócio precisa!</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A Linx possui mais de 50 soluções em ERP, PDV, digital, 
              autoatendimento, delivery e muito mais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Link key={index} to={solution.link}>
                <div 
                  className="bg-white rounded-2xl p-8 shadow-lg card-hover cursor-pointer group border border-gray-100 h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all duration-300">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 size={14} className="text-orange-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center text-orange-500 font-medium">
                    <span>Saiba mais</span>
                    <ArrowRight size={18} className="ml-1 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/solucoes">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Ver Todas as Soluções
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="numeros" 
        className={`py-24 linx-purple relative overflow-hidden transition-all duration-700 ${isVisible['numeros'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,107,53,0.2) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(147,51,234,0.2) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-4 border border-white/10">
              Nossos Números
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Mais de <span className="linx-gradient-text">60.000 empresas</span> confiam na Linx
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Toda essa experiência é o que nos torna líderes no mercado de softwares de gestão.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: '60K+', label: 'Empresas Atendidas', icon: <Building2 /> },
              { number: '4K+', label: 'Colaboradores', icon: <Users /> },
              { number: '17', label: 'Escritórios no Brasil', icon: <MapPin /> },
              { number: '16', label: 'Países na América', icon: <Globe /> },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '180+', label: 'Soluções no portfólio', icon: <Package /> },
              { value: '165K+', label: 'Lojas atendidas', icon: <Store /> },
              { value: '45,6%', label: 'Market Share (IDC)', icon: <TrendingUp /> },
            ].map((item, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all group">
                <div className="text-orange-500 mb-3 group-hover:scale-110 transition-transform flex justify-center">{item.icon}</div>
                <div className="text-3xl font-bold text-orange-500 mb-2">{item.value}</div>
                <div className="text-white">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section 
        id="segmentos" 
        className={`py-24 bg-white transition-all duration-700 ${isVisible['segmentos'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Segmentos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Atendemos <span className="text-orange-500">todos os segmentos</span> do varejo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluções especializadas para cada tipo de negócio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-orange-50 hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-orange-200"
                onClick={() => handleSolutionClick(segment.name, `Soluções especializadas para ${segment.name}`)}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                  {segment.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                  {segment.name}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/segmentos">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8">
                Ver Todos os Segmentos
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section 
        id="diferenciais" 
        className={`py-24 bg-gray-50 transition-all duration-700 ${isVisible['diferenciais'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Por que Linx?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-orange-500">diferenciais</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contato" 
        className={`py-24 bg-white transition-all duration-700 ${isVisible['contato'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                Contato
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Vamos <span className="text-orange-500">conversar?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Ligamos para você em até 1h. Fale sobre os desafios do seu negócio 
                e encontre a solução ideal.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Phone size={24} />, title: 'Telefone', info: '0800 770 3320' },
                  { icon: <Mail size={24} />, title: 'E-mail', info: 'contato@linx.com.br' },
                  { icon: <MapPin size={24} />, title: 'Endereço', info: 'Av. das Nações Unidas, 7221 - São Paulo, SP' },
                  { icon: <Clock size={24} />, title: 'Horário de Atendimento', info: 'Segunda a Sexta, 8h às 18h' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Receba uma ligação
              </h3>
              <form 
                className="space-y-5" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setShowDialog(true); 
                  setDialogContent({ 
                    title: 'Solicitação Enviada!', 
                    description: 'Em breve nossa equipe entrará em contato com você. Obrigado pelo interesse!' 
                  }); 
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <Input placeholder="Seu nome" className="w-full h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <Input placeholder="(00) 00000-0000" className="w-full h-12" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" className="w-full h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segmento</label>
                  <select className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Selecione seu segmento</option>
                    <option>Moda e Acessórios</option>
                    <option>Alimentação</option>
                    <option>Farmácia</option>
                    <option>Postos de Combustível</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <Textarea placeholder="Conte-nos sobre seu negócio" className="w-full min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all">
                  <MessageSquare className="mr-2" size={20} />
                  Solicitar Contato
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold">Linx</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Líder em tecnologia para o varejo. 
                Transformando complexidade em resultado desde 1985.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Soluções</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { name: 'Linx ERP', link: '/solucao/erp' },
                  { name: 'Linx PDV', link: '/solucao/pdv' },
                  { name: 'Linx Commerce', link: '/solucao/commerce' },
                  { name: 'Linx Pay', link: '/solucao/pay' },
                  { name: 'Linx Delivery', link: '/solucao/delivery' },
                  { name: 'Linx BI', link: '/solucao/bi' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} className="hover:text-orange-500 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Institucional</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { name: 'Sobre Nós', link: '/sobre' },
                  { name: 'Carreiras', link: '/carreiras' },
                  { name: 'Imprensa', link: '/imprensa' },
                  { name: 'Blog', link: '/blog' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} className="hover:text-orange-500 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Suporte</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { name: 'Central de Ajuda', link: '/suporte' },
                  { name: 'Área do Cliente', link: '/cliente' },
                  { name: 'Fale Conosco', link: '/cliente' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} className="hover:text-orange-500 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Linx Sistemas e Consultoria Ltda. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacidade" className="hover:text-orange-500 transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="hover:text-orange-500 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">{dialogContent.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-orange-500" size={32} />
            </div>
          </div>
          <Button 
            onClick={() => setShowDialog(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
