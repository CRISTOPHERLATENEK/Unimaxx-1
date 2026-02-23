import { useState } from 'react';
import { Plus, Trash2, Upload, MoveUp, MoveDown, Palette, Image as ImageIcon, Layout } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import type { Banner } from '@/types';

// Mapeamento de páginas disponíveis para banners
const PAGES = [
  { value: 'home', label: 'Página Inicial' },
  { value: 'solucoes', label: 'Soluções (lista)' },
  { value: 'solucao-erp', label: 'Solução: Linx ERP' },
  { value: 'solucao-pdv', label: 'Solução: Linx PDV' },
  { value: 'solucao-commerce', label: 'Solução: Linx Commerce' },
  { value: 'solucao-pay', label: 'Solução: Linx Pay' },
  { value: 'solucao-delivery', label: 'Solução: Linx Delivery' },
  { value: 'solucao-bi', label: 'Solução: Linx BI' },
  { value: 'segmentos', label: 'Segmentos' },
  { value: 'sobre', label: 'Sobre Nós' },
  { value: 'carreiras', label: 'Carreiras' },
  { value: 'blog', label: 'Blog' },
  { value: 'imprensa', label: 'Imprensa' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'cliente', label: 'Área do Cliente / Contato' },
];

export function BannersManager() {
  const { data, addBanner, updateBanner, deleteBanner, uploadImage, getBannersByPage } = useData();
  const [uploading, setUploading] = useState<number | string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const BASE_URL = API_URL.replace('/api', '');

  // Banners filtrados pela página selecionada
  const filteredBanners = getBannersByPage(selectedPage);

  const handleAdd = async () => {
    try {
      await addBanner({
        title: 'Novo Banner',
        image: '',
        order_num: filteredBanners.length,
        active: 1,
        use_default_bg: 0,
        bg_color: '#00a8e8',
        page: selectedPage
      });
      toast({ title: 'Banner adicionado' });
    } catch (error) {
      toast({ title: 'Erro ao adicionar banner', variant: 'destructive' });
    }
  };

  const handleUpdate = async (banner: Banner) => {
    try {
      await updateBanner(banner);
      toast({ title: 'Banner atualizado' });
    } catch (error) {
      toast({ title: 'Erro ao atualizar banner', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este banner?')) return;
    try {
      await deleteBanner(id);
      toast({ title: 'Banner excluído' });
    } catch (error) {
      toast({ title: 'Erro ao excluir banner', variant: 'destructive' });
    }
  };

  const handleFileUpload = async (id: number, file: File) => {
    setUploading(id);
    try {
      const url = await uploadImage(file);
      const banner = data.banners.find(b => b.id === id);
      if (banner) {
        await updateBanner({ ...banner, image: url, use_default_bg: 0 });
      }
      toast({ title: 'Upload concluído' });
    } catch (error) {
      toast({ title: 'Erro no upload', variant: 'destructive' });
    } finally {
      setUploading(null);
    }
  };

  const selectedPageLabel = PAGES.find(p => p.value === selectedPage)?.label || selectedPage;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Banners</h1>
          <p className="text-gray-500 mt-1">Adicione e edite banners para cada página do site</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#00a8e8] hover:bg-[#0090c9]">
          <Plus className="w-4 h-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      {/* Seletor de Página */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Layout className="w-5 h-5 text-[#00a8e8]" />
          <h2 className="font-semibold text-gray-900">Selecione a Página</h2>
          <span className="ml-auto text-sm text-gray-500">
            {filteredBanners.length} banner(s) nesta página
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PAGES.map((page) => {
            const count = getBannersByPage(page.value).length;
            return (
              <button
                key={page.value}
                onClick={() => setSelectedPage(page.value)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                  selectedPage === page.value
                    ? 'bg-[#00a8e8] text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {page.label}
                {count > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                    selectedPage === page.value ? 'bg-white text-[#00a8e8]' : 'bg-[#00a8e8] text-white'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Banners da Página Selecionada */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Banners: <span className="text-[#00a8e8]">{selectedPageLabel}</span>
        </h2>
      </div>

      <div className="grid gap-6">
        {filteredBanners.sort((a, b) => (a.order_num || 0) - (b.order_num || 0)).map((banner) => (
          <div key={banner.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input 
                      value={banner.title || ''} 
                      onChange={(e) => handleUpdate({ ...banner, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input 
                      value={banner.subtitle || ''} 
                      onChange={(e) => handleUpdate({ ...banner, subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea 
                    value={banner.description || ''} 
                    onChange={(e) => handleUpdate({ ...banner, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Texto do Botão</Label>
                    <Input 
                      value={banner.cta_text || ''} 
                      onChange={(e) => handleUpdate({ ...banner, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link do Botão</Label>
                    <Input 
                      value={banner.cta_link || ''} 
                      onChange={(e) => handleUpdate({ ...banner, cta_link: e.target.value })}
                    />
                  </div>
                </div>

                {/* Seletor de Página do Banner */}
                <div className="space-y-2">
                  <Label>Página do Banner</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a8e8]"
                    value={banner.page || 'home'}
                    onChange={(e) => handleUpdate({ ...banner, page: e.target.value })}
                  >
                    {PAGES.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Usar Fundo Texturizado</Label>
                      <p className="text-sm text-gray-500">Usa uma cor sólida com textura de grade</p>
                    </div>
                    <Switch 
                      checked={banner.use_default_bg === 1}
                      onCheckedChange={(checked) => handleUpdate({ ...banner, use_default_bg: checked ? 1 : 0 })}
                    />
                  </div>
                </div>

                {banner.use_default_bg === 1 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label>Cor do Fundo</Label>
                    <div className="flex gap-3 items-center">
                      <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer"
                        value={banner.bg_color || '#00a8e8'}
                        onChange={(e) => handleUpdate({ ...banner, bg_color: e.target.value })}
                      />
                      <Input 
                        value={banner.bg_color || '#00a8e8'}
                        onChange={(e) => handleUpdate({ ...banner, bg_color: e.target.value })}
                        className="font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Visualização / Imagem</Label>
                <div 
                  className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center"
                  style={{ 
                    backgroundColor: banner.use_default_bg === 1 ? banner.bg_color : '#f3f4f6'
                  }}
                >
                  {/* Textura de Grade */}
                  {banner.use_default_bg === 1 && (
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59V40h1.41l1.1-1.11L1.41 37.78 0 38.59zM0 1.41L1.41 0h2.82L0 4.24V1.41zm0 5.66L5.66 0h2.82L0 8.48V7.07zm0 5.66L8.48 0h2.82L0 11.31v-1.41zm0 5.66L11.31 0h2.82L0 14.14v-1.41zm0 5.66L14.14 0h2.82L0 16.97v-1.41zm0 5.66L16.97 0h2.82L0 19.8v-1.41zm0 5.66L19.8 0h2.82L0 22.63v-1.41zm0 5.66L22.63 0h2.82L0 25.45v-1.41zm0 5.66L25.45 0h2.82L0 28.28v-1.41zm0 5.66L28.28 0h2.82L0 31.11v-1.41zm0 5.66L31.11 0h2.82L0 33.94v-1.41zm0 5.66L33.94 0h2.82L0 36.77v-1.41zm0 5.66L36.77 0h2.82L0 39.59v-1.41zM1.41 40h2.82L40 4.24V1.41L1.41 40zm5.66 0h2.82L40 8.48V7.07L7.07 40zm5.66 0h2.82L40 11.31v-1.41L12.73 40zm5.66 0h2.82L40 14.14v-1.41L18.38 40zm5.66 0h2.82L40 16.97v-1.41L24.04 40zm5.66 0h2.82L40 19.8v-1.41L29.7 40zm5.66 0h2.82L40 22.63v-1.41L35.35 40zM40 25.45v-1.41L25.45 40h2.82L40 28.28v-1.41L31.11 40h2.82L40 33.94v-1.41L36.77 40h2.82L40 39.59v-1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  )}

                  {banner.use_default_bg === 0 && banner.image ? (
                    <img 
                      src={banner.image.startsWith('http') ? banner.image : `${BASE_URL}${banner.image}`} 
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : banner.use_default_bg === 0 ? (
                    <div className="text-gray-400 flex flex-col items-center">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span>Nenhuma imagem</span>
                    </div>
                  ) : (
                    <div className="text-white flex flex-col items-center drop-shadow-md">
                      <Palette className="w-8 h-8 mb-2" />
                      <span className="font-bold">Fundo Colorido Ativo</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <input
                      type="file"
                      id={`banner-${banner.id}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && banner.id) handleFileUpload(banner.id, file);
                      }}
                    />
                    <Button 
                      variant="secondary"
                      onClick={() => document.getElementById(`banner-${banner.id}`)?.click()}
                      disabled={uploading === banner.id}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading === banner.id ? 'Enviando...' : 'Trocar por Imagem'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="Mover para cima"
                      onClick={() => handleUpdate({ ...banner, order_num: (banner.order_num || 0) - 1 })}
                    >
                      <MoveUp className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="Mover para baixo"
                      onClick={() => handleUpdate({ ...banner, order_num: (banner.order_num || 0) + 1 })}
                    >
                      <MoveDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="destructive" onClick={() => banner.id && handleDelete(banner.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Banner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBanners.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Layout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Nenhum banner para "{selectedPageLabel}"</p>
            <p className="text-gray-400 text-sm mt-1">
              Clique em "Novo Banner" para adicionar um banner a esta página.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Enquanto não houver banner, a página exibirá o hero padrão.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
