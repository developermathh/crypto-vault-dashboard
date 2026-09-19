import { useMemo } from 'react';

interface SparklineProps {
  data: number[];
  positive: boolean;
  width?: number;
  height?: number;
}

export function Sparkline({ data, positive, width = 80, height = 24 }: SparklineProps) {
  const path = useMemo(() => {
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const pad = 2;
    const usableH = height - pad * 2;
    return data
      .map((v, i) => {
        const x = i * stepX;
        const y = pad + (1 - (v - min) / range) * usableH;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [data, width, height]);

  if (!path) return <div className="h-6 w-20" />;

  const color = positive ? '#10B981' : '#EF4444';
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="gpu">
      <path d={path} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
