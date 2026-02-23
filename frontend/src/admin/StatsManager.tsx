import { useState } from 'react';
import { Plus, Trash2, Save, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { NumberStat } from '@/types';

export function StatsManager() {
  const { data, addStat, updateStat, deleteStat } = useData();
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const stats = data.stats ? data.stats.filter(s => s.section === 'numbers') : [];

  const handleAdd = async () => {
    const newStat: NumberStat = {
      id: '',
      stat_id: `stat-${Date.now()}`,
      value: '0',
      label: 'Nova Estatística',
      section: 'numbers',
      order_num: stats.length
    };
    try {
      await addStat(newStat);
      toast({ title: 'Sucesso', description: 'Estatística adicionada com sucesso!' });
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao adicionar estatística.', variant: 'destructive' });
    }
  };

  const handleUpdate = async (stat: NumberStat) => {
    setSaving(stat.stat_id);
    try {
      await updateStat(stat);
      toast({ title: 'Sucesso', description: 'Estatística atualizada com sucesso!' });
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao atualizar estatística.', variant: 'destructive' });
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (statId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta estatística?')) return;
    try {
      await deleteStat(statId);
      toast({ title: 'Sucesso', description: 'Estatística excluída com sucesso!' });
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao excluir estatística.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Estatísticas</h1>
          <p className="text-gray-500 mt-1">Adicione, edite ou remova os números de destaque do site.</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#00a8e8] hover:bg-[#0090c9]">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Estatística
        </Button>
      </div>

      <div className="grid gap-6">
        {stats.map((stat) => (
          <div key={stat.stat_id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Valor (ex: 900, 4K+)</Label>
                <Input 
                  defaultValue={stat.value} 
                  onBlur={(e) => {
                    stat.value = e.target.value;
                  }}
                  className="focus:border-[#00a8e8] focus:ring-[#00a8e8]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Rótulo (ex: Empresas Atendidas)</Label>
                <Input 
                  defaultValue={stat.label} 
                  onBlur={(e) => {
                    stat.label = e.target.value;
                  }}
                  className="focus:border-[#00a8e8] focus:ring-[#00a8e8]"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 md:flex-none border-[#00a8e8] text-[#00a8e8] hover:bg-[#00a8e8] hover:text-white"
                onClick={() => handleUpdate(stat)}
                disabled={saving === stat.stat_id}
              >
                <Save className={`w-4 h-4 mr-2 ${saving === stat.stat_id ? 'animate-spin' : ''}`} />
                {saving === stat.stat_id ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 md:flex-none"
                onClick={() => handleDelete(stat.stat_id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        ))}
        
        {stats.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-lg">Nenhuma estatística cadastrada.</p>
            <p className="text-gray-400 text-sm mt-1">Clique no botão acima para adicionar a primeira.</p>
          </div>
        )}
      </div>
    </div>
  );
}
