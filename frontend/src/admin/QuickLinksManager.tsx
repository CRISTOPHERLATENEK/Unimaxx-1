import { useState, useEffect } from 'react';
import {
  Save,
  RotateCcw,
  Link,
  Building2,
  Monitor,
  ShoppingCart,
  BarChart3,
  Eye,
  Palette,
  Plus,
  Trash2,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const iconOptions = [
  { value: 'Building2',   label: 'Prédio (ERP)',        icon: Building2 },
  { value: 'Monitor',     label: 'Monitor (PDV)',        icon: Monitor },
  { value: 'ShoppingCart',label: 'Carrinho (E-commerce)',icon: ShoppingCart },
  { value: 'BarChart3',   label: 'Gráfico (BI)',         icon: BarChart3 },
];

const colorOptions = [
  { value: 'from-blue-500 to-blue-600',   label: 'Azul',     preview: 'bg-blue-500' },
  { value: 'from-green-500 to-green-600', label: 'Verde',    preview: 'bg-green-500' },
  { value: 'from-purple-500 to-purple-600',label:'Roxo',     preview: 'bg-purple-500' },
  { value: 'from-orange-500 to-orange-600',label:'Laranja',  preview: 'bg-orange-500' },
  { value: 'from-red-500 to-red-600',     label: 'Vermelho', preview: 'bg-red-500' },
  { value: 'from-cyan-500 to-cyan-600',   label: 'Ciano',    preview: 'bg-cyan-500' },
  { value: 'from-pink-500 to-pink-600',   label: 'Rosa',     preview: 'bg-pink-500' },
  { value: 'from-yellow-500 to-yellow-600',label:'Amarelo',  preview: 'bg-yellow-500' },
];

interface QuickLink {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  href: string;
}

const emptyLink = (): QuickLink => ({
  id: `link-${Date.now()}`,
  title: '',
  subtitle: '',
  icon: 'Building2',
  color: 'from-blue-500 to-blue-600',
  href: '#solucoes',
});

export function QuickLinksManager() {
  const { data, updateContent } = useData();
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const loadFromContent = () => {
    const content = data.content;
    const loaded: QuickLink[] = [];
    let i = 0;
    // Lê quantos links existirem no banco (índice sequencial)
    while (content[`quicklinks.${i}.id`] !== undefined) {
      loaded.push({
        id:       content[`quicklinks.${i}.id`],
        title:    content[`quicklinks.${i}.title`]    || '',
        subtitle: content[`quicklinks.${i}.subtitle`] || '',
        icon:     content[`quicklinks.${i}.icon`]     || 'Building2',
        color:    content[`quicklinks.${i}.color`]    || 'from-blue-500 to-blue-600',
        href:     content[`quicklinks.${i}.href`]     || '#solucoes',
      });
      i++;
    }
    // Se não houver nenhum no banco, usa os padrões
    if (loaded.length === 0) {
      return [
        { id: 'erp',     title: 'ERP',     subtitle: 'Gestão Completa', icon: 'Building2',    color: 'from-blue-500 to-blue-600',    href: '#solucoes' },
        { id: 'pdv',     title: 'PDV',     subtitle: 'Ponto de Venda',  icon: 'Monitor',       color: 'from-green-500 to-green-600',  href: '#solucoes' },
        { id: 'digital', title: 'Digital', subtitle: 'E-commerce',      icon: 'ShoppingCart',  color: 'from-purple-500 to-purple-600',href: '#solucoes' },
        { id: 'bi',      title: 'BI',      subtitle: 'Inteligência',    icon: 'BarChart3',     color: 'from-orange-500 to-orange-600',href: '#solucoes' },
      ];
    }
    return loaded;
  };

  useEffect(() => {
    setLinks(loadFromContent());
    setHasChanges(false);
  }, [data.content]);

  const updateLink = (index: number, field: keyof QuickLink, value: string) => {
    setLinks(prev => prev.map((l, i) => i === index ? { ...l, [field]: value } : l));
    setHasChanges(true);
  };

  const handleAdd = () => {
    if (links.length >= 8) {
      toast({ title: 'Limite atingido', description: 'Máximo de 8 links rápidos.', variant: 'destructive' });
      return;
    }
    setLinks(prev => [...prev, emptyLink()]);
    setHasChanges(true);
  };

  const handleDelete = (index: number) => {
    if (links.length <= 1) {
      toast({ title: 'Atenção', description: 'É necessário ter pelo menos 1 link.', variant: 'destructive' });
      return;
    }
    setLinks(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates: Record<string, string> = {};

      // Salva os links atuais com índices sequenciais
      links.forEach((link, i) => {
        updates[`quicklinks.${i}.id`]       = link.id;
        updates[`quicklinks.${i}.title`]    = link.title;
        updates[`quicklinks.${i}.subtitle`] = link.subtitle;
        updates[`quicklinks.${i}.icon`]     = link.icon;
        updates[`quicklinks.${i}.color`]    = link.color;
        updates[`quicklinks.${i}.href`]     = link.href;
      });

      // Apaga índices que possam ter sobrado de uma lista maior anterior
      // (seta como string vazia para sobrescrever no banco)
      for (let i = links.length; i < 8; i++) {
        updates[`quicklinks.${i}.id`]       = '';
        updates[`quicklinks.${i}.title`]    = '';
        updates[`quicklinks.${i}.subtitle`] = '';
        updates[`quicklinks.${i}.icon`]     = '';
        updates[`quicklinks.${i}.color`]    = '';
        updates[`quicklinks.${i}.href`]     = '';
      }

      await updateContent(updates);
      setHasChanges(false);
      toast({ title: 'Sucesso!', description: 'Links rápidos atualizados com sucesso.' });
    } catch {
      toast({ title: 'Erro', description: 'Erro ao salvar links rápidos.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLinks(loadFromContent());
    setHasChanges(false);
    toast({ title: 'Alterações descartadas', description: 'Os valores voltaram ao estado salvo.' });
  };

  const getIconComponent = (iconName: string) => {
    return iconOptions.find(o => o.value === iconName)?.icon || Building2;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Links Rápidos</h1>
          <p className="text-gray-500 mt-1">
            Gerencie os cards de acesso rápido da página inicial ({links.length}/8)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Descartar
          </Button>
          <Button
            variant="outline"
            onClick={handleAdd}
            disabled={links.length >= 8}
            className="border-[#00a8e8] text-[#00a8e8] hover:bg-[#00a8e8] hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Card
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="bg-[#00a8e8] hover:bg-[#0090c9]"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {/* Prévia */}
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Prévia dos Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {links.map((link, index) => {
              const Icon = getIconComponent(link.icon);
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-xl shadow border border-gray-100 p-4"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white/20 flex items-center justify-center mb-3 transition-colors">
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="font-bold text-gray-900 group-hover:text-white text-sm transition-colors">
                      {link.title || '—'}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                      {link.subtitle || '—'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Passe o mouse sobre os cards para ver o efeito de cor
          </p>
        </CardContent>
      </Card>

      {/* Cards de edição */}
      <div className="grid sm:grid-cols-2 gap-6">
        {links.map((link, index) => {
          const Icon = getIconComponent(link.icon);
          return (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span>Card {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(index)}
                    className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    title="Apagar card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Título */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Título</Label>
                  <Input
                    value={link.title}
                    onChange={(e) => updateLink(index, 'title', e.target.value)}
                    placeholder="Ex: ERP"
                    className="mt-1"
                  />
                </div>

                {/* Subtítulo */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Subtítulo</Label>
                  <Input
                    value={link.subtitle}
                    onChange={(e) => updateLink(index, 'subtitle', e.target.value)}
                    placeholder="Ex: Gestão Completa"
                    className="mt-1"
                  />
                </div>

                {/* Link */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Link className="w-3 h-3" />
                    Link de Destino
                  </Label>
                  <Input
                    value={link.href}
                    onChange={(e) => updateLink(index, 'href', e.target.value)}
                    placeholder="Ex: #solucoes ou /solucoes/erp"
                    className="mt-1 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Use <code className="bg-gray-100 px-1 rounded">#ancora</code> para seção da página ou{' '}
                    <code className="bg-gray-100 px-1 rounded">/caminho</code> para outra página
                  </p>
                </div>

                {/* Ícone */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Ícone</Label>
                  <Select
                    value={link.icon}
                    onValueChange={(value) => updateLink(index, 'icon', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => {
                        const OptIcon = opt.icon;
                        return (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <OptIcon className="w-4 h-4 text-gray-600" />
                              <span>{opt.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cor */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Palette className="w-3 h-3" />
                    Cor do Card (efeito hover)
                  </Label>
                  <Select
                    value={link.color}
                    onValueChange={(value) => updateLink(index, 'color', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione uma cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${opt.preview}`} />
                            <span>{opt.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Botão de adicionar inline */}
        {links.length < 8 && (
          <button
            onClick={handleAdd}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-[#00a8e8] hover:text-[#00a8e8] transition-colors min-h-[200px]"
          >
            <Plus className="w-8 h-8" />
            <span className="font-medium text-sm">Adicionar novo card</span>
          </button>
        )}
      </div>

      {/* Dica */}
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-4 flex gap-3 items-start">
          <div className="w-8 h-8 bg-[#00a8e8] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Como funciona</p>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Os cards aparecem logo abaixo do banner principal na página inicial. Você pode ter de 1 a 8 cards.
              Ao passar o mouse, o card revela o gradiente de cor selecionado.
              O link pode apontar para uma âncora da mesma página (ex:{' '}
              <code className="bg-blue-100 px-1 rounded">#solucoes</code>) ou para
              uma URL específica (ex: <code className="bg-blue-100 px-1 rounded">/solucoes/erp</code>).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}