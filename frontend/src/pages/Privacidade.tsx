import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Privacidade() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 linx-purple overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-white/10 text-orange-400 rounded-full text-sm font-medium mb-6 border border-white/10">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Política de <span className="linx-gradient-text">Privacidade</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sua privacidade é importante para nós. Saiba como protegemos seus dados.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Compromisso com a Privacidade</h2>
                  <p className="text-gray-600">Última atualização: 15 de Janeiro de 2025</p>
                </div>
              </div>
              <p className="text-gray-600">
                A Linx está comprometida em proteger a privacidade e segurança dos dados pessoais 
                de todos os nossos clientes, parceiros e usuários. Esta política descreve como 
                coletamos, usamos, armazenamos e protegemos suas informações.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-orange-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">1. Dados que Coletamos</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Podemos coletar os seguintes tipos de informações:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong>Dados de identificação:</strong> nome, CPF, CNPJ, endereço, e-mail, telefone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong>Dados comerciais:</strong> informações sobre sua empresa, histórico de compras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong>Dados de uso:</strong> como você interage com nossos sistemas e serviços</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong>Dados técnicos:</strong> IP, tipo de navegador, dispositivo utilizado</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="text-orange-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">2. Como Usamos seus Dados</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Fornecer e melhorar nossos produtos e serviços</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Processar transações e enviar notificações relacionadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Oferecer suporte técnico e atendimento ao cliente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Enviar comunicações sobre produtos, serviços e promoções</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Cumprir obrigações legais e regulatórias</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="text-orange-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">3. Segurança dos Dados</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Criptografia de dados em trânsito e em repouso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Firewalls e sistemas de detecção de intrusão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Controles de acesso rigorosos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Auditorias regulares de segurança</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Treinamento contínuo de colaboradores</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seus Direitos</h2>
                <p className="text-gray-600 mb-4">
                  Você tem os seguintes direitos em relação aos seus dados pessoais:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Acessar seus dados pessoais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Solicitar correção de dados incompletos ou desatualizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Solicitar exclusão dos seus dados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Revogar consentimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Solicitar portabilidade dos dados</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contato</h2>
                <p className="text-gray-600">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600"><strong>E-mail:</strong> privacidade@linx.com.br</p>
                  <p className="text-gray-600"><strong>Telefone:</strong> 0800 770 3320</p>
                  <p className="text-gray-600"><strong>Endereço:</strong> Av. das Nações Unidas, 7221 - São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold">Linx</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Líder em tecnologia para o varejo. 
                Transformando complexidade em resultado desde 1985.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Soluções</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/solucao/erp" className="hover:text-orange-500 transition-colors">Linx ERP</Link></li>
                <li><Link to="/solucao/pdv" className="hover:text-orange-500 transition-colors">Linx PDV</Link></li>
                <li><Link to="/solucao/commerce" className="hover:text-orange-500 transition-colors">Linx Commerce</Link></li>
                <li><Link to="/solucao/pay" className="hover:text-orange-500 transition-colors">Linx Pay</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Institucional</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/sobre" className="hover:text-orange-500 transition-colors">Sobre Nós</Link></li>
                <li><Link to="/carreiras" className="hover:text-orange-500 transition-colors">Carreiras</Link></li>
                <li><Link to="/imprensa" className="hover:text-orange-500 transition-colors">Imprensa</Link></li>
                <li><Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Suporte</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/suporte" className="hover:text-orange-500 transition-colors">Central de Ajuda</Link></li>
                <li><Link to="/cliente" className="hover:text-orange-500 transition-colors">Área do Cliente</Link></li>
                <li><Link to="/cliente" className="hover:text-orange-500 transition-colors">Fale Conosco</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Linx Sistemas e Consultoria Ltda. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacidade" className="hover:text-orange-500 transition-colors">Política de Privacidade</Link>
              <Link to="/termos" className="hover:text-orange-500 transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Privacidade;
