import { 
  Calendar, Download, ExternalLink, ArrowRight,
  TrendingUp, Users, Award, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Imprensa() {
  const releases = [
    {
      id: 1,
      titulo: 'Linx lança nova versão do ERP com inteligência artificial',
      data: '15 Jan 2025',
      resumo: 'A nova versão traz recursos de IA para previsão de vendas e otimização de estoque.',
      categoria: 'Produto'
    },
    {
      id: 2,
      titulo: 'Linx é reconhecida como melhor empresa para trabalhar',
      data: '10 Jan 2025',
      resumo: 'Pesquisa do GPTW coloca a Linx entre as melhores empresas de tecnologia do Brasil.',
      categoria: 'Institucional'
    },
    {
      id: 3,
      titulo: 'Parceria estratégica expande presença na América Latina',
      data: '5 Jan 2025',
      resumo: 'Acordo fortalece operações no México, Colômbia e Chile.',
      categoria: 'Negócios'
    },
    {
      id: 4,
      titulo: 'Linx Pay processa R$ 10 bilhões em transações',
      data: '20 Dez 2024',
      resumo: 'Marco histórico para a divisão de pagamentos da empresa.',
      categoria: 'Financeiro'
    },
    {
      id: 5,
      titulo: 'Novo Centro de Inovação é inaugurado em São Paulo',
      data: '15 Dez 2024',
      resumo: 'Espaço de 5.000m² abrigará pesquisa e desenvolvimento de novas soluções.',
      categoria: 'Institucional'
    },
  ];

  const materiais = [
    { nome: 'Logo Linx', formato: 'PNG, SVG', tamanho: '2.5 MB' },
    { nome: 'Kit de Imprensa 2025', formato: 'PDF', tamanho: '15 MB' },
    { nome: 'Fotos Executivos', formato: 'ZIP', tamanho: '45 MB' },
    { nome: 'Brand Guidelines', formato: 'PDF', tamanho: '8 MB' },
  ];

  const estatisticas = [
    { numero: '60K+', label: 'Clientes', icon: <Users /> },
    { numero: '4K+', label: 'Colaboradores', icon: <TrendingUp /> },
    { numero: '16', label: 'Países', icon: <Globe /> },
    { numero: '35+', label: 'Anos', icon: <Award /> },
  ];

  const heroFallback = (
    <section className="relative py-32 linx-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
          Imprensa
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Sala de <span className="linx-gradient-text">Imprensa</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Notícias, releases e recursos para a mídia.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="imprensa" fallback={heroFallback} />

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl text-orange-500 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.numero}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                Releases
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Últimas <span className="text-orange-500">Notícias</span>
              </h2>
            </div>
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 mt-4 md:mt-0">
              Ver Todos
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          <div className="space-y-6">
            {releases.map((release) => (
              <article key={release.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                        {release.categoria}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        {release.data}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {release.titulo}
                    </h3>
                    <p className="text-gray-600">{release.resumo}</p>
                  </div>
                  <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Ler mais</span>
                    <ExternalLink size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Materiais */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Downloads
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Materiais para <span className="text-orange-500">Imprensa</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Acesse nossos recursos visuais e documentos oficiais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materiais.map((material, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Download size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{material.nome}</h3>
                <p className="text-sm text-gray-500">{material.formato} • {material.tamanho}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Fale com a <span className="linx-gradient-text">Assessoria</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Para solicitações de imprensa, entrevistas e mais informações.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-white font-semibold mb-2">Assessoria de Imprensa</h3>
                <p className="text-gray-300 text-sm mb-1">imprensa@linx.com.br</p>
                <p className="text-gray-300 text-sm">(11) 3003-3333</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Relações com Investidores</h3>
                <p className="text-gray-300 text-sm mb-1">ri@linx.com.br</p>
                <p className="text-gray-300 text-sm">(11) 3003-3334</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Imprensa;
