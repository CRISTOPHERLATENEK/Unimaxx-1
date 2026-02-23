import { useState, useEffect } from 'react';
import { Save, User, Lock, Database, Palette, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { user } = useAuth();
  const { data, updateSettings } = useData();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (data.settings) {
      setEditedSettings(data.settings);
    }
  }, [data.settings]);

  const handleProfileSave = () => {
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas com sucesso.',
    });
  };

  const handlePasswordSave = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Senha alterada',
      description: 'Sua senha foi alterada com sucesso.',
    });
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleColorChange = (key: string, value: string) => {
    setEditedSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSettingsSave = async () => {
    setSavingSettings(true);
    try {
      await updateSettings(editedSettings);
      toast({
        title: 'Sucesso!',
        description: 'Configurações de cores atualizadas com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar configurações.',
        variant: 'destructive',
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSettingsReset = () => {
    setEditedSettings(data.settings);
    toast({
      title: 'Alterações descartadas',
      description: 'As cores voltaram aos valores salvos.',
    });
  };

  const colorFields = [
    { key: 'primary_color', label: 'Cor Primária (Botões, Destaques)' },
    { key: 'secondary_color', label: 'Cor Secundária (Gradientes)' },
    { key: 'accent_color', label: 'Cor de Acento' },
    { key: 'bg_color', label: 'Cor de Fundo Global' },
    { key: 'text_color', label: 'Cor do Texto Principal' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500 mt-1">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      <Tabs defaultValue="cores" className="w-full">
        <TabsList className="flex-wrap h-auto gap-2">
          <TabsTrigger value="cores">
            <Palette className="w-4 h-4 mr-2" />
            Cores do Site
          </TabsTrigger>
          <TabsTrigger value="perfil">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Lock className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="sistema">
            <Database className="w-4 h-4 mr-2" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="cores">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Paleta de Cores Global</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSettingsReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resetar
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSettingsSave} 
                  disabled={savingSettings}
                  className="bg-[#00a8e8] hover:bg-[#0090c9]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {savingSettings ? 'Salvando...' : 'Salvar Cores'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {colorFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key}>{field.label}</Label>
                      <div className="flex gap-3">
                        <Input
                          type="color"
                          id={field.key}
                          value={editedSettings[field.key] || '#000000'}
                          onChange={(e) => handleColorChange(field.key, e.target.value)}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={editedSettings[field.key] || ''}
                          onChange={(e) => handleColorChange(field.key, e.target.value)}
                          className="font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Prévia em Tempo Real</h3>
                  <div className="space-y-4">
                    <div 
                      className="p-4 rounded-lg text-white font-bold text-center shadow-sm"
                      style={{ backgroundColor: editedSettings.primary_color }}
                    >
                      Botão Primário
                    </div>
                    <div 
                      className="p-4 rounded-lg border-2 font-bold text-center"
                      style={{ borderColor: editedSettings.primary_color, color: editedSettings.primary_color }}
                    >
                      Botão Outline
                    </div>
                    <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-200">
                      <p style={{ color: editedSettings.text_color }}>
                        Este é um exemplo de como o texto ficará sobre o fundo.
                      </p>
                      <span className="text-sm" style={{ color: editedSettings.primary_color }}>
                        Link de exemplo
                      </span>
                    </div>
                    <div 
                      className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
                      style={{ background: `linear-gradient(to right, ${editedSettings.primary_color}, ${editedSettings.secondary_color})` }}
                    >
                      Gradiente de Destaque
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="seu@email.com"
                  type="email"
                />
              </div>
              <Button onClick={handleProfileSave} className="bg-[#00a8e8] hover:bg-[#0090c9]">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Senha Atual</Label>
                <Input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label>Nova Senha</Label>
                <Input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label>Confirmar Nova Senha</Label>
                <Input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <Button onClick={handlePasswordSave} className="bg-[#00a8e8] hover:bg-[#0090c9]">
                <Lock className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="sistema">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Versão</p>
                  <p className="font-semibold">1.0.0</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Ambiente</p>
                  <p className="font-semibold">Produção</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Banco de Dados</p>
                  <p className="font-semibold">SQLite</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">API URL</p>
                  <p className="font-semibold text-xs truncate">
                    {import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Backup de Dados</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Exporte todos os dados do site para backup
                </p>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
