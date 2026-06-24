export type ProjectCase = {
  id: string
  category: 'residencial' | 'comercial' | 'construtora'
  title: string
  location?: string
  environment: string
  challenge: string
  solution: string
  result: string
  brand?: string
  images: {
    cover: string
    detail?: string
    wide?: string
    alt: string
  }
  tags: string[]
  cta?: string
}

export const obras: ProjectCase[] = [
  {
    id: 'apt-tatuape',
    category: 'residencial',
    title: 'Apartamento Alto Padrão',
    location: 'Tatuapé, São Paulo',
    environment:
      'Apartamento de 180 m² com planta aberta, pé-direito elevado e três suítes com demanda térmica independente por zona.',
    challenge:
      'Atender seis zonas distintas sem expor tubulações nos ambientes sociais e sem sobrecarregar a infraestrutura elétrica existente.',
    solution:
      'Sistema VRF Daikin com seis unidades Hi-Wall, tubulação de cobre passada inteiramente dentro do forro, emendas zero por ramal. Quadro elétrico exclusivo com proteção individual por circuito.',
    result:
      'Seis ambientes climatizados de forma independente, teto de gesso intacto, zero tubulação aparente. Consumo estimado 38% menor versus splits convencionais pela operação integrada do VRF.',
    brand: 'Daikin',
    images: {
      cover: '/images/obras/obra-1.jpeg',
      alt: 'Sala de estar de apartamento alto padrão com ar condicionado VRF instalado no forro',
    },
    tags: ['VRF', 'Hi-Wall', 'Daikin', 'Alto Padrão'],
    cta: 'Quero um projeto VRF assim',
  },
  {
    id: 'casa-alphaville',
    category: 'residencial',
    title: 'Casa Contemporânea',
    location: 'Alphaville, Barueri',
    environment:
      'Casa de 350 m² com teto aparente em madeira maciça e área social integrada de 90 m² com pé-direito de 4,5 m. Projeto arquitetônico com premissa de invisibilidade total dos equipamentos.',
    challenge:
      'Teto de madeira maciça inviolável — sem perfurações, sem fixações aparentes. Vão aberto de 90 m² exigia vazão uniforme sem correntes de ar perceptíveis.',
    solution:
      'Split duto com unidades embutidas acima do forro técnico perimetral, difusores lineares integrados ao friso de madeira. Tubulação inteiramente oculta em shaft lateral. Controle centralizado via app com agendamento por cômodo.',
    result:
      'Zero equipamento visível no ambiente social. Distribuição uniforme em 90 m², variação máxima de 1°C entre zonas. Arquitetura preservada integralmente — sem uma peça do projeto original alterada.',
    brand: 'LG',
    images: {
      cover: '/images/obras/obra-2.jpeg',
      alt: 'Área social de casa com teto de madeira maciça e climatização completamente oculta',
    },
    tags: ['Split Duto', 'Dutos Ocultos', 'LG', 'Alto Padrão'],
    cta: 'Quero climatização invisível',
  },
  {
    id: 'apt-moema',
    category: 'residencial',
    title: 'Apartamento Integrado',
    location: 'Moema, São Paulo',
    environment:
      'Apartamento de 130 m² com sala de estar integrada à varanda gourmet, forro de gesso liso e três fontes de calor em pontos distintos do espaço.',
    challenge:
      'Espaço único de 65 m² com carga desigual — cozinha americana, TV wall e varanda com fachada de vidro leste. Splits Hi-Wall criariam pontos de insuflamento irregulares e conflito com o projeto de iluminação embutida.',
    solution:
      'Cassete 4 vias instalado no ponto geométrico central do forro, grelha rasante com o gesso liso. Dreno por gravidade integrado ao shaft de esgoto existente, sem necessidade de bomba.',
    result:
      'Unidade invisível a partir do nível do olho, grelha enrasada com o forro. Temperatura homogênea em todo o espaço de convívio sem pontos frios. O arquiteto responsável utilizou o projeto como referência para outros clientes.',
    brand: 'Samsung',
    images: {
      cover: '/images/obras/obra-3.jpeg',
      alt: 'Sala integrada com cassete de teto enrasado no forro de gesso liso',
    },
    tags: ['Cassete 4 Vias', 'Samsung', 'Forro Liso', 'Integrado'],
    cta: 'Quero um projeto assim',
  },
  {
    id: 'casa-vnc',
    category: 'residencial',
    title: 'Residência Clássica',
    location: 'Vila Nova Conceição, São Paulo',
    environment:
      'Casa de alto padrão de 420 m² com arquitetura clássica, molduras em gesso, escada em mármore e 8 ambientes distribuídos em três pavimentos.',
    challenge:
      'Edificação de 1998 sem infraestrutura para ar-condicionado. Paredes de alvenaria maciça, sancas decorativas e molduras invioláveis — a tubulação não podia tocar em nenhum elemento do revestimento original.',
    solution:
      'Mapeamento completo com definição de shafts técnicos ocultos dentro de armários existentes. Tubulação exclusivamente entre lajes e paredes, sem rasgos em gesso ou mármore. Oito unidades externas em área técnica totalmente oculta do jardim.',
    result:
      'Casa climatizada em todos os ambientes, zero shaft ou tubulação aparente. Molduras, sancas e revestimentos originais preservados integralmente. Decorador responsável pelo projeto aprovou sem nenhuma ressalva.',
    brand: 'Fujitsu',
    images: {
      cover: '/images/obras/obra-4.jpeg',
      alt: 'Interior de residência clássica com escada em mármore e climatização sem nenhum equipamento aparente',
    },
    tags: ['Split Hi-Wall', 'Fujitsu', 'Shafts Técnicos', 'Clássico'],
    cta: 'Quero um projeto assim',
  },
  {
    id: 'cobertura-itaim',
    category: 'residencial',
    title: 'Cobertura Duplex',
    location: 'Itaim Bibi, São Paulo',
    environment:
      'Cobertura duplex de 280 m² com dois pavimentos integrados por escada helicoidal em aço escovado, terraço de 60 m² e varanda com forte incidência solar no período da tarde.',
    challenge:
      'Dois andares com carga térmica completamente diferente. Escada helicoidal central impossibilitava qualquer shaft convencional. Cliente exigiu zero equipamento visível nos dois pavimentos.',
    solution:
      'VRF com 7 unidades internas e condensadora única na cobertura técnica. Tubulação subindo pelo interior do volume da escada helicoidal, solução desenvolvida em conjunto com o engenheiro estrutural. Difusores lineares embutidos no forro técnico de ambos os andares.',
    result:
      'Dois pavimentos climatizados com zero equipamentos aparentes. Escada helicoidal intacta em cada detalhe. Redução comprovada de 42% na conta de energia versus a solução de splits convencionais que o cliente havia orçado anteriormente.',
    brand: 'Daikin',
    images: {
      cover: '/images/obras/obra-5.jpeg',
      alt: 'Cobertura duplex com escada helicoidal e climatização VRF completamente oculta',
    },
    tags: ['VRF', 'Dutos Ocultos', 'Daikin', 'Cobertura Duplex'],
    cta: 'Quero um projeto VRF assim',
  },
]
