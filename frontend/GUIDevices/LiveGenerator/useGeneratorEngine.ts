import { useEffect, useMemo, useRef, useState } from "react";

export type DeviceStatus = "ok" | "error" | "stale";

export type GeneratorSample = {
  seq: number;      // increasing sequence
  value: number;    // current generator reading (e.g., % or kW)
};

export type SourceFn = () => Promise<GeneratorSample>;

/**
 * Default simulator: smooth drift with occasional jitter.
 * No network required; great for demos and tests.
 */
export function makeSimulatedSource(initial = 60): SourceFn {
  let seq = 0;
  let val = initial;
  return async () => {
    seq += 1;
    // small random walk
    const step = (Math.random() - 0.5) * 6; // ~ -3..+3
    val = Math.max(0, Math.min(100, val + step));
    // 1-in-50 chance to simulate a temporary failure by throwing
    if (Math.random() < 0.02) {
      throw new Error("Simulated disconnect");
    }
    return { seq, value: val };
  };
}

/**
 * Optional: turn a URL into a SourceFn (expects { seq, value }).
 * If you’re not using an API, ignore this.
 */
export function makeUrlSource(url: string): SourceFn {
  return async () => {
    const u = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
    const res = await fetch(u, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const seq = Number(json?.seq);
    const value = Number(json?.value);
    if (!Number.isFinite(seq) || !Number.isFinite(value)) {
      throw new Error("Malformed payload");
    }
    return { seq, value };
  };
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function useGeneratorEngine(opts?: {
  pollMs?: number;            // default 1000ms (meets <1s refresh criterion)
  source?: SourceFn;          // data source (simulated by default)
  onStatusChange?: (s: DeviceStatus, reason?: string) => void;
}) {
  const pollMs = opts?.pollMs ?? 1000;
  const source = useMemo<SourceFn>(() => opts?.source ?? makeSimulatedSource(60), [opts?.source]);
  const onStatusChange = opts?.onStatusChange;

  const [value, setValue] = useState<number>(60);
  const [status, setStatus] = useState<DeviceStatus>("ok");
  const [reason, setReason] = useState<string | undefined>(undefined);

  const lastSeq = useRef<number | null>(null);
  const lastOkAt = useRef<number | null>(null);

  useEffect(() => {
    let timer: any;

    async function tick() {
      // Mark stale if no success for >2 cycles
      if (lastOkAt.current && Date.now() - lastOkAt.current > pollMs * 2) {
        if (status !== "stale") {
          setStatus("stale");
          setReason("No data > 2 cycles");
          onStatusChange?.("stale", "No data > 2 cycles");
        }
      }

      try {
        const sample = await source();
        const seq = Number(sample.seq);
        const val = clamp(Number(sample.value));

        if (!Number.isFinite(seq) || !Number.isFinite(val)) {
          throw new Error("Invalid numbers");
        }
        if (lastSeq.current === null || seq > lastSeq.current) {
          lastSeq.current = seq;
          lastOkAt.current = Date.now();
          setValue(val);
          if (status !== "ok") {
            setStatus("ok");
            setReason(undefined);
            onStatusChange?.("ok");
          }
        }
      } catch (e: any) {
        setStatus("error");
        const msg = e?.message ?? "Fetch failed";
        setReason(msg);
        onStatusChange?.("error", msg);
      }
    }

    tick(); // immediate
    timer = setInterval(tick, pollMs);
    return () => clearInterval(timer);
  }, [pollMs, source]); // eslint-disable-line react-hooks/exhaustive-deps

  return { value, status, reason };
}