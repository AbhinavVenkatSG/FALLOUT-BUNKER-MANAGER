
import { useEffect, useState } from "react";

export interface DeviceStatus {
  type: string;
  currentValue: number;
}

export function useDeviceData(apiUrl: string) {
  const [devices, setDevices] = useState<DeviceStatus[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch devices");
        const data = await response.json();

        // Ignore devices with NotImplementedException (null data)
        const valid = data.filter(
          (d: DeviceStatus) => d && d.currentValue !== undefined
        );
        setDevices(valid);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    };

    fetchDevices(); // run immediately
    const interval = setInterval(fetchDevices, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup
  }, [apiUrl]);

  return devices;
}
