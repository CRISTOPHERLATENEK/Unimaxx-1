// src/admin/SolutionPagesManager.tsx - VERSÃO COMPLETA COM UPLOAD DE IMAGEM

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Edit2, Trash2, Save, X, Search, ExternalLink,
  RefreshCw, WifiOff, Upload, Image as ImageIcon, Eye,
  EyeOff, ChevronDown, ChevronUp, Package, Building2,
  ShoppingCart, CreditCard, Truck, FileText, BarChart3,
  Globe, Monitor, Settings, Zap, Layers, Star, CheckCircle2,
  Link2, Palette, Tag, AlignLeft, Hash, ToggleLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BASE_URL = API_URL.replace('/api', '');

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
interface SolutionPage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  integrations: string[];
  hero_image?: string;
  icon: string;
  color_theme: 'orange' | 'blue' | 'green' | 'purple' | 'black' | 'white';
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

const EMPTY_PAGE: SolutionPage = {
  id: 0,
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  features: [],
  benefits: [],
  integrations: [],
  hero_image: '',
  icon: 'Building2',
  color_theme: 'orange',
  meta_title: '',
  meta_description: '',
  is_active: true,
};

// ─────────────────────────────────────────
// OPÇÕES DE ÍCONES
// ─────────────────────────────────────────
const ICON_OPTIONS = [
  { value: 'Building2',    label: 'Empresa',       Icon: Building2 },
  { value: 'ShoppingCart', label: 'Carrinho',      Icon: ShoppingCart },
  { value: 'CreditCard',   label: 'Pagamento',     Icon: CreditCard },
  { value: 'Truck',        label: 'Entrega',       Icon: Truck },
  { value: 'FileText',     label: 'Documento',     Icon: FileText },
  { value: 'BarChart3',    label: 'Gráfico',       Icon: BarChart3 },
  { value: 'Globe',        label: 'Web',           Icon: Globe },
  { value: 'Monitor',      label: 'Monitor',       Icon: Monitor },
  { value: 'Settings',     label: 'Configuração',  Icon: Settings },
  { value: 'Zap',          label: 'Rápido',        Icon: Zap },
  { value: 'Package',      label: 'Pacote',        Icon: Package },
  { value: 'Star',         label: 'Destaque',      Icon: Star },
  { value: 'Layers',       label: 'Camadas',       Icon: Layers },
];

// ─────────────────────────────────────────
// OPÇÕES DE COR
// ─────────────────────────────────────────
const COLOR_OPTIONS = [
  { value: 'orange', label: 'Laranja', bg: 'bg-orange-500' },
  { value: 'blue',   label: 'Azul',   bg: 'bg-blue-500' },
  { value: 'green',  label: 'Verde',  bg: 'bg-green-500' },
  { value: 'purple', label: 'Roxo',   bg: 'bg-purple-500' },
  { value: 'black',  label: 'Preto',  bg: 'bg-gray-900' },
  { value: 'white',  label: 'Branco', bg: 'bg-gray-100 border border-gray-300' },
];

