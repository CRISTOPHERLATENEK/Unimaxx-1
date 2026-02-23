import { useState } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Check } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Segment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  'Shirt',
  'Footprints',
  'Pill',
  'Sparkles',
  'UtensilsCrossed',
  'Bike',
  'Gift',
  'Tv',
  'Glasses',
  'Home',
  'Fuel',
  'Coffee',
  'BookOpen',
  'Dumbbell',
  'Car',
  'Plane',
  'Heart',
];

export function SegmentsManager() {
  const { data, updateSegment, deleteSegment } = useData();
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!editingSegment) return;

    try {
      await updateSegment(editingSegment);
      setIsDialogOpen(false);
      setEditingSegment(null);

      toast({
        title: 'Sucesso!',
        description: 'Segmento salvo com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar segmento.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este segmento?')) return;

    try {
      await deleteSegment(id);
      toast({
        title: 'Sucesso!',
        description: 'Segmento excluído com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir segmento.',
        variant: 'destructive',
      });
    }
  };

  const openNewSegment = () => {
    const newSegment: Segment = {
      segment_id: `segment-${Date.now()}`,
      name: '',
      icon: 'Shirt',
      order_num: (data.segments || []).length,
      active: 1
    };

    setEditingSegment(newSegment);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Segmentos</h1>
          <p className="text-gray-500 mt-1">
            Adicione, edite ou remova segmentos do site
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openNewSegment}
              className="bg-[#00a8e8] hover:bg-[#0090c9]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Segmento
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSegment ? 'Editar Segmento' : 'Novo Segmento'}
              </DialogTitle>
            </DialogHeader>

            {editingSegment && (
              <div className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={editingSegment.name}
                    onChange={(e) =>
                      setEditingSegment({
                        ...editingSegment,
                        name: e.target.value
                      })
                    }
                    placeholder="Nome do segmento"
                  />
                </div>

                <div>
                  <Label>Ícone</Label>
                 <Select
  value={editingSegment?.icon || 'Shirt'}
  onValueChange={(value) => {
    setEditingSegment((prev) =>
      prev ? { ...prev, icon: value } : prev
    );
  }}
>
                    <SelectTrigger>
<SelectValue>
  {editingSegment?.icon || 'Selecione um ícone'}
</SelectValue>                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-[#00a8e8] hover:bg-[#0090c9]"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Segments Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data.segments || [])
          .sort((a, b) => a.order_num - b.order_num)
          .map((segment) => (
            <div
              key={segment.segment_id}
              className={`p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow ${
                segment.active === 0 ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />

                <div className="w-10 h-10 rounded-full bg-[#00a8e8]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00a8e8] font-medium text-sm">
                    {segment.name?.[0] || 'S'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {segment.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {segment.icon}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingSegment(segment);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(segment.segment_id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {(data.segments || []).length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">
            Nenhum segmento cadastrado
          </p>
          <Button
            onClick={openNewSegment}
            variant="outline"
            className="mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar primeiro segmento
          </Button>
        </div>
      )}
    </div>
  );
}