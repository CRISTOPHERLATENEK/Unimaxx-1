import { useState } from 'react';
import { 
  Briefcase, MapPin, DollarSign, Search, 
  Heart, Zap, Users, Trophy, Coffee, ArrowRight,
  CheckCircle2, GraduationCap, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Carreiras() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('todas');

  const vagas = [
    {
      id: 1,
      titulo: 'Desenvolvedor Full Stack',
      area: 'tecnologia',
      local: 'São Paulo, SP',
      tipo: 'CLT',
      salario: 'R$ 8.000 - R$ 15.000',
      descricao: 'Desenvolvimento de soluções inovadoras para o varejo brasileiro.',
      requisitos: ['3+ anos de experiência', 'React e Node.js', 'Banco de dados SQL']
    },
    {
      id: 2,
      titulo: 'Product Manager',
      area: 'produto',
      local: 'São Paulo, SP',
      tipo: 'CLT',
      salario: 'R$ 12.000 - R$ 20.000',
      descricao: 'Gestão de produtos digitais para o mercado de varejo.',
      requisitos: ['5+ anos de experiência', 'Experiência em produto B2B', 'Metodologias ágeis']
    },
    {
      id: 3,
      titulo: 'Consultor de Vendas',
      area: 'vendas',
      local: 'Rio de Janeiro, RJ',
      tipo: 'CLT + Comissão',
      salario: 'R$ 5.000 + Comissão',
      descricao: 'Prospecção e fechamento de novos clientes no segmento de varejo.',
      requisitos: ['2+ anos em vendas B2B', 'Experiência em tecnologia', 'Disponibilidade para viagens']
    },
    {
      id: 4,
      titulo: 'Analista de Suporte',
      area: 'suporte',
      local: 'Remoto',
      tipo: 'CLT',
      salario: 'R$ 4.000 - R$ 6.000',
      descricao: 'Atendimento e suporte técnico aos clientes Linx.',
      requisitos: ['Experiência em suporte técnico', 'Conhecimento em ERP', 'Boa comunicação']
    },
    {
      id: 5,
      titulo: 'UX Designer',
      area: 'design',
      local: 'São Paulo, SP',
      tipo: 'CLT',
      salario: 'R$ 7.000 - R$ 12.000',
      descricao: 'Design de interfaces e experiência do usuário para produtos Linx.',
      requisitos: ['Portfólio sólido', 'Figma e ferramentas de prototipagem', 'Experiência em pesquisa com usuários']
    },
    {
      id: 6,
      titulo: 'Analista de Marketing Digital',
      area: 'marketing',
      local: 'São Paulo, SP',
      tipo: 'CLT',
      salario: 'R$ 5.000 - R$ 8.000',
      descricao: 'Gestão de campanhas digitais e geração de leads.',
      requisitos: ['2+ anos em marketing digital', 'Google Ads e Analytics', 'Inbound marketing']
    },
  ];

  const beneficios = [
    { icon: <Heart size={24} />, titulo: 'Saúde e Bem-estar', descricao: 'Plano de saúde e odontológico para você e dependentes' },
    { icon: <DollarSign size={24} />, titulo: 'Remuneração Competitiva', descricao: 'Salários alinhados com o mercado e bônus por performance' },
    { icon: <Coffee size={24} />, titulo: 'Ambiente Descontraído', descricao: 'Escritórios modernos com áreas de convivência' },
    { icon: <GraduationCap size={24} />, titulo: 'Desenvolvimento', descricao: 'Cursos, treinamentos e budget para educação' },
    { icon: <Globe size={24} />, titulo: 'Trabalho Remoto', descricao: 'Flexibilidade para trabalhar de onde quiser' },
    { icon: <Trophy size={24} />, titulo: 'Reconhecimento', descricao: 'Programas de premiação e celebração de conquistas' },
  ];

  const cultura = [
    { icon: <Zap size={32} />, titulo: 'Inovação', descricao: 'Buscamos sempre novas formas de fazer as coisas melhor' },
    { icon: <Users size={32} />, titulo: 'Colaboração', descricao: 'Trabalhamos juntos para alcançar grandes resultados' },
    { icon: <Heart size={32} />, titulo: 'Paixão', descricao: 'Amamos o que fazemos e isso se reflete no nosso trabalho' },
  ];

  const areas = ['todas', 'tecnologia', 'produto', 'vendas', 'suporte', 'design', 'marketing'];

  const vagasFiltradas = vagas.filter(vaga => {
    const matchSearch = vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       vaga.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchArea = selectedArea === 'todas' || vaga.area === selectedArea;
    return matchSearch && matchArea;
  });

  const handleApply = (vaga: typeof vagas[0]) => {
    setDialogContent({
      title: `Candidatura: ${vaga.titulo}`,
      description: 'Obrigado pelo interesse! Em breve nossa equipe de RH entrará em contato com você.'
    });
    setShowDialog(true);
  };

  const heroFallback = (
    <section className="relative py-32 linx-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
          Carreiras
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Faça parte do <span className="linx-gradient-text">nosso time</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Junte-se a mais de 4.000 linxers e ajude a transformar o varejo brasileiro.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="carreiras" fallback={heroFallback} />

      {/* Cultura */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Nossa Cultura
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que nos <span className="text-orange-500">move</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cultura.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.titulo}</h3>
                <p className="text-gray-600">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Benefícios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que trabalhar na <span className="text-orange-500">Linx</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6 hover:bg-orange-50 transition-colors">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.titulo}</h3>
                  <p className="text-gray-600 text-sm">{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Vagas Abertas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Encontre sua <span className="text-orange-500">oportunidade</span>
            </h2>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar vagas..."
                  className="pl-12 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedArea === area
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de Vagas */}
          <div className="space-y-4">
            {vagasFiltradas.map((vaga) => (
              <div key={vaga.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{vaga.titulo}</h3>
                    <p className="text-gray-600 mb-4">{vaga.descricao}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-orange-500" />
                        {vaga.local}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} className="text-orange-500" />
                        {vaga.tipo}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-orange-500" />
                        {vaga.salario}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {vaga.requisitos.map((req, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleApply(vaga)}
                    className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap"
                  >
                    Candidatar-se
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            ))}

            {vagasFiltradas.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                <p className="text-gray-600">Tente ajustar seus filtros ou busque por outro termo.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Não encontrou a vaga <span className="linx-gradient-text">ideal?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Envie seu currículo para nosso banco de talentos. Entraremos em contato quando houver uma oportunidade.
          </p>
          <Button
            onClick={() => {
              setDialogContent({
                title: 'Banco de Talentos',
                description: 'Obrigado pelo interesse! Seu currículo foi cadastrado em nosso banco de talentos.'
              });
              setShowDialog(true);
            }}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            Cadastrar Currículo
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <Footer />

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">{dialogContent.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-orange-500" size={32} />
            </div>
          </div>
          <Button 
            onClick={() => setShowDialog(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Carreiras;
