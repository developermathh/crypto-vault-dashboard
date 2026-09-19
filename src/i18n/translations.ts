export type Lang = 'es' | 'en' | 'pt';

export interface LangMeta {
  code: Lang;
  flag: string;
  name: string;
}

export const LANGUAGES: LangMeta[] = [
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
];

export interface Dict {
  nav: { prices: string; gas: string; support: string; code: string; subtitle: string };
  hero: { badge: string; titlePre: string; titleHighlight: string; description: string };
  wallet: {
    connect: string; connecting: string; disconnect: string; connected: string;
    balance: string; selectChain: string; wrongNetwork: string;
    chains: { eth: string; sol: string; bsc: string };
  };
  monitor: {
    liveBadge: string; title: string; subtitle: string;
    searchPlaceholder: string; searchAria: string; clearAria: string;
    resultsCount: (n: number) => string; searching: string;
    noResults: string; noResultsHint: string; noConnection: string;
    updated: string; updatedAgo: (s: number) => string; top10: string;
    loadError: string;
    thRank: string; thAsset: string; thPrice: string; th24h: string;
    thMarketCap: string; thVolume: string; th7d: string;
  };
  gas: {
    badge: string; title: string; subtitle: string;
    txType: string; txTransfer: string; txSwap: string; txContract: string;
    speed: string; speedLow: string; speedAverage: string; speedInstant: string;
    speedLowDesc: string; speedAverageDesc: string; speedInstantDesc: string;
    gasPriceLabel: string; gasLimitLabel: string;
    estimateNote: string; estimatedCost: string; networkFee: string;
    usdEquivalent: string; gasLimit: string; gasPrice: string;
    bnbPrice: string; network: string;
  };
  support: {
    badge: string; title: string; description: string;
    walletLabel: string; usdtBep20: string; tether: string;
    copyBtn: string; copied: string; viewBscScan: string; copyError: string;
    beforeSending: string; check1: string; check2: string; check3: string;
  };
  footer: { rights: string; dataBy: string };
}

