import type { SiteData } from '@/types';

export const defaultData: SiteData = {
  content: {
    'header.logo': 'Linx',
    'header.nav.solutions': 'Soluções',
    'header.nav.segments': 'Segmentos',
    'header.nav.institutional': 'Institucional',
    'header.nav.support': 'Suporte',
    'header.nav.contact': 'Fale Conosco',

    'hero.badge': 'Líder em Tecnologia para Varejo',
    'hero.title': 'Tem solução pra tudo,',
    'hero.subtitle': 'tem Linx pra tudo',
    'hero.description':
      'De cada esquina às maiores redes varejistas, nós estamos lá. Somos a resposta confiável que você precisa para prosperar.',
    'hero.cta.primary': 'Receba uma Ligação',
    'hero.cta.secondary': 'Conheça as Soluções',
    'hero.image': '',

    // ⚠️ Removidos hero.stats mockados também (opcional, mas recomendado)

    'quicklinks.0.id': 'erp',
    'quicklinks.0.title': 'ERP',
    'quicklinks.0.subtitle': 'Gestão Completa',

    'quicklinks.1.id': 'pdv',
    'quicklinks.1.title': 'PDV',
    'quicklinks.1.subtitle': 'Ponto de Venda',

    'quicklinks.2.id': 'digital',
    'quicklinks.2.title': 'Digital',
    'quicklinks.2.subtitle': 'E-commerce',

    'quicklinks.3.id': 'bi',
    'quicklinks.3.title': 'BI',
    'quicklinks.3.subtitle': 'Inteligência',

    'solutions.title': 'Nossas Soluções',
    'solutions.subtitle': 'Sim, nós temos o que seu',
    'solutions.subtitle2': 'negócio precisa!',
    'solutions.description':
      'A Linx possui mais de 50 soluções em ERP, PDV, digital, autoatendimento, delivery e muito mais.',
    'solutions.viewAll': 'Ver Todas as Soluções',

    // Seção de Estatísticas (Numbers/Stats)
    'stats.title': '',
    'stats.subtitle': '',
    'stats.description': '',

    'segments.title': 'Atendemos',
    'segments.subtitle': 'todos os segmentos',
    'segments.subtitle2': 'do varejo',
    'segments.description':
      'Soluções especializadas para cada tipo de negócio.',
    'segments.viewAll': 'Ver Todos os Segmentos',

    'differentials.title': 'Por que Linx?',
    'differentials.subtitle': 'Nossos',
    'differentials.subtitle2': 'diferenciais',

    'contact.title': 'Vamos',
    'contact.subtitle': 'conversar?',
    'contact.description':
      'Ligamos para você em até 1h. Fale sobre os desafios do seu negócio e encontre a solução ideal.',
    'contact.phone': '0800 770 3320',
    'contact.email': 'contato@linx.com.br',
    'contact.address':
      'Av. das Nações Unidas, 7221 - São Paulo, SP',
    'contact.hours': 'Segunda a Sexta, 8h às 18h',

    'contact.form.title': 'Receba uma ligação',
    'contact.form.name': 'Nome',
    'contact.form.phone': 'Telefone',
    'contact.form.email': 'E-mail',
    'contact.form.segment': 'Segmento',
    'contact.form.message': 'Mensagem',
    'contact.form.submit': 'Solicitar Contato',

    'footer.company': 'Linx',
    'footer.description':
      'Líder em tecnologia para o varejo. Transformando complexidade em resultado desde 1985.',
    'footer.copyright':
      '© 2025 Linx Sistemas e Consultoria Ltda. Todos os direitos reservados.',
  },

  solutions: [
    {
      id: '1',
      solution_id: 'linx-erp',
      title: 'Linx ERP',
      description:
        'Sistema completo de gestão empresarial para varejo.',
      features: ['Gestão financeira', 'Controle de estoque', 'Fiscal', 'Compras'],
      cta_text: 'Saiba mais',
      icon: 'Building2',
      order_num: 0,
      active: 1
    }
  ],

  segments: [],

  // 🔥 AGORA VAZIO — NÃO EXISTE MAIS MOCK
  stats: []
};
