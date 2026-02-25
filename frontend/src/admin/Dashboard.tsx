import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  Tags,
  BarChart3,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  const { data, loading } = useData();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const stats = [
    {
      title: 'Total de Soluções',
      value: data.solutions.filter(s => s.active === 1).length,
      icon: Briefcase,
      color: 'bg-blue-500',
      link: '/admin/solucoes'
    },
    {
      title: 'Total de Segmentos',
      value: data.segments.filter(s => s.active === 1).length,
      icon: Tags,
      color: 'bg-green-500',
      link: '/admin/segmentos'
    },
    {
      title: 'Estatísticas',
      value: data.stats.length,
      icon: BarChart3,
      color: 'bg-purple-500',
      link: '/admin/estatisticas'
    },
    {
      title: 'Itens de Conteúdo',
      value: Object.keys(data.content).length,
      icon: FileText,
      color: 'bg-orange-500',
      link: '/admin/conteudo'
    },
  ];

  const quickActions = [
    {
      title: 'Editar Conteúdo',
      description: 'Modifique textos e informações do site',
      icon: FileText,
      link: '/admin/conteudo',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Gerenciar Soluções',
      description: 'Adicione, edite ou remova soluções',
      icon: Briefcase,
      link: '/admin/solucoes',
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Atualizar Segmentos',
      description: 'Gerencie os segmentos atendidos',
      icon: Tags,
      link: '/admin/segmentos',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Ver Estatísticas',
      description: 'Atualize números e métricas',
      icon: BarChart3,
      link: '/admin/estatisticas',
      color: 'text-orange-600 bg-orange-50'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a8e8]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Dashboard Unimaxx
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="mt-4 p-0 h-auto text-[#00a8e8] hover:text-[#0090c9]"
                  onClick={() => navigate(stat.link)}
                >
                  Ver detalhes <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={() => navigate(action.link)}
                className="group text-left p-6 bg-white rounded-xl border border-gray-200 hover:border-[#00a8e8] hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Site */}
      <Card className="bg-gradient-to-r from-[#00a8e8] to-[#0077aa]">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">Visualizar Site</h3>
              <p className="text-white/80">
                Veja como o site está aparecendo para os visitantes
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-[#00a8e8] hover:bg-gray-100"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Abrir Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
