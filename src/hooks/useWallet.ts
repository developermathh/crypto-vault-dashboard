import { useCallback, useState } from 'react';

export type ChainId = 'eth' | 'sol' | 'bsc';

export interface ChainMeta {
  id: ChainId;
  symbol: string;
  color: string;
  dummyAddress: string;
  dummyBalance: string;
}

const CHAINS: Record<ChainId, ChainMeta> = {
  eth: { id: 'eth', symbol: 'ETH', color: '#627eea', dummyAddress: '0x71C...3A9F', dummyBalance: '2.8473' },
  sol: { id: 'sol', symbol: 'SOL', color: '#9945FF', dummyAddress: '7xKg...Bm3Q', dummyBalance: '142.91' },
  bsc: { id: 'bsc', symbol: 'BNB', color: '#F59E0B', dummyAddress: '0x4a2...9E1c', dummyBalance: '18.204' },
};

export function useWallet() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [chain, setChain] = useState<ChainId>('bsc');
  const [balanceLoading, setBalanceLoading] = useState(false);

  const connect = useCallback(() => {
    setConnecting(true);
    setBalanceLoading(true);
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
      setTimeout(() => setBalanceLoading(false), 1200);
    }, 800);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setBalanceLoading(false);
  }, []);

  const switchChain = useCallback((id: ChainId) => {
    setChain(id);
    if (connected) {
      setBalanceLoading(true);
      setTimeout(() => setBalanceLoading(false), 1000);
    }
  }, [connected]);

  return {
    connected, connecting, chain, balanceLoading,
    chainMeta: CHAINS[chain], CHAINS,
    connect, disconnect, switchChain,
  };
}
