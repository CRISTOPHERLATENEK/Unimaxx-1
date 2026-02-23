import { useState } from 'react';
import { 
  Calendar, Clock, User, ArrowRight, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'varejo', nome: 'Varejo' },
    { id: 'tecnologia', nome: 'Tecnologia' },
    { id: 'gestao', nome: 'Gestão' },
    { id: 'marketing', nome: 'Marketing' },
  ];

  const posts = [
    {
      id: 1,
      titulo: '10 Tendências do Varejo para 2025',
      resumo: 'Descubra as principais inovações e mudanças que vão transformar o varejo brasileiro no próximo ano.',
      categoria: 'varejo',
      autor: 'Ana Silva',
      data: '15 Jan 2025',
      tempoLeitura: '8 min',
      imagem: '📈',
      destaque: true
    },
    {
      id: 2,
      titulo: 'Como Aumentar as Vendas no E-commerce',
      resumo: 'Estratégias práticas para impulsionar suas vendas online e conquistar mais clientes.',
      categoria: 'marketing',
      autor: 'Carlos Santos',
      data: '12 Jan 2025',
      tempoLeitura: '6 min',
      imagem: '🛒',
      destaque: false
    },
    {
      id: 3,
      titulo: 'A Importância da Transformação Digital',
      resumo: 'Por que as empresas que não se digitalizam estão perdendo mercado? Entenda os riscos.',
      categoria: 'tecnologia',
      autor: 'Mariana Costa',
      data: '10 Jan 2025',
      tempoLeitura: '10 min',
      imagem: '💻',
      destaque: false
    },
    {
      id: 4,
      titulo: 'Gestão de Estoque: Melhores Práticas',
      resumo: 'Aprenda a otimizar seu estoque, reduzir custos e evitar perdas com essas dicas.',
      categoria: 'gestao',
      autor: 'Pedro Oliveira',
      data: '8 Jan 2025',
      tempoLeitura: '7 min',
      imagem: '📦',
      destaque: false
    },
    {
      id: 5,
      titulo: 'Omnichannel: A Experiência do Cliente',
      resumo: 'Como criar uma jornada de compra integrada entre loja física e online.',
      categoria: 'varejo',
      autor: 'Julia Mendes',
      data: '5 Jan 2025',
      tempoLeitura: '9 min',
      imagem: '🔄',
      destaque: false
    },
    {
      id: 6,
      titulo: 'Inteligência Artificial no Varejo',
      resumo: 'Como a IA está revolucionando a forma como as lojas atendem seus clientes.',
      categoria: 'tecnologia',
      autor: 'Roberto Lima',
      data: '3 Jan 2025',
      tempoLeitura: '12 min',
      imagem: '🤖',
      destaque: false
    },
  ];

  const postsFiltrados = posts.filter(post => {
    const matchSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.resumo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'todas' || post.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  const postDestaque = posts.find(p => p.destaque);

  const heroFallback = (
    <section className="relative py-32 linx-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
          Blog
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Insights do <span className="linx-gradient-text">Varejo</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Conteúdo exclusivo sobre tecnologia, gestão e inovação no varejo.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="blog" fallback={heroFallback} />

      {/* Post em Destaque */}
      {postDestaque && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex items-center justify-center">
                  <div className="text-9xl">{postDestaque.imagem}</div>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium mb-4 w-fit">
                    Em Destaque
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{postDestaque.titulo}</h2>
                  <p className="text-gray-600 mb-6">{postDestaque.resumo}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {postDestaque.autor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {postDestaque.data}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {postDestaque.tempoLeitura}
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
                    Ler Artigo
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filtros */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar artigos..."
                className="pl-12 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsFiltrados.filter(p => !p.destaque).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform">{post.imagem}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-medium capitalize">
                      {post.categoria}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {post.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.resumo}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {post.autor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.tempoLeitura}
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {postsFiltrados.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-gray-600">Tente ajustar seus filtros ou busque por outro termo.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Receba nossos <span className="linx-gradient-text">conteúdos</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Cadastre-se para receber as últimas novidades e insights do varejo diretamente no seu e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              placeholder="Seu e-mail"
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8">
              Inscrever-se
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Blog;
