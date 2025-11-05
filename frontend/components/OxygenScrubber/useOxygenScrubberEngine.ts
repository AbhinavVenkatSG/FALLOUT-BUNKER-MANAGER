import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Simple clamp helper
 */
const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

export type UseOxygenOpts = {
  /**
   * Run a tiny local simulator (no API) that nudges the value every interval.
   * Default: false (manual control only).
   */
  simulate?: boolean;
  /**
   * Simulator interval in ms. Default: 1000.
   */
  intervalMs?: number;
  /**
   * Simulator step size (+/- step each tick). Default: 2.
   */
  step?: number;
  /**
   * Keep values between 0..100 (recommended). Default: true.
   */
  hardClamp?: boolean;
};

/**
 * Barebones oxygen engine — NO networking.
 * - value: current oxygen (0..100)
 * - setAbsolute(n): set exact value
 * - applyDelta(d): add/subtract
 * - reset(): back to initial
 * - optional local simulator you can toggle with opts.simulate
 */
export function useOxygenScrubberEngine(initial = 73, opts: UseOxygenOpts = {}) {
  const { simulate = false, intervalMs = 1000, step = 2, hardClamp = true } = opts;

  const [value, setValue] = useState<number>(hardClamp ? clamp(initial) : initial);
  const initialRef = useRef<number>(hardClamp ? clamp(initial) : initial);

  const setAbsolute = useCallback(
    (v: number) => setValue(hardClamp ? clamp(v) : v),
    [hardClamp]
  );

  const applyDelta = useCallback(
    (d: number) => setValue((cur) => (hardClamp ? clamp(cur + d) : cur + d)),
    [hardClamp]
  );

  const reset = useCallback(() => setValue(initialRef.current), []);

  // Optional tiny simulator (purely local)
  useEffect(() => {
    if (!simulate) return;
    let dir = 1; // bounce up/down
    const id = setInterval(() => {
      setValue((cur) => {
        let next = cur + dir * step;
        if (hardClamp) next = clamp(next);
        // bounce at edges
        if (next >= 100) dir = -1;
        if (next <= 0) dir = 1;
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [simulate, intervalMs, step, hardClamp]);

  return { value, setAbsolute, applyDelta, reset };
}