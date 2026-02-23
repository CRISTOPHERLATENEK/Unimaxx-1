import { FileText, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

function Termos() {
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
            Termos de <span className="linx-gradient-text">Uso</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Condições e regras para utilização dos nossos serviços.
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
                  <Scale size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Termos e Condições</h2>
                  <p className="text-gray-600">Última atualização: 15 de Janeiro de 2025</p>
                </div>
              </div>
              <p className="text-gray-600">
                Ao acessar e utilizar os serviços da Linx, você concorda com os termos e condições 
                descritos abaixo. Leia atentamente antes de utilizar nossos produtos e serviços.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-orange-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
                </div>
                <p className="text-gray-600">
                  Ao acessar ou usar qualquer serviço da Linx, você concorda em cumprir e estar 
                  vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes 
                  termos, não poderá acessar ou usar nossos serviços.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição dos Serviços</h2>
                <p className="text-gray-600 mb-4">
                  A Linx fornece soluções de software e serviços relacionados para o setor de varejo, 
                  incluindo mas não se limitando a:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Sistemas de gestão empresarial (ERP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Sistemas de ponto de venda (PDV)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Plataformas de e-commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Soluções de pagamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Serviços de entrega e logística</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Business Intelligence e análise de dados</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Conta de Usuário</h2>
                <p className="text-gray-600 mb-4">
                  Para acessar determinados serviços, você precisará criar uma conta. Você é 
                  responsável por:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Fornecer informações verdadeiras, precisas e atualizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Manter a confidencialidade de sua senha e credenciais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Notificar imediatamente qualquer uso não autorizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Ser responsável por todas as atividades em sua conta</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Uso Adequado</h2>
                <p className="text-gray-600 mb-4">
                  Você concorda em não utilizar os serviços da Linx para:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Atividades ilegais ou fraudulentas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Violar direitos de propriedade intelectual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Distribuir malware ou vírus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Tentar acessar áreas restritas sem autorização</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Interferir na operação dos serviços</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
                <p className="text-gray-600">
                  Todo o conteúdo, software, marcas e materiais disponibilizados pela Linx são 
                  protegidos por direitos autorais e outras leis de propriedade intelectual. 
                  Você não pode copiar, modificar, distribuir ou criar trabalhos derivados sem 
                  autorização expressa.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitação de Responsabilidade</h2>
                <p className="text-gray-600">
                  A Linx não será responsável por danos indiretos, incidentais, especiais ou 
                  consequenciais resultantes do uso ou incapacidade de uso dos serviços. 
                  Nossa responsabilidade total não excederá o valor pago pelos serviços nos 
                  últimos 12 meses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Rescisão</h2>
                <p className="text-gray-600">
                  A Linx reserva-se o direito de suspender ou encerrar seu acesso aos serviços 
                  a qualquer momento, por qualquer motivo, incluindo violação destes termos. 
                  Após a rescisão, todas as disposições que por sua natureza devam sobreviver 
                  permanecerão em vigor.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Alterações nos Termos</h2>
                <p className="text-gray-600">
                  A Linx pode modificar estes termos a qualquer momento. As alterações entrarão 
                  em vigor imediatamente após a publicação. O uso continuado dos serviços após 
                  as alterações constitui aceitação dos novos termos.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Lei Aplicável</h2>
                <p className="text-gray-600">
                  Estes termos serão regidos e interpretados de acordo com as leis da República 
                  Federativa do Brasil. Quaisquer disputas serão submetidas ao foro da comarca 
                  de São Paulo, SP.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
                <p className="text-gray-600">
                  Para dúvidas sobre estes termos, entre em contato:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600"><strong>E-mail:</strong> juridico@linx.com.br</p>
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

export default Termos;