// ─────────────────────────────────────────
// HELPER: lista editável
// ─────────────────────────────────────────
function EditableList({
  label,
  icon: Icon,
  items,
  onChange,
  placeholder = 'Digite o item...',
}: {
  label: string;
  icon: React.ElementType;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const addItem = () => onChange([...items, '']);
  const removeItem = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const changeItem = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Icon className="w-4 h-4 text-[#00a8e8]" />
          {label}
          <Badge variant="secondary" className="ml-1">{items.length}</Badge>
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addItem}
          className="h-7 px-2 text-xs border-[#00a8e8] text-[#00a8e8] hover:bg-[#00a8e8] hover:text-white">
          <Plus className="w-3 h-3 mr-1" /> Adicionar
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-[#00a8e8]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#00a8e8]">{idx + 1}</span>
            </div>
            <Input
              value={item}
              onChange={(e) => changeItem(idx, e.target.value)}
              placeholder={`${placeholder} ${idx + 1}`}
              className="flex-1 h-9 text-sm"
            />
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50"
              onClick={() => removeItem(idx)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
            Nenhum item ainda. Clique em "Adicionar".
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// FORMULÁRIO DE EDIÇÃO
// ─────────────────────────────────────────
function PageForm({
  page,
  onSave,
  onCancel,
  isNew,
}: {
  page: SolutionPage;
  onSave: (data: SolutionPage, id?: number) => Promise<void>;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<SolutionPage>(page);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('geral');
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const set = (field: keyof SolutionPage, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Auto gerar slug a partir do title
  const handleTitleChange = (val: string) => {
    set('title', val);
    if (isNew) {
      const slug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      set('slug', slug);
    }
  };

  // Upload da imagem hero
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Erro no upload');
      const data = await res.json();
      set('hero_image', data.url);
      toast({ title: '✅ Imagem enviada com sucesso!' });
    } catch {
      toast({ title: 'Erro no upload da imagem', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({ title: 'Título é obrigatório', variant: 'destructive' });
      return;
    }
    if (!form.slug.trim()) {
      toast({ title: 'Slug é obrigatório', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await onSave(form, isNew ? undefined : form.id);
    } finally {
      setSaving(false);
    }
  };

  const imageUrl = form.hero_image
    ? form.hero_image.startsWith('http')
      ? form.hero_image
      : `${BASE_URL}${form.hero_image}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00a8e8]/10 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#00a8e8]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">
                {isNew ? 'Nova Página de Solução' : `Editar: ${page.title}`}
              </h2>
              <p className="text-xs text-gray-500">/solucoes/{form.slug || 'slug-aqui'}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start px-6 pt-4 bg-transparent border-b border-gray-100 rounded-none gap-1">
            {[
              { value: 'geral',    label: '📄 Geral' },
              { value: 'imagem',   label: '🖼️ Imagem Hero' },
              { value: 'conteudo', label: '📋 Conteúdo' },
              { value: 'visual',   label: '🎨 Visual' },
              { value: 'seo',      label: '🔍 SEO' },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="text-xs px-3 py-2 data-[state=active]:bg-[#00a8e8] data-[state=active]:text-white rounded-md"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── ABA GERAL ── */}
          <TabsContent value="geral" className="p-6 space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Hash className="w-4 h-4 text-[#00a8e8]" /> Título da Página *
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ex: ERP Completo para Varejo"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Link2 className="w-4 h-4 text-[#00a8e8]" /> Slug (URL) *
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-l-md px-3 h-10 flex items-center">
                    /solucoes/
                  </span>
                  <Input
                    value={form.slug}
                    onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="erp-varejo"
                    className="h-10 rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <AlignLeft className="w-4 h-4 text-[#00a8e8]" /> Subtítulo
                </Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => set('subtitle', e.target.value)}
                  placeholder="Frase de destaque abaixo do título"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <AlignLeft className="w-4 h-4 text-[#00a8e8]" /> Descrição Principal
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Descrição detalhada da solução..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <Label className="font-semibold flex items-center gap-2">
                    <ToggleLeft className="w-4 h-4 text-[#00a8e8]" /> Página Ativa
                  </Label>
                  <p className="text-xs text-gray-500 mt-0.5">Exibir esta página no site público</p>
                </div>
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => set('is_active', v)}
                />
              </div>
            </div>
          </TabsContent>

          {/* ── ABA IMAGEM HERO ── */}
          <TabsContent value="imagem" className="p-6 space-y-5">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="w-4 h-4 text-[#00a8e8]" /> Imagem de Capa (Hero Image)
              </Label>

              {/* Preview */}
              <div
                className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt="Hero preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm font-medium">Clique para trocar a imagem</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-3 group-hover:text-[#00a8e8] transition-colors">
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-[#00a8e8]/10 flex items-center justify-center transition-colors">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Clique para enviar a imagem hero</p>
                      <p className="text-xs mt-1">PNG, JPG ou WEBP — máx. 5MB</p>
                      <p className="text-xs text-gray-300">Tamanho recomendado: 1200×600px</p>
                    </div>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-white flex flex-col items-center gap-2">
                      <RefreshCw className="w-8 h-8 animate-spin" />
                      <span className="text-sm">Enviando imagem...</span>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                  e.target.value = '';
                }}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-[#00a8e8] text-[#00a8e8] hover:bg-[#00a8e8] hover:text-white"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Enviando...' : 'Enviar do Computador'}
                </Button>
                {form.hero_image && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => set('hero_image', '')}
                  >
                    <X className="w-4 h-4 mr-2" /> Remover
                  </Button>
                )}
              </div>

              {/* URL manual */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <Label className="text-xs text-gray-500">Ou insira uma URL de imagem externa:</Label>
                <Input
                  value={form.hero_image || ''}
                  onChange={(e) => set('hero_image', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {/* ── ABA CONTEÚDO ── */}
          <TabsContent value="conteudo" className="p-6 space-y-6">
            <EditableList
              label="Funcionalidades / Recursos"
              icon={CheckCircle2}
              items={form.features}
              onChange={(v) => set('features', v)}
              placeholder="Ex: Controle de estoque em tempo real"
            />
            <div className="border-t border-gray-100 pt-6">
              <EditableList
                label="Benefícios"
                icon={Star}
                items={form.benefits}
                onChange={(v) => set('benefits', v)}
                placeholder="Ex: Reduz 30% do tempo de processamento"
              />
            </div>
            <div className="border-t border-gray-100 pt-6">
              <EditableList
                label="Integrações"
                icon={Layers}
                items={form.integrations}
                onChange={(v) => set('integrations', v)}
                placeholder="Ex: SAP, TOTVS, Bling..."
              />
            </div>
          </TabsContent>

          {/* ── ABA VISUAL ── */}
          <TabsContent value="visual" className="p-6 space-y-6">
            {/* Seletor de Ícone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Palette className="w-4 h-4 text-[#00a8e8]" /> Ícone da Solução
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {ICON_OPTIONS.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set('icon', value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1 ${
                      form.icon === value
                        ? 'border-[#00a8e8] bg-[#00a8e8]/5 text-[#00a8e8]'
                        : 'border-gray-200 text-gray-500 hover:border-[#00a8e8]/40 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs leading-tight text-center">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tema de Cor */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Tag className="w-4 h-4 text-[#00a8e8]" /> Tema de Cor
              </Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map(({ value, label, bg }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set('color_theme', value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                      form.color_theme === value
                        ? 'border-gray-800 shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${bg}`} />
                    <span className="text-sm font-medium">{label}</span>
                    {form.color_theme === value && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview do card */}
            <div className="pt-4 border-t border-gray-100">
              <Label className="text-xs text-gray-500 mb-3 block">Preview do Card:</Label>
              <div className={`p-4 rounded-xl border-2 flex items-center gap-4 ${
                form.color_theme === 'orange' ? 'border-orange-200 bg-orange-50' :
                form.color_theme === 'blue'   ? 'border-blue-200 bg-blue-50' :
                form.color_theme === 'green'  ? 'border-green-200 bg-green-50' :
                form.color_theme === 'purple' ? 'border-purple-200 bg-purple-50' :
                form.color_theme === 'black'  ? 'border-gray-800 bg-gray-900' :
                'border-gray-200 bg-white'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  form.color_theme === 'orange' ? 'bg-orange-500' :
                  form.color_theme === 'blue'   ? 'bg-blue-500' :
                  form.color_theme === 'green'  ? 'bg-green-500' :
                  form.color_theme === 'purple' ? 'bg-purple-500' :
                  form.color_theme === 'black'  ? 'bg-gray-700' :
                  'bg-gray-200'
                }`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`font-bold ${form.color_theme === 'black' ? 'text-white' : 'text-gray-900'}`}>
                    {form.title || 'Título da Solução'}
                  </p>
                  <p className={`text-sm ${form.color_theme === 'black' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {form.subtitle || 'Subtítulo aqui'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── ABA SEO ── */}
          <TabsContent value="seo" className="p-6 space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
              <p className="font-semibold mb-1">💡 Dica de SEO</p>
              <p>Configure o título e descrição para melhorar o posicionamento nos buscadores como Google.</p>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Hash className="w-4 h-4 text-[#00a8e8]" /> Meta Title (Título para Google)
              </Label>
              <Input
                value={form.meta_title || ''}
                onChange={(e) => set('meta_title', e.target.value)}
                placeholder="Ex: ERP para Varejo | Unimaxx"
                maxLength={60}
                className="h-10"
              />
              <p className="text-xs text-gray-400">{(form.meta_title || '').length}/60 caracteres</p>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <AlignLeft className="w-4 h-4 text-[#00a8e8]" /> Meta Description
              </Label>
              <Textarea
                value={form.meta_description || ''}
                onChange={(e) => set('meta_description', e.target.value)}
                placeholder="Descrição que aparece no Google (máx. 160 caracteres)"
                rows={3}
                maxLength={160}
                className="resize-none"
              />
              <p className="text-xs text-gray-400">{(form.meta_description || '').length}/160 caracteres</p>
            </div>

            {/* Preview Google */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="text-xs text-gray-500 mb-3 font-medium">🔍 Preview no Google:</p>
              <div className="space-y-1">
                <p className="text-blue-700 text-lg font-medium leading-snug hover:underline cursor-pointer">
                  {form.meta_title || form.title || 'Título da Página | Unimaxx'}
                </p>
                <p className="text-green-700 text-xs">
                  {window.location.origin}/solucoes/{form.slug || 'slug-aqui'}
                </p>
                <p className="text-gray-600 text-sm">
                  {form.meta_description || form.description || 'Descrição da página aparecerá aqui...'}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <Button variant="outline" onClick={onCancel} className="px-6">
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="px-8 bg-[#00a8e8] hover:bg-[#0090c9] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : isNew ? 'Criar Página' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
export default function SolutionPagesManager() {
  const [pages, setPages] = useState<SolutionPage[]>([]);
  const [editingPage, setEditingPage] = useState<SolutionPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [backendError, setBackendError] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchPages(); }, []);

  const fetchPages = async () => {
    try {
      setBackendError(false);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/solution-pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const parsed = data.map((p: any) => ({
        ...p,
        features:     typeof p.features     === 'string' ? JSON.parse(p.features || '[]') : (p.features || []),
        benefits:     typeof p.benefits     === 'string' ? JSON.parse(p.benefits || '[]') : (p.benefits || []),
        integrations: typeof p.integrations === 'string' ? JSON.parse(p.integrations || '[]') : (p.integrations || []),
        is_active: !!p.is_active,
      }));
      setPages(parsed);
    } catch {
      setBackendError(true);
      toast({ title: 'Backend indisponível', description: 'Verifique se o servidor está rodando.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (pageData: SolutionPage, id?: number) => {
    try {
      const token = localStorage.getItem('token');
      const url = id ? `${API_URL}/admin/solution-pages/${id}` : `${API_URL}/admin/solution-pages`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (!res.ok) throw new Error();
      toast({ title: '✅ Página salva com sucesso!' });
      await fetchPages();
      setEditingPage(null);
      setIsCreating(false);
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
      throw new Error();
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Deseja excluir a página "${title}"?`)) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/solution-pages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      toast({ title: '🗑️ Página removida com sucesso!' });
      await fetchPages();
    } catch {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    } finally {
      setDeleting(null);
    }
  };

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── LOADING ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-[#00a8e8] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Carregando páginas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Páginas de Soluções</h1>
          <p className="text-gray-500 mt-1">
            Gerencie as páginas individuais de cada solução com conteúdo completo e imagens
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchPages} disabled={loading}
            className="text-gray-600">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-[#00a8e8] hover:bg-[#0090c9] text-white shadow-md shadow-[#00a8e8]/20"
          >
            <Plus className="w-4 h-4 mr-2" /> Nova Página
          </Button>
        </div>
      </div>

      {/* Erro de backend */}
      {backendError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Servidor indisponível</p>
            <p className="text-sm text-red-500">Verifique se o backend está rodando em {API_URL}</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto border-red-200 text-red-600 hover:bg-red-100"
            onClick={fetchPages}>
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total de Páginas', value: pages.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Páginas Ativas',   value: pages.filter(p => p.is_active).length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Inativas',         value: pages.filter(p => !p.is_active).length, color: 'text-gray-500', bg: 'bg-gray-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar páginas por título ou slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11"
        />
        {searchTerm && (
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lista de Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((page) => {
          const imageUrl = page.hero_image
            ? page.hero_image.startsWith('http')
              ? page.hero_image
              : `${BASE_URL}${page.hero_image}`
            : null;

          return (
            <Card key={page.id} className={`group overflow-hidden transition-all hover:shadow-lg border-2 ${
              page.is_active ? 'border-gray-100 hover:border-[#00a8e8]/30' : 'border-dashed border-gray-200 opacity-70'
            }`}>
              {/* Mini preview da imagem */}
              {imageUrl && (
                <div className="h-24 overflow-hidden">
                  <img src={imageUrl} alt={page.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}

              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-gray-900 text-base truncate">{page.title}</h3>
                      <Badge variant={page.is_active ? 'default' : 'secondary'}
                        className={`text-xs ${page.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500'}`}>
                        {page.is_active ? '● Ativa' : '○ Inativa'}
                      </Badge>
                    </div>

                    <p className="text-xs text-[#00a8e8] font-mono bg-[#00a8e8]/5 px-2 py-0.5 rounded inline-block">
                      /solucoes/{page.slug}
                    </p>

                    {page.subtitle && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{page.subtitle}</p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
                      {page.features.length > 0 && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00a8e8]" />
                          {page.features.length} funcionalidades
                        </span>
                      )}
                      {page.benefits.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {page.benefits.length} benefícios
                        </span>
                      )}
                      {page.integrations.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-purple-400" />
                          {page.integrations.length} integrações
                        </span>
                      )}
                      {!imageUrl && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <ImageIcon className="w-3 h-3" />
                          sem imagem
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-[#00a8e8] border-[#00a8e8]/30 hover:bg-[#00a8e8] hover:text-white hover:border-[#00a8e8]"
                    onClick={() => setEditingPage(page)}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => window.open(`/solucoes/${page.slug}`, '_blank')}
                    title="Visualizar página"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-200 hover:bg-red-50 hover:text-red-600"
                    disabled={deleting === page.id}
                    onClick={() => handleDelete(page.id, page.title)}
                    title="Excluir página"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-gray-400" />
          </div>
          {searchTerm ? (
            <>
              <p className="font-semibold text-gray-700">Nenhuma página encontrada</p>
              <p className="text-sm text-gray-400 mt-1">Tente buscar por outro termo</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                Limpar busca
              </Button>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-700">Nenhuma página de solução criada</p>
              <p className="text-sm text-gray-400 mt-1">Crie a primeira página para começar</p>
              <Button
                onClick={() => setIsCreating(true)}
                className="mt-4 bg-[#00a8e8] hover:bg-[#0090c9] text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Criar Primeira Página
              </Button>
            </>
          )}
        </div>
      )}

      {/* Modal de Criação */}
      {isCreating && (
        <PageForm
          page={EMPTY_PAGE}
          isNew={true}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {/* Modal de Edição */}
      {editingPage && (
        <PageForm
          page={editingPage}
          isNew={false}
          onSave={handleSave}
          onCancel={() => setEditingPage(null)}
        />
      )}
    </div>
  );
}