export const TRANSLATIONS: Record<Lang, Dict> = {
  es: {
    nav: { prices: 'Precios', gas: 'Gas Fees', support: 'Soporte', code: 'Código', subtitle: 'Terminal Web3' },
    hero: {
      badge: 'Datos en vivo · CoinGecko',
      titlePre: 'Terminal de análisis',
      titleHighlight: 'cripto',
      description: 'Precios en tiempo real, calculadora de gas fees para BNB Smart Chain y soporte al proyecto. Todo en una interfaz optimizada para móvil.',
    },
    wallet: {
      connect: 'Conectar Wallet', connecting: 'Conectando...', disconnect: 'Desconectar', connected: 'Conectado',
      balance: 'Balance', selectChain: 'Seleccionar red', wrongNetwork: 'Red incorrecta',
      chains: { eth: 'Ethereum', sol: 'Solana', bsc: 'BNB Chain' },
    },
    monitor: {
      liveBadge: 'En vivo', title: 'Monitor de Precios',
      subtitle: 'Actualizado automáticamente cada 15s.',
      searchPlaceholder: 'Buscar criptomoneda...', searchAria: 'Buscar', clearAria: 'Limpiar',
      resultsCount: (n: number) => `${n} resultado(s)`, searching: 'Buscando...',
      noResults: 'Sin resultados para', noResultsHint: 'Prueba con otro nombre.',
      noConnection: 'Sin conexión', updated: 'Actualizado',
      updatedAgo: (s: number) => s < 5 ? 'ahora' : s < 60 ? `hace ${s}s` : `hace ${Math.floor(s / 60)}min`,
      top10: 'Top 10 · Cap. mercado', loadError: 'Error al cargar. Reintentando...',
      thRank: '#', thAsset: 'Activo', thPrice: 'Precio', th24h: '24h',
      thMarketCap: 'Cap. mercado', thVolume: 'Volumen', th7d: '7d',
    },
    gas: {
      badge: 'BNB Smart Chain', title: 'Calculadora de Gas',
      subtitle: 'Estima el costo de red en BNB Smart Chain (BEP-20).',
      txType: 'Tipo de transacción', txTransfer: 'Transfer', txSwap: 'Swap DEX', txContract: 'Contrato',
      speed: 'Prioridad de red', speedLow: 'Baja', speedAverage: 'Media', speedInstant: 'Instantánea',
      speedLowDesc: '~5 min', speedAverageDesc: '~30 seg', speedInstantDesc: '~10 seg',
      gasPriceLabel: 'Gas Price (Gwei)', gasLimitLabel: 'Gas Limit',
      estimateNote: 'Estimaciones basadas en condiciones típicas de BSC. El costo real puede variar.',
      estimatedCost: 'Costo estimado', networkFee: 'Comisión (BNB)',
      usdEquivalent: 'Equivalente USD', gasLimit: 'Gas Limit', gasPrice: 'Gas Price',
      bnbPrice: 'Precio BNB', network: 'Red',
    },
    support: {
      badge: 'Soporte', title: 'Impulsa este proyecto ⚡',
      description: 'Si esta plataforma aporta valor a tus análisis diarios, puedes respaldar su desarrollo e infraestructura. Tu apoyo impulsa directamente la optimización de nuestras herramientas Web3 y la expansión de nuestro ecosistema.',
      walletLabel: 'Dirección', usdtBep20: 'USDT · BEP-20', tether: 'Tether USD — BNB Smart Chain',
      copyBtn: 'Copiar', copied: '¡Copiado!', viewBscScan: 'BscScan', copyError: 'No se pudo copiar. Mantén presionado para copiar manualmente.',
      beforeSending: 'Antes de enviar',
      check1: 'Verifica que la red sea BNB Smart Chain (BEP-20).',
      check2: 'Asegúrate de tener BNB para el gas.',
      check3: 'Confirma la dirección completa antes de enviar.',
    },
    footer: { rights: 'Terminal Web3', dataBy: 'Datos por' },
  },
  en: {
    nav: { prices: 'Prices', gas: 'Gas Fees', support: 'Support', code: 'Code', subtitle: 'Web3 Terminal' },
    hero: {
      badge: 'Live data · CoinGecko',
      titlePre: 'Crypto analytics',
      titleHighlight: 'terminal',
      description: 'Real-time prices, BNB Smart Chain gas calculator, and project support. All in a mobile-optimized interface.',
    },
    wallet: {
      connect: 'Connect Wallet', connecting: 'Connecting...', disconnect: 'Disconnect', connected: 'Connected',
      balance: 'Balance', selectChain: 'Select chain', wrongNetwork: 'Wrong network',
      chains: { eth: 'Ethereum', sol: 'Solana', bsc: 'BNB Chain' },
    },
    monitor: {
      liveBadge: 'Live', title: 'Price Monitor',
      subtitle: 'Updated automatically every 15s.',
      searchPlaceholder: 'Search cryptocurrency...', searchAria: 'Search', clearAria: 'Clear',
      resultsCount: (n: number) => `${n} result(s)`, searching: 'Searching...',
      noResults: 'No results for', noResultsHint: 'Try another name.',
      noConnection: 'No connection', updated: 'Updated',
      updatedAgo: (s: number) => s < 5 ? 'just now' : s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}min ago`,
      top10: 'Top 10 · Market cap', loadError: 'Failed to load. Retrying...',
      thRank: '#', thAsset: 'Asset', thPrice: 'Price', th24h: '24h',
      thMarketCap: 'Market cap', thVolume: 'Volume', th7d: '7d',
    },
    gas: {
      badge: 'BNB Smart Chain', title: 'Gas Calculator',
      subtitle: 'Estimate network cost on BNB Smart Chain (BEP-20).',
      txType: 'Transaction type', txTransfer: 'Transfer', txSwap: 'Swap DEX', txContract: 'Contract',
      speed: 'Network priority', speedLow: 'Low', speedAverage: 'Average', speedInstant: 'Instant',
      speedLowDesc: '~5 min', speedAverageDesc: '~30 sec', speedInstantDesc: '~10 sec',
      gasPriceLabel: 'Gas Price (Gwei)', gasLimitLabel: 'Gas Limit',
      estimateNote: 'Estimates based on typical BSC conditions. Actual cost may vary.',
      estimatedCost: 'Estimated cost', networkFee: 'Fee (BNB)',
      usdEquivalent: 'USD equivalent', gasLimit: 'Gas Limit', gasPrice: 'Gas Price',
      bnbPrice: 'BNB price', network: 'Network',
    },
    support: {
      badge: 'Support', title: 'Boost this project ⚡',
      description: 'If this platform brings value to your daily analysis, you can back its development and infrastructure. Your support directly drives the optimization of our Web3 tools and the expansion of our ecosystem.',
      walletLabel: 'Address', usdtBep20: 'USDT · BEP-20', tether: 'Tether USD — BNB Smart Chain',
      copyBtn: 'Copy', copied: 'Copied!', viewBscScan: 'BscScan', copyError: 'Could not copy. Long-press to copy manually.',
      beforeSending: 'Before sending',
      check1: 'Verify the network is BNB Smart Chain (BEP-20).',
      check2: 'Make sure you have BNB for gas.',
      check3: 'Confirm the full address before sending.',
    },
    footer: { rights: 'Web3 Terminal', dataBy: 'Data by' },
  },
  pt: {
    nav: { prices: 'Preços', gas: 'Gas Fees', support: 'Apoio', code: 'Código', subtitle: 'Terminal Web3' },
    hero: {
      badge: 'Dados ao vivo · CoinGecko',
      titlePre: 'Terminal de análise',
      titleHighlight: 'cripto',
      description: 'Preços em tempo real, calculadora de gas fees para BNB Smart Chain e apoio ao projeto. Tudo em uma interface otimizada para celular.',
    },
    wallet: {
      connect: 'Conectar Carteira', connecting: 'Conectando...', disconnect: 'Desconectar', connected: 'Conectado',
      balance: 'Saldo', selectChain: 'Selecionar rede', wrongNetwork: 'Rede incorreta',
      chains: { eth: 'Ethereum', sol: 'Solana', bsc: 'BNB Chain' },
    },
    monitor: {
      liveBadge: 'Ao vivo', title: 'Monitor de Preços',
      subtitle: 'Atualizado automaticamente a cada 15s.',
      searchPlaceholder: 'Buscar criptomoeda...', searchAria: 'Buscar', clearAria: 'Limpar',
      resultsCount: (n: number) => `${n} resultado(s)`, searching: 'Buscando...',
      noResults: 'Sem resultados para', noResultsHint: 'Tente outro nome.',
      noConnection: 'Sem conexão', updated: 'Atualizado',
      updatedAgo: (s: number) => s < 5 ? 'agora' : s < 60 ? `há ${s}s` : `há ${Math.floor(s / 60)}min`,
      top10: 'Top 10 · Cap. mercado', loadError: 'Erro ao carregar. Tentando novamente...',
      thRank: '#', thAsset: 'Ativo', thPrice: 'Preço', th24h: '24h',
      thMarketCap: 'Cap. mercado', thVolume: 'Volume', th7d: '7d',
    },
    gas: {
      badge: 'BNB Smart Chain', title: 'Calculadora de Gas',
      subtitle: 'Estime o custo de rede na BNB Smart Chain (BEP-20).',
      txType: 'Tipo de transação', txTransfer: 'Transfer', txSwap: 'Swap DEX', txContract: 'Contrato',
      speed: 'Prioridade de rede', speedLow: 'Baixa', speedAverage: 'Média', speedInstant: 'Instantânea',
      speedLowDesc: '~5 min', speedAverageDesc: '~30 seg', speedInstantDesc: '~10 seg',
      gasPriceLabel: 'Gas Price (Gwei)', gasLimitLabel: 'Gas Limit',
      estimateNote: 'Estimativas baseadas em condições típicas da BSC. O custo real pode variar.',
      estimatedCost: 'Custo estimado', networkFee: 'Taxa (BNB)',
      usdEquivalent: 'Equivalente USD', gasLimit: 'Gas Limit', gasPrice: 'Gas Price',
      bnbPrice: 'Preço BNB', network: 'Rede',
    },
    support: {
      badge: 'Apoio', title: 'Impulsione este projeto ⚡',
      description: 'Se esta plataforma agrega valor à sua análise diária, você pode apoiar seu desenvolvimento e infraestrutura. Seu apoio impulsiona diretamente a otimização de nossas ferramentas Web3 e a expansão do nosso ecossistema.',
      walletLabel: 'Endereço', usdtBep20: 'USDT · BEP-20', tether: 'Tether USD — BNB Smart Chain',
      copyBtn: 'Copiar', copied: 'Copiado!', viewBscScan: 'BscScan', copyError: 'Não foi possível copiar. Mantenha pressionado para copiar manualmente.',
      beforeSending: 'Antes de enviar',
      check1: 'Verifique se a rede é BNB Smart Chain (BEP-20).',
      check2: 'Certifique-se de ter BNB para o gas.',
      check3: 'Confirme o endereço completo antes de enviar.',
    },
    footer: { rights: 'Terminal Web3', dataBy: 'Dados por' },
  },
};
