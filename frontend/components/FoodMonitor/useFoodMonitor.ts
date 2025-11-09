
import { useState, useEffect } from "react";

// clamp helper
const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

export type FoodStatus = "Full" | "Low" | "Ok";

/**
 * Hook for FoodMonitor value
 * @param currentValue number from backend
 */
export function useFoodMonitor(currentValue: number) {
  const [value, setValue] = useState(clamp(currentValue));

  useEffect(() => {
    setValue(clamp(currentValue));
  }, [currentValue]);

  return value;
}
