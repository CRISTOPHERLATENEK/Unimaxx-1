import { useState } from 'react';
import { Save, Search, RotateCcw, Upload } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function ContentManager() {
  const { data, updateContent, uploadImage } = useData();
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const contentSections = {
    header: {
      title: 'Cabeçalho',
      keys: Object.keys(data.content).filter(k => k.startsWith('header.'))
    },
    hero: {
      title: 'Hero',
      keys: Object.keys(data.content).filter(k => k.startsWith('hero.'))
    },
    quicklinks: {
      title: 'Links Rápidos',
      keys: Object.keys(data.content).filter(k => k.startsWith('quicklinks.'))
    },
    solutions: {
      title: 'Soluções',
      keys: Object.keys(data.content).filter(k => k.startsWith('solutions.'))
    },
    // --- AJUSTE: Adicionada a seção de Estatísticas ---
    stats: {
      title: 'Estatísticas',
      keys: Object.keys(data.content).filter(k => k.startsWith('stats.'))
    },
    // --------------------------------------------------
    segments: {
      title: 'Segmentos',
      keys: Object.keys(data.content).filter(k => k.startsWith('segments.'))
    },
    differentials: {
      title: 'Diferenciais',
      keys: Object.keys(data.content).filter(k => k.startsWith('differentials.'))
    },
    contact: {
      title: 'Contato',
      keys: Object.keys(data.content).filter(k => k.startsWith('contact.'))
    },
    footer: {
      title: 'Rodapé',
      keys: Object.keys(data.content).filter(k => k.startsWith('footer.'))
    },
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
                      {contentKey}
                    </Label>
                    {contentKey === 'header.logo' || contentKey === 'hero.image' ? (
                      <div className="mt-1 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            id={contentKey}
                            value={getValue(contentKey)}
                            onChange={(e) => handleChange(contentKey, e.target.value)}
                            className={editedContent[contentKey] !== undefined ? 'border-[#00a8e8] bg-blue-50' : ''}
                            placeholder={contentKey === 'header.logo' ? "Texto da logo ou URL da imagem" : "URL da imagem do banner"}
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
                              onClick={() => document.getElementById(`${contentKey}-upload`)?.click()}
                              disabled={uploading === contentKey}
                            >
                              <Upload className={`w-4 h-4 ${uploading === contentKey ? 'animate-bounce' : ''}`} />
                            </Button>
                          </div>
                        </div>
                        {getValue(contentKey) && (getValue(contentKey).startsWith('/uploads/') || getValue(contentKey).startsWith('http' )) && (
                          <div className="mt-2 p-2 border rounded bg-gray-50">
                            <p className="text-xs text-gray-500 mb-1">Prévia da imagem:</p>
                            <img 
                              src={getValue(contentKey).startsWith('http' ) ? getValue(contentKey) : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api' ).replace('/api', '') + getValue(contentKey)} 
                              alt="Preview" 
                              className={contentKey === 'header.logo' ? "h-8 w-auto object-contain" : "w-full max-h-40 object-cover rounded"}
                            />
                          </div>
                        )}
                        {contentKey === 'hero.image' && (
                          <p className="text-xs text-gray-400">
                            * Se este campo estiver preenchido com uma imagem, ela substituirá os quadradinhos de estatísticas no banner principal.
                          </p>
                        )}
                      </div>
                    ) : (
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
