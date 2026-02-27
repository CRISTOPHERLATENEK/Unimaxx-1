import { useState } from 'react';
import { Save, Search, RotateCcw, Upload } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Chaves padrão garantidas por seção (exibidas mesmo sem dados no banco)
const DEFAULT_SECTION_KEYS: Record<string, string[]> = {
  header: [
    'header.logo',
    'header.company',
    'header.nav.solutions',
    'header.nav.institutional',
    'header.nav.support',
    'header.nav.contact',
  ],
  hero: [
    'hero.title',
    'hero.subtitle',
    'hero.cta_primary',
    'hero.cta_secondary',
    'hero.image',
  ],
  quicklinks: [
    'quicklinks.title',
    'quicklinks.subtitle',
  ],
  solutions: [
    'solutions.title',
    'solutions.subtitle',
  ],
  stats: [
    'stats.title',
    'stats.subtitle',
    'stats.description',
  ],
  segments: [
    'segments.title',
    'segments.subtitle',
  ],
  differentials: [
    'differentials.title',
    'differentials.subtitle',
    'differentials.item1_title',
    'differentials.item1_desc',
    'differentials.item2_title',
    'differentials.item2_desc',
    'differentials.item3_title',
    'differentials.item3_desc',
  ],
  contact: [
    'contact.title',
    'contact.subtitle',
    'contact.phone',
    'contact.email',
    'contact.address',
  ],
  footer: [
    'footer.logo',
    'footer.company',
    'footer.description',
    'footer.copyright',
  ],
};

// Chaves que devem usar o campo de upload de imagem
const IMAGE_KEYS = ['header.logo', 'hero.image', 'footer.logo'];

export function ContentManager() {
  const { data, updateContent, uploadImage } = useData();
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Mescla as chaves padrão com as do banco (sem duplicatas)
  const mergedKeys = (section: string): string[] => {
    const defaults = DEFAULT_SECTION_KEYS[section] || [];
    const fromDB = Object.keys(data.content).filter(k => k.startsWith(`${section}.`));
    const all = Array.from(new Set([...defaults, ...fromDB]));
    return all.sort();
  };

  const contentSections = {
    header:       { title: 'Cabeçalho',    keys: mergedKeys('header') },
    hero:         { title: 'Hero (Banner)', keys: mergedKeys('hero') },
    quicklinks:   { title: 'Links Rápidos', keys: mergedKeys('quicklinks') },
    solutions:    { title: 'Soluções',      keys: mergedKeys('solutions') },
    stats:        { title: 'Estatísticas',  keys: mergedKeys('stats') },
    segments:     { title: 'Segmentos',     keys: mergedKeys('segments') },
    differentials:{ title: 'Diferenciais',  keys: mergedKeys('differentials') },
    contact:      { title: 'Contato',       keys: mergedKeys('contact') },
    footer:       { title: 'Rodapé',        keys: mergedKeys('footer') },
  };

  const handleChange = (key: string, value: string) => {
    setEditedContent(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const url = await uploadImage(file);
      handleChange(key, url);
      toast({
        title: 'Upload concluído',
        description: 'A imagem foi carregada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível carregar a imagem.',
        variant: 'destructive',
      });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent(editedContent);
      setEditedContent({});
      toast({
        title: 'Sucesso!',
        description: 'Conteúdo atualizado com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar conteúdo.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setEditedContent({});
    toast({
      title: 'Alterações descartadas',
      description: 'As alterações foram descartadas.',
    });
  };

  const getValue = (key: string) => {
    return editedContent[key] !== undefined ? editedContent[key] : data.content[key] || '';
  };

  const filterKeys = (keys: string[]) => {
    if (!searchTerm) return keys;
    return keys.filter(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'header.logo':               '🖼️ Logo do Cabeçalho (texto ou URL/upload de imagem)',
      'header.company':            'Nome da Empresa',
      'header.nav.solutions':      'Menu: Soluções',
      'header.nav.institutional':  'Menu: Institucional',
      'header.nav.support':        'Menu: Suporte',
      'header.nav.contact':        'Menu: Fale Conosco',
      'hero.title':                'Título Principal',
      'hero.subtitle':             'Subtítulo',
      'hero.cta_primary':          'Botão Primário (CTA)',
      'hero.cta_secondary':        'Botão Secundário',
      'hero.image':                '🖼️ Imagem do Banner (substitui estatísticas)',
      'quicklinks.title':          'Título',
      'quicklinks.subtitle':       'Subtítulo',
      'solutions.title':           'Título',
      'solutions.subtitle':        'Subtítulo',
      'stats.title':               'Título',
      'stats.subtitle':            'Subtítulo',
      'stats.description':         'Descrição',
      'segments.title':            'Título',
      'segments.subtitle':         'Subtítulo',
      'differentials.title':       'Título',
      'differentials.subtitle':    'Subtítulo',
      'differentials.item1_title': 'Item 1 — Título',
      'differentials.item1_desc':  'Item 1 — Descrição',
      'differentials.item2_title': 'Item 2 — Título',
      'differentials.item2_desc':  'Item 2 — Descrição',
      'differentials.item3_title': 'Item 3 — Título',
      'differentials.item3_desc':  'Item 3 — Descrição',
      'contact.title':             'Título',
      'contact.subtitle':          'Subtítulo',
      'contact.phone':             'Telefone',
      'contact.email':             'E-mail',
      'contact.address':           'Endereço',
      'footer.logo':               '🖼️ Logo do Rodapé (texto ou URL/upload de imagem)',
      'footer.company':            'Nome da Empresa',
      'footer.description':        'Descrição',
      'footer.copyright':          'Texto de Copyright',
    };
    return labels[key] || key;
  };

  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace('/api', '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Conteúdo</h1>
          <p className="text-gray-500 mt-1">
            Edite os textos e informações do site
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={Object.keys(editedContent).length === 0}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Descartar
          </Button>
          <Button
            onClick={handleSave}
            disabled={Object.keys(editedContent).length === 0 || saving}
            className="bg-[#00a8e8] hover:bg-[#0090c9]"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Buscar conteúdo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="flex-wrap h-auto gap-2">
          {Object.entries(contentSections).map(([key, section]) => (
            <TabsTrigger key={key} value={key}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(contentSections).map(([key, section]) => (
          <TabsContent key={key} value={key}>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {filterKeys(section.keys).map((contentKey) => (
                  <div key={contentKey}>
                    <Label htmlFor={contentKey} className="text-sm font-medium text-gray-700">
                      {getFieldLabel(contentKey)}
                    </Label>

                    {/* Campo com upload de imagem */}
                    {IMAGE_KEYS.includes(contentKey) ? (
                      <div className="mt-1 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            id={contentKey}
                            value={getValue(contentKey)}
                            onChange={(e) => handleChange(contentKey, e.target.value)}
                            className={editedContent[contentKey] !== undefined ? 'border-[#00a8e8] bg-blue-50' : ''}
                            placeholder={
                              contentKey === 'header.logo' || contentKey === 'footer.logo'
                                ? 'Texto da logo ou URL da imagem'
                                : 'URL da imagem do banner'
                            }
                          />
                          <div className="relative">
                            <input
                              type="file"
                              id={`${contentKey}-upload`}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(contentKey, file);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              title="Fazer upload de imagem"
                              onClick={() => document.getElementById(`${contentKey}-upload`)?.click()}
                              disabled={uploading === contentKey}
                            >
                              <Upload className={`w-4 h-4 ${uploading === contentKey ? 'animate-bounce' : ''}`} />
                              {uploading === contentKey ? ' Enviando...' : ' Upload'}
                            </Button>
                          </div>
                        </div>

                        {/* Prévia da imagem */}
                        {getValue(contentKey) &&
                          (getValue(contentKey).startsWith('/uploads/') || getValue(contentKey).startsWith('http')) && (
                            <div className="mt-2 p-2 border rounded bg-gray-50">
                              <p className="text-xs text-gray-500 mb-1">Prévia da imagem:</p>
                              <img
                                src={
                                  getValue(contentKey).startsWith('http')
                                    ? getValue(contentKey)
                                    : `${API_BASE}${getValue(contentKey)}`
                                }
                                alt="Preview"
                                className={
                                  contentKey === 'header.logo' || contentKey === 'footer.logo'
                                    ? 'h-12 w-auto object-contain'
                                    : 'w-full max-h-40 object-cover rounded'
                                }
                              />
                            </div>
                          )}

                        {/* Dicas por campo */}
                        {contentKey === 'hero.image' && (
                          <p className="text-xs text-gray-400">
                            * Se este campo estiver preenchido com uma imagem, ela substituirá os quadradinhos de estatísticas no banner principal.
                          </p>
                        )}
                        {contentKey === 'footer.logo' && (
                          <p className="text-xs text-gray-400">
                            * Deixe em branco para usar o nome da empresa como logo no rodapé. Recomendado: versão branca/clara da logo (o fundo do rodapé é escuro).
                          </p>
                        )}
                        {contentKey === 'header.logo' && (
                          <p className="text-xs text-gray-400">
                            * Deixe em branco para usar o nome da empresa como logo no cabeçalho.
                          </p>
                        )}
                      </div>
                    ) : (
                      /* Campo de texto simples */
                      <Input
                        id={contentKey}
                        value={getValue(contentKey)}
                        onChange={(e) => handleChange(contentKey, e.target.value)}
                        className={`mt-1 ${editedContent[contentKey] !== undefined ? 'border-[#00a8e8] bg-blue-50' : ''}`}
                      />
                    )}
                  </div>
                ))}

                {filterKeys(section.keys).length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum conteúdo encontrado
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
