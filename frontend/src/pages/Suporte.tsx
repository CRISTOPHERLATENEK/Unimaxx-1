import { 
  Search, BookOpen, MessageCircle, Phone, 
  Mail, FileText, Video, ArrowRight, CheckCircle2,
  HelpCircle, Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Suporte() {
  const categorias = [
    {
      titulo: 'Primeiros Passos',
      icon: <BookOpen size={32} />,
      artigos: ['Como começar', 'Configuração inicial', 'Treinamentos básicos']
    },
    {
      titulo: 'Linx ERP',
      icon: <FileText size={32} />,
      artigos: ['Gestão financeira', 'Controle de estoque', 'Relatórios']
    },
    {
      titulo: 'Linx PDV',
      icon: <CheckCircle2 size={32} />,
      artigos: ['Operação de caixa', 'Cancelamentos', 'Fechamento']
    },
    {
      titulo: 'Linx Commerce',
      icon: <MessageCircle size={32} />,
      artigos: ['Configuração da loja', 'Produtos', 'Pedidos']
    },
    {
      titulo: 'Vídeo Tutoriais',
      icon: <Video size={32} />,
      artigos: ['Tutoriais ERP', 'Tutoriais PDV', 'Webinars']
    },
    {
      titulo: 'Manutenção',
      icon: <Wrench size={32} />,
      artigos: ['Atualizações', 'Backup', 'Restauração']
    },
  ];

  const faqs = [
    {
      pergunta: 'Como faço para redefinir minha senha?',
      resposta: 'Acesse a página de login e clique em "Esqueci minha senha". Você receberá um e-mail com instruções para criar uma nova senha.'
    },
    {
      pergunta: 'Qual o horário de atendimento do suporte?',
      resposta: 'Nosso suporte técnico está disponível de segunda a sexta, das 8h às 20h, e aos sábados das 9h às 14h.'
    },
    {
      pergunta: 'Como reportar um bug ou problema?',
      resposta: 'Você pode abrir um chamado através da Área do Cliente ou entrar em contato pelo telefone 0800 770 3320.'
    },
    {
      pergunta: 'Onde encontro os manuais do sistema?',
      resposta: 'Todos os manuais estão disponíveis na seção de Documentação da Área do Cliente, organizados por produto.'
    },
    {
      pergunta: 'Como solicitar uma nova funcionalidade?',
      resposta: 'Envie sua sugestão através do formulário na Área do Cliente. Nossa equipe de produto avalia todas as sugestões.'
    },
  ];

  const canais = [
    {
      icon: <Phone size={32} />,
      titulo: '0800 770 3320',
      descricao: 'Atendimento telefônico',
      horario: 'Seg-Sex: 8h às 20h'
    },
    {
      icon: <Mail size={32} />,
      titulo: 'suporte@linx.com.br',
      descricao: 'Suporte por e-mail',
      horario: 'Resposta em até 24h'
    },
    {
      icon: <MessageCircle size={32} />,
      titulo: 'Chat Online',
      descricao: 'Atendimento em tempo real',
      horario: 'Seg-Sex: 8h às 18h'
    },
  ];

  const heroFallback = (
    <section className="relative py-32 linx-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
          Central de Ajuda
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Como podemos <span className="linx-gradient-text">ajudar?</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Encontre respostas, tutoriais e suporte para todas as nossas soluções.
        </p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <Input
            placeholder="Buscar artigos, tutoriais, dúvidas..."
            className="pl-14 h-16 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg"
          />
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="suporte" fallback={heroFallback} />

      {/* Categorias */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Categorias
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Escolha um <span className="text-orange-500">tema</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {categoria.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                  {categoria.titulo}
                </h3>
                <ul className="space-y-2">
                  {categoria.artigos.map((artigo, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <ArrowRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {artigo}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perguntas <span className="text-orange-500">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{faq.pergunta}</h3>
                    <p className="text-gray-600">{faq.resposta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Canais de Atendimento */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Contato
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Canais de <span className="text-orange-500">Atendimento</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {canais.map((canal, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                  {canal.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{canal.titulo}</h3>
                <p className="text-gray-600 mb-2">{canal.descricao}</p>
                <p className="text-sm text-orange-500">{canal.horario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-24 linx-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <h3 className="text-white font-bold text-lg">Todos os sistemas operacionais</h3>
                  <p className="text-gray-300 text-sm">Última atualização: há 5 minutos</p>
                </div>
              </div>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Ver Status Completo
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Suporte;
