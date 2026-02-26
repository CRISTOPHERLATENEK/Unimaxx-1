import { useState, useEffect } from 'react';
import {
  Search, ChevronRight, Play, AlertCircle, Loader,
  BookOpen, Settings, DollarSign, Zap, HelpCircle, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BASE_URL = API_URL.replace('/api', '');

interface HelpCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order_position: number;
}

interface HelpArticle {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  category_name: string;
  category_slug: string;
  views: number;
}

interface HelpArticleDetail extends HelpArticle {
  content: string;
  youtube_url: string;
  images: Array<{
    id: number;
    image_path: string;
    alt_text: string;
  }>;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'BookOpen': <BookOpen size={24} />,
  'Settings': <Settings size={24} />,
  'DollarSign': <DollarSign size={24} />,
  'Zap': <Zap size={24} />,
  'HelpCircle': <HelpCircle size={24} />,
  'Users': <Users size={24} />,
};

function HelpCenter() {
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticleDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState<'categories' | 'articles' | 'article'>('categories');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/help/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch articles for selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/help/categories/${selectedCategory}/articles`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error('Erro ao buscar artigos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  // Search articles
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setSearching(true);
      try {
        const res = await fetch(`${API_URL}/help/search?q=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error('Erro na busca:', err);
      } finally {
        setSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Fetch article detail
  const handleSelectArticle = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/help/articles/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedArticle(data);
        setView('article');
      }
    } catch (err) {
      console.error('Erro ao buscar artigo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setSearchTerm('');
    setView('articles');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setView('categories');
  };

  const handleBackToArticles = () => {
    setView('articles');
  };

  const heroFallback = (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6 border border-orange-500/30">
          Central de Ajuda
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Como podemos <span className="text-orange-400">ajudar?</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          Encontre respostas, tutoriais e suporte para todas as nossas soluções.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <PageBanner page="help" fallback={heroFallback} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={24} />
            <Input
              placeholder="Buscar artigos, tutoriais, dúvidas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 h-16 text-lg bg-white border-slate-200 focus:border-orange-500 focus:ring-orange-200"
            />
          </div>
        </div>

        {/* View: Categories */}
        {view === 'categories' && (
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="animate-spin text-orange-600" size={32} />
              </div>
            ) : categories.length === 0 ? (
              <Card className="p-8 text-center bg-white border-slate-200">
                <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-slate-600">Nenhuma categoria disponível</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className="text-left group"
                  >
                    <Card className="h-full p-8 bg-white border-slate-200 hover:shadow-lg transition-all hover:border-orange-500">
                      <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                        {ICON_MAP[category.icon] || <HelpCircle size={24} />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">{category.description}</p>
                      <div className="flex items-center text-orange-600 font-medium text-sm">
                        Ver Artigos
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View: Articles List */}
        {view === 'articles' && (
          <div className="space-y-6">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <ChevronRight size={16} className="rotate-180" />
              Voltar para Categorias
            </button>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="animate-spin text-orange-600" size={32} />
              </div>
            ) : articles.length === 0 ? (
              <Card className="p-8 text-center bg-white border-slate-200">
                <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-slate-600">Nenhum artigo disponível nesta categoria</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="w-full text-left group"
                  >
                    <Card className="p-6 bg-white border-slate-200 hover:shadow-lg hover:border-orange-500 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-slate-600 text-sm mt-2">{article.short_description}</p>
                          <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                            <span>👁️ {article.views} visualizações</span>
                          </div>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-orange-600 transition-colors ml-4 flex-shrink-0" size={20} />
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View: Article Detail */}
        {view === 'article' && selectedArticle && (
          <div className="max-w-4xl mx-auto space-y-6">
            <button
              onClick={handleBackToArticles}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <ChevronRight size={16} className="rotate-180" />
              Voltar para Artigos
            </button>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="animate-spin text-orange-600" size={32} />
              </div>
            ) : (
              <Card className="p-8 lg:p-12 bg-white border-slate-200">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium mb-4">
                    {selectedArticle.category_name}
                  </span>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{selectedArticle.title}</h1>
                  <p className="text-lg text-slate-600">{selectedArticle.short_description}</p>
                </div>

                {/* YouTube Video */}
                {selectedArticle.youtube_url && (
                  <div className="mb-8">
                    <div
                      className="relative w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-200"
                      style={{ paddingBottom: '56.25%' }}
                    >
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={
                          selectedArticle.youtube_url.includes('watch?v=')
                            ? selectedArticle.youtube_url.replace(
                                'watch?v=',
                                'embed/'
                              )
                            : selectedArticle.youtube_url
                        }
                        title={selectedArticle.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedArticle.content}
                  </div>
                </div>

                {/* Images */}
                {selectedArticle.images && selectedArticle.images.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Imagens Explicativas</h2>
                    <div className="space-y-6">
                      {selectedArticle.images.map((img) => {
                        const imageUrl = img.image_path.startsWith('http') 
                          ? img.image_path 
                          : `${BASE_URL}${img.image_path}`;
                        
                        return (
                          <div key={img.id} className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={imageUrl}
                              alt={img.alt_text || selectedArticle.title}
                              className="w-full h-auto max-h-[600px] object-contain mx-auto"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                            {img.alt_text && (
                              <p className="text-sm text-slate-600 text-center bg-slate-100 py-3 px-4 border-t border-slate-200">
                                {img.alt_text}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Related Articles */}
                {articles.length > 1 && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Artigos Relacionados</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {articles
                        .filter(a => a.slug !== selectedArticle.slug)
                        .slice(0, 4)
                        .map((article) => (
                          <button
                            key={article.id}
                            onClick={() => handleSelectArticle(article.slug)}
                            className="text-left group"
                          >
                            <Card className="p-4 bg-white border-slate-200 hover:shadow-lg hover:border-orange-500 transition-all h-full">
                              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                                {article.short_description}
                              </p>
                            </Card>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {/* Search Results */}
        {searchTerm.length >= 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Resultados da busca: <span className="text-orange-600">"{searchTerm}"</span>
              </h2>
              {searching && (
                <p className="text-slate-600 text-sm mt-2 flex items-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  Buscando...
                </p>
              )}
            </div>

            {searchResults.length === 0 && !searching ? (
              <Card className="p-8 text-center bg-white border-slate-200">
                <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-slate-600">Nenhum resultado encontrado</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {searchResults.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="w-full text-left group"
                  >
                    <Card className="p-6 bg-white border-slate-200 hover:shadow-lg hover:border-orange-500 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                              {article.title}
                            </h3>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                              {article.category_name}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm">{article.short_description}</p>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-orange-600 transition-colors ml-4 flex-shrink-0" size={20} />
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HelpCenter;