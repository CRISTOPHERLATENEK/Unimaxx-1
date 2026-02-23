import { useEffect, useState } from 'react';
import { 
  Target, Eye, Award, Users, TrendingUp, Globe, 
  Building2, Heart, Lightbulb, Shield, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Sobre() {
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

    const sections = ['historia', 'valores', 'equipe', 'premios'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const valores = [
    {
      icon: <Heart size={32} />,
      title: 'Paixão pelo Cliente',
      description: 'Colocamos nossos clientes no centro de tudo o que fazemos. Seu sucesso é o nosso sucesso.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Inovação',
      description: 'Buscamos constantemente novas formas de resolver problemas e criar valor para o varejo.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Integridade',
      description: 'Agimos com ética, transparência e respeito em todas as nossas relações.'
    },
    {
      icon: <Users size={32} />,
      title: 'Colaboração',
      description: 'Trabalhamos juntos como um time, valorizando a diversidade e o trabalho em equipe.'
    },
  ];

  const timeline = [
    { year: '1985', title: 'Fundação', description: 'A Linx nasce em São Paulo com o objetivo de inovar no varejo brasileiro.' },
    { year: '1995', title: 'Expansão Nacional', description: 'Início da expansão para todo o território brasileiro.' },
    { year: '2005', title: 'Líder de Mercado', description: 'Consolidação como líder em software para varejo no Brasil.' },
    { year: '2013', title: 'IPO na Bovespa', description: 'Abertura de capital na Bolsa de Valores de São Paulo.' },
    { year: '2020', title: 'Aquisição pela Stone', description: 'Integração ao ecossistema Stone, fortalecendo nossa posição.' },
    { year: '2025', title: 'Inovação Contínua', description: 'Mais de 180 soluções e 60 mil clientes atendidos.' },
  ];

  const premios = [
    { title: 'Melhor ERP para Varejo', org: 'IDC Brasil', year: '2024' },
    { title: 'Top 100 Empresas de TI', org: 'IT Mídia', year: '2024' },
    { title: 'Melhor Solução de Pagamento', org: 'Pay Awards', year: '2023' },
    { title: 'Empresa Mais Inovadora', org: 'InfoMoney', year: '2023' },
  ];

  const heroFallback = (
    <section className="relative py-32 linx-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
          Institucional
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Sobre a <span className="linx-gradient-text">Linx</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Líder em tecnologia para o varejo brasileiro, transformando complexidade em resultado há mais de 35 anos.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="sobre" fallback={heroFallback} />

      {/* Missão, Visão, Valores */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-600">
                Transformar a complexidade do varejo em resultados simples e eficientes, 
                através de tecnologia e inovação.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-600">
                Ser a plataforma tecnológica mais relevante para o varejo na América Latina, 
                reconhecida pela excelência e inovação.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Propósito</h3>
              <p className="text-gray-600">
                Empoderar o varejo brasileiro com tecnologia que faz a diferença, 
                impulsionando o crescimento dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section 
        id="historia" 
        className={`py-24 bg-white transition-all duration-700 ${isVisible['historia'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Nossa História
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Uma trajetória de <span className="text-orange-500">sucesso</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <span className="text-3xl font-bold text-orange-500">{item.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10 my-4 md:my-0" />
                  <div className="w-full md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section 
        id="valores" 
        className={`py-24 bg-gray-50 transition-all duration-700 ${isVisible['valores'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Nossos Valores
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              O que nos <span className="text-orange-500">guia</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                  {valor.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{valor.title}</h3>
                <p className="text-gray-600 text-sm">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,107,53,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(147,51,234,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '35+', label: 'Anos de História', icon: <TrendingUp /> },
              { number: '60K+', label: 'Clientes', icon: <Users /> },
              { number: '4K+', label: 'Colaboradores', icon: <Building2 /> },
              { number: '16', label: 'Países', icon: <Globe /> },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prêmios */}
      <section 
        id="premios" 
        className={`py-24 bg-white transition-all duration-700 ${isVisible['premios'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Reconhecimentos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-orange-500">prêmios</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premios.map((premio, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-orange-50 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mx-auto mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Award size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{premio.title}</h3>
                <p className="text-gray-500 text-sm">{premio.org}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                  {premio.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Faça parte da nossa <span className="text-orange-500">história</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a mais de 60 mil empresas que confiam na Linx para impulsionar seus negócios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cliente">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Fale Conosco
              </Button>
            </Link>
            <Link to="/carreiras">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8">
                Trabalhe Conosco
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Sobre;
