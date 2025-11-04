import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
export { default as HealthBar } from "./HealthMonitorComponent";

// ------- URL helper (works on Expo Web in Chrome) -------
export const STATUS_URL =
  Platform.OS === "web"
    ? `http://${(globalThis as any).location?.hostname || "localhost"}:5080/status`
    : "http://127.0.0.1:5080/status"; // adjust later for emulators/devices if needed

// ------- Clamp helper -------
const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

// ------- Health state + delta application -------
export function useHealthEngine(initial = 100) {
  const [health, setHealth] = useState<number>(initial);
  const lastSeq = useRef<number | null>(null);

  const applyDelta = useCallback((delta: number, seq?: number) => {
    if (typeof seq === "number") {
      if (lastSeq.current !== null && seq <= lastSeq.current) return; // already applied
      lastSeq.current = seq;
    }
    setHealth((h) => clamp(h + delta));
  }, []);

  const setAbsolute = useCallback((abs: number) => setHealth(clamp(abs)), []);

  return { health, applyDelta, setAbsolute };
}

// ------- 5s polling of backend /status -------
export function useDeltaFromUrl(
  url: string,
  {
    intervalMs = 5000,
    onDelta,
  }: {
    intervalMs?: number;
    onDelta: (delta: number, seq?: number) => void;
  }
) {
  const lastSeen = useRef<number | null>(null);

  useEffect(() => {
    let timer: any;

    async function tick() {
      try {
        const u = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(); // bust cache
        const res = await fetch(u, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json() as { seq?: unknown; healthDelta?: unknown };

        const seq = Number(data.seq);
        const delta = Number(data.healthDelta);

        if (Number.isFinite(seq) && Number.isFinite(delta)) {
          if (lastSeen.current === null || seq > lastSeen.current) {
            lastSeen.current = seq;
            onDelta(delta, seq);
          }
        }
      } catch (e) {
        // Optional: add a UI status if you want ("couldn't query device")
        // console.warn("poll error", e);
      }
    }

    tick(); // immediate
    timer = setInterval(tick, intervalMs);
    return () => clearInterval(timer);
  }, [url, intervalMs, onDelta]);
}