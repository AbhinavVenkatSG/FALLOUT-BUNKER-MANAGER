// GUIDevices/HealthMonitor/HealthMonitor.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
export { default as HealthBar } from './HealthMonitorComponent';

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function useHealthEngine(initial = 100) {
  const [health, setHealth] = useState(initial);
  const lastSeq = useRef<number | null>(null);
  const applyDelta = useCallback((delta: number, seq?: number) => {
    if (typeof seq === 'number') {
      if (lastSeq.current !== null && seq <= lastSeq.current) return;
      lastSeq.current = seq;
    }
    setHealth(h => clamp(h + delta));
  }, []);
  return { health, applyDelta };
}

export function useDeltaFromUrl(
  url: string,
  { intervalMs = 5000, onDelta }: { intervalMs?: number; onDelta: (delta: number, seq?: number) => void }
) {
  const lastSeen = useRef<number | null>(null);
  useEffect(() => {
    let id: any;
    async function tick() {
      try {
        const u = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now();
        const res = await fetch(u, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { seq, healthDelta } = await res.json();
        if (Number.isFinite(seq) && Number.isFinite(healthDelta)) {
          if (lastSeen.current === null || seq > lastSeen.current) {
            lastSeen.current = seq;
            onDelta(Number(healthDelta), Number(seq));
          }
        }
      } catch {
        // optional: surface error state in UI
      }
    }
    tick();
    id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [url, intervalMs, onDelta]);
}