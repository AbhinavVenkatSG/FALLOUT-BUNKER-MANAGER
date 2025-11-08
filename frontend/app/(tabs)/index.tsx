
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator } from "react-native";
//import for the loading screen
import Dosimeter from "../../components/Dosimeter/Dosimeter";
import Generator from "../../components/Generator/Generator";
import HealthMonitor from "../../components/HealthMonitor/HealthMonitor";
import OxygenScrubber from "../../components/OxygenScrubber/OxygenScrubber";
import Thermometer from "../../components/Thermometer/Thermometer";
import WaterSensor from "../../components/WaterSensor/WaterSensor";

// Adjust this to match your API port
const API_URL = "http://localhost:5244/api/device";
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 768;

interface Device {
  type: number;
  currentValue: number;
}

//polling function that polls the api
// okay here the plan was to call the api every 3 seconds or so and see if the website is updating properly
// the issue is it is doing but the values are not changing so for now im commiting this but i have to look into that later 

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to get device value by type
  const getValue = (typeIndex: number) => {
    const device = devices.find(d => d.type === typeIndex);
    return device?.currentValue ?? 0;
  };

  // Fetch devices from backend every second
  
// Fetch devices from backend every 3 seconds
useEffect(() => {
  let isFetching = false;

  const fetchDevices = async () => {
    if (isFetching) return; 
    isFetching = true;
    try {
      const res = await fetch(API_URL);
      const data: Device[] = await res.json();
      setDevices(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching device data:", err);
    } finally {
      isFetching = false;
    }
  };

  // initial fetch
  fetchDevices();

  // poll every 3 seconds
  const interval = setInterval(fetchDevices, 3000);

  // cleanup
  return () => clearInterval(interval);
}, []);

  return (
    <View style={styles.viewport}>
      <View style={[styles.scaleWrapper, { transform: [{ scale }] }]}>
        <View style={styles.container}>
          {/* Centered health bar at top */}
          <View style={styles.healthContainer}>
            <HealthMonitor value={getValue(0)} />
          </View>

          {/* Centered power & atmosphere controls */}
          <View style={styles.resourceRow}>
            <View style={styles.resourceModule}>
              <WaterSensor value={getValue(1)} />
            </View>
            <View style={styles.resourceModule}>
              <Generator value={getValue(2)} />
            </View>
            <View style={styles.resourceModule}>
              <OxygenScrubber value={getValue(3)} />
            </View>
          </View>

          {/* Right-side "Exterior Values" box */}
          <View style={styles.exteriorBox}>
            <Text style={styles.exteriorTitle}>Exterior Values</Text>
            <View style={styles.exteriorItem}>
              <Thermometer value={getValue(4)} />
            </View>
            <View style={styles.exteriorItem}>
              <Dosimeter value={getValue(5)} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: "#212121ff",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleWrapper: {
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#212121ff",
  },
  healthContainer: {
    marginTop: 12,
    alignSelf: "stretch",
    alignItems: "center",
    gap: 6,
  },
  resourceRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    marginTop: 120,
    alignSelf: "flex-end",
    marginRight: 250,
  },
  resourceModule: {
    alignItems: "center",
  },
  exteriorBox: {
    position: "absolute",
    right: 16,
    top: "25%",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  exteriorTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  exteriorItem: {
    alignItems: "center",
    marginVertical: 8,
  },
});
