import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2,
  MessageSquare, User, Building, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { PageBanner } from '@/components/PageBanner';

function Cliente() {
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'contato' | 'login'>('contato');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const contatos = [
    {
      icon: <Phone size={24} />,
      titulo: '0800 770 3320',
      descricao: 'Atendimento gratuito',
      info: 'Seg-Sex: 8h às 20h'
    },
    {
      icon: <Mail size={24} />,
      titulo: 'contato@linx.com.br',
      descricao: 'E-mail comercial',
      info: 'Resposta em 24h'
    },
    {
      icon: <MapPin size={24} />,
      titulo: 'São Paulo, SP',
      descricao: 'Av. das Nações Unidas, 7221',
      info: 'Brooklin Novo'
    },
    {
      icon: <Clock size={24} />,
      titulo: 'Horário de Atendimento',
      descricao: 'Segunda a Sexta',
      info: '8h às 18h'
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
          Contato
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Vamos <span className="linx-gradient-text">conversar?</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Entre em contato conosco. Nossa equipe está pronta para ajudar você.
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Dinâmico (admin) ou Hero estático (fallback) */}
      <PageBanner page="cliente" fallback={heroFallback} />

      {/* Tabs */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('contato')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'contato'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Fale Conosco
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'login'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Área do Cliente
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'contato' ? (
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Entre em <span className="text-orange-500">contato</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário ao lado ou utilize um de nossos canais de atendimento. 
                  Retornaremos o mais breve possível.
                </p>

                <div className="space-y-6">
                  {contatos.map((contato, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {contato.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{contato.titulo}</h3>
                        <p className="text-gray-600">{contato.descricao}</p>
                        <p className="text-sm text-orange-500">{contato.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Envie uma mensagem
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input placeholder="Seu nome" className="pl-12 h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input placeholder="Nome da empresa" className="pl-12 h-12" />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input type="email" placeholder="seu@email.com" className="pl-12 h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input placeholder="(00) 00000-0000" className="pl-12 h-12" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                    <select className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Selecione o assunto</option>
                      <option>Quero conhecer as soluções</option>
                      <option>Sou cliente e preciso de suporte</option>
                      <option>Parcerias</option>
                      <option>Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                      <Textarea placeholder="Como podemos ajudar?" className="pl-12 min-h-[150px]" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all">
                    <Send className="mr-2" size={20} />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-4">
                    <User size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Acesse sua conta
                  </h3>
                  <p className="text-gray-600">
                    Entre com suas credenciais para acessar a Área do Cliente
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <Input type="password" placeholder="••••••••" className="h-12" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <button type="button" className="text-orange-500 hover:underline">
                      Esqueci minha senha
                    </button>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all">
                    Entrar
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    Ainda não tem conta?{' '}
                    <button onClick={() => setActiveTab('contato')} className="text-orange-500 hover:underline font-medium">
                      Solicite acesso
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {activeTab === 'contato' ? 'Mensagem Enviada!' : 'Login em Desenvolvimento'}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {activeTab === 'contato' 
                ? 'Obrigado pelo contato! Nossa equipe retornará em breve.'
                : 'A Área do Cliente está em desenvolvimento. Entre em contato conosco para mais informações.'
              }
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

      <Footer />
    </div>
  );
}

export default Cliente;
