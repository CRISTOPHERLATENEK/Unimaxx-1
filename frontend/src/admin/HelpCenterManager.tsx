import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Search, ChevronDown, Upload, Eye, EyeOff,
  Save, X, AlertCircle, CheckCircle2, Loader
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
  category_id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  youtube_url: string;
  order_position: number;
  status: number;
  views: number;
  category_name?: string;
}

interface HelpImage {
  id: number;
  article_id: number;
  image_path: string;
  alt_text: string;
  order_position: number;
}

export function HelpCenterManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'articles'>('categories');
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [images, setImages] = useState<HelpImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);

  // Form states
  const [categoryForm, setCategoryForm] = useState<Partial<HelpCategory>>({});
  const [articleForm, setArticleForm] = useState<Partial<HelpArticle>>({});
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/help/categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      toast.error('Erro ao buscar categorias');
    }
  };

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/help/articles`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error('Erro ao buscar artigos:', err);
      toast.error('Erro ao buscar artigos');
    }
  };

  // Fetch images for article
  const fetchImages = async (articleId: number) => {
    try {
      const res = await fetch(`${API_URL}/admin/help/articles/${articleId}/images`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Erro ao buscar imagens:', err);
      toast.error('Erro ao buscar imagens');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // ========== CATEGORIAS ==========

  const handleSaveCategory = async () => {
    if (!categoryForm.name) {
      toast.error('Nome da categoria é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const method = categoryForm.id ? 'PUT' : 'POST';
      const url = categoryForm.id
        ? `${API_URL}/admin/help/categories/${categoryForm.id}`
        : `${API_URL}/admin/help/categories`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryForm)
      });

      if (res.ok) {
        toast.success(categoryForm.id ? 'Categoria atualizada' : 'Categoria criada');
        setCategoryForm({});
        setShowCategoryModal(false);
        fetchCategories();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Erro ao salvar categoria');
      }
    } catch (err) {
      toast.error('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Tem certeza? Todos os artigos serão deletados.')) return;

    try {
      const res = await fetch(`${API_URL}/admin/help/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success('Categoria deletada');
        fetchCategories();
      } else {
        toast.error('Erro ao deletar categoria');
      }
    } catch (err) {
      toast.error('Erro ao deletar categoria');
    }
  };

  // ========== ARTIGOS ==========

  const handleSaveArticle = async () => {
    if (!articleForm.category_id || !articleForm.title) {
      toast.error('Categoria e título são obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const method = articleForm.id ? 'PUT' : 'POST';
      const url = articleForm.id
        ? `${API_URL}/admin/help/articles/${articleForm.id}`
        : `${API_URL}/admin/help/articles`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(articleForm)
      });

      if (res.ok) {
        toast.success(articleForm.id ? 'Artigo atualizado' : 'Artigo criado');
        setArticleForm({});
        setShowArticleModal(false);
        fetchArticles();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Erro ao salvar artigo');
      }
    } catch (err) {
      toast.error('Erro ao salvar artigo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Tem certeza? Esta ação não pode ser desfeita.')) return;

    try {
      const res = await fetch(`${API_URL}/admin/help/articles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success('Artigo deletado');
        fetchArticles();
      } else {
        toast.error('Erro ao deletar artigo');
      }
    } catch (err) {
      toast.error('Erro ao deletar artigo');
    }
  };

  // ========== IMAGENS ==========

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedArticleId || !e.target.files?.[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', '');

    setUploadingImage(true);
    try {
      const res = await fetch(`${API_URL}/admin/help/articles/${selectedArticleId}/images`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        toast.success('Imagem enviada');
        fetchImages(selectedArticleId);
        e.target.value = '';
      } else {
        toast.error('Erro ao enviar imagem');
      }
    } catch (err) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Tem certeza?')) return;

    try {
      const res = await fetch(`${API_URL}/admin/help/images/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success('Imagem deletada');
        if (selectedArticleId) fetchImages(selectedArticleId);
      } else {
        toast.error('Erro ao deletar imagem');
      }
    } catch (err) {
      toast.error('Erro ao deletar imagem');
    }
  };

  // ========== FILTROS ==========

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Central de Ajuda</h1>
          <p className="text-gray-600 mt-1">Gerencie categorias, artigos e tutoriais</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Categorias
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'articles'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Artigos
        </button>
      </div>

      {/* Search and Add */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder={activeTab === 'categories' ? 'Buscar categorias...' : 'Buscar artigos...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => {
            if (activeTab === 'categories') {
              setCategoryForm({});
              setShowCategoryModal(true);
            } else {
              setArticleForm({ status: 1 });
              setShowArticleModal(true);
            }
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus size={20} className="mr-2" />
          Novo {activeTab === 'categories' ? 'Categoria' : 'Artigo'}
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'categories' ? (
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">Nenhuma categoria encontrada</p>
            </Card>
          ) : (
            filteredCategories.map((category) => (
              <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Slug: {category.slug}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCategoryForm(category);
                        setShowCategoryModal(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">Nenhum artigo encontrado</p>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                      {article.status === 1 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          <CheckCircle2 size={12} /> Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          <EyeOff size={12} /> Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{article.short_description}</p>
                    <div className="flex gap-4 mt-3 text-xs text-gray-500">
                      <span>Categoria: {article.category_name}</span>
                      <span>Visualizações: {article.views}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedArticleId(article.id);
                        fetchImages(article.id);
                        setShowImagesModal(true);
                      }}
                    >
                      <Upload size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setArticleForm(article);
                        setShowArticleModal(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Category Modal */}
      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {categoryForm.id ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <Input
                value={categoryForm.name || ''}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="Ex: Financeiro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <Textarea
                value={categoryForm.description || ''}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Descrição da categoria"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ícone</label>
              <Input
                value={categoryForm.icon || ''}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                placeholder="Ex: DollarSign, Settings, etc"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveCategory}
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? <Loader className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                Salvar
              </Button>
              <Button
                onClick={() => setShowCategoryModal(false)}
                variant="outline"
                className="flex-1"
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Article Modal */}
      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {articleForm.id ? 'Editar Artigo' : 'Novo Artigo'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                value={articleForm.category_id || ''}
                onChange={(e) => setArticleForm({ ...articleForm, category_id: parseInt(e.target.value) })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <Input
                value={articleForm.title || ''}
                onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                placeholder="Título do artigo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
              <Textarea
                value={articleForm.short_description || ''}
                onChange={(e) => setArticleForm({ ...articleForm, short_description: e.target.value })}
                placeholder="Resumo do artigo"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <Textarea
                value={articleForm.content || ''}
                onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                placeholder="Conteúdo completo do artigo"
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do YouTube (opcional)</label>
              <Input
                value={articleForm.youtube_url || ''}
                onChange={(e) => setArticleForm({ ...articleForm, youtube_url: e.target.value })}
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Posição</label>
                <Input
                  type="number"
                  value={articleForm.order_position || 0}
                  onChange={(e) => setArticleForm({ ...articleForm, order_position: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={articleForm.status || 1}
                  onChange={(e) => setArticleForm({ ...articleForm, status: parseInt(e.target.value) })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>Ativo</option>
                  <option value={0}>Inativo</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveArticle}
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? <Loader className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                Salvar
              </Button>
              <Button
                onClick={() => setShowArticleModal(false)}
                variant="outline"
                className="flex-1"
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Images Modal */}
      <Dialog open={showImagesModal} onOpenChange={setShowImagesModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Gerenciar Imagens do Artigo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                disabled={uploadingImage}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600">Clique para selecionar uma imagem</p>
              </label>
            </div>

            {uploadingImage && (
              <div className="flex items-center justify-center py-4">
                <Loader className="animate-spin text-orange-500" size={24} />
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {images.map((img) => (
                <div key={img.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{img.image_path.split('/').pop()}</p>
                    <p className="text-xs text-gray-500">{img.alt_text}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteImage(img.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowImagesModal(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
