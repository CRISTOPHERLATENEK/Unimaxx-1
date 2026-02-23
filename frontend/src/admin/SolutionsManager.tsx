import { useState } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Check } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Solution } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const iconOptions = [
  'Building2',
  'Monitor',
  'ShoppingCart',
  'CreditCard',
  'Truck',
  'BarChart3',
  'Smartphone',
  'Globe',
  'Settings',
  'Zap',
];

export function SolutionsManager() {
  const { data, updateSolution, deleteSolution } = useData();
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!editingSolution) return;

    try {
      await updateSolution(editingSolution);
      setIsDialogOpen(false);
      setEditingSolution(null);
      toast({
        title: 'Sucesso!',
        description: 'Solução atualizada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar solução.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta solução?')) return;

    try {
      await deleteSolution(id);
      toast({
        title: 'Sucesso!',
        description: 'Solução excluída com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir solução.',
        variant: 'destructive',
      });
    }
  };

  const handleAddFeature = () => {
    if (!editingSolution) return;
    setEditingSolution({
      ...editingSolution,
      features: [...editingSolution.features, '']
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingSolution) return;
    const newFeatures = editingSolution.features.filter((_, i) => i !== index);
    setEditingSolution({ ...editingSolution, features: newFeatures });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editingSolution) return;
    const newFeatures = [...editingSolution.features];
    newFeatures[index] = value;
    setEditingSolution({ ...editingSolution, features: newFeatures });
  };

  const openNewSolution = () => {
    const newSolution: Solution = {
      id: '',
      solution_id: `solution-${Date.now()}`,
      title: '',
      description: '',
      features: [''],
      cta_text: 'Saiba mais',
      icon: 'Building2',
      order_num: data.solutions.length,
      active: 1
    };
    setEditingSolution(newSolution);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Soluções</h1>
          <p className="text-gray-500 mt-1">
            Adicione, edite ou remova soluções do site
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewSolution} className="bg-[#00a8e8] hover:bg-[#0090c9]">
              <Plus className="w-4 h-4 mr-2" />
              Nova Solução
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSolution?.id ? 'Editar Solução' : 'Nova Solução'}
              </DialogTitle>
            </DialogHeader>
            {editingSolution && (
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={editingSolution.title}
                    onChange={(e) => setEditingSolution({ ...editingSolution, title: e.target.value })}
                    placeholder="Nome da solução"
                  />
                </div>

                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={editingSolution.description}
                    onChange={(e) => setEditingSolution({ ...editingSolution, description: e.target.value })}
                    placeholder="Descrição da solução"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Ícone</Label>
                  <Select
                    value={editingSolution.icon}
                    onValueChange={(value) => setEditingSolution({ ...editingSolution, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Texto do Botão</Label>
                  <Input
                    value={editingSolution.cta_text}
                    onChange={(e) => setEditingSolution({ ...editingSolution, cta_text: e.target.value })}
                    placeholder="Ex: Saiba mais"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Funcionalidades</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editingSolution.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Funcionalidade ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1 bg-[#00a8e8] hover:bg-[#0090c9]">
                    <Check className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Solutions List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="divide-y divide-gray-200">
          {data.solutions
            .sort((a, b) => a.order_num - b.order_num)
            .map((solution) => (
            <div
              key={solution.solution_id}
              className={`p-4 flex items-center gap-4 hover:bg-gray-50 ${solution.active === 0 ? 'opacity-50' : ''}`}
            >
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              
              <div className="w-10 h-10 rounded-lg bg-[#00a8e8]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00a8e8] font-medium">
                  {solution.icon?.[0] || 'S'}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{solution.title}</h3>
                <p className="text-sm text-gray-500 truncate">{solution.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingSolution(solution);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(solution.solution_id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {data.solutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma solução cadastrada</p>
            <Button onClick={openNewSolution} variant="outline" className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeira solução
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
