import { StyleSheet, Text, View } from "react-native";
import HealthBar from "../../components/HealthMonitor/HealthMonitor";
import Thermometer from "../../components/Thermometer/Thermometer";

// ⬇️ add these
import { LiveGeneratorComponent, STATIC_GENERATOR } from "../../components/Generator/LiveGenerator";
import { OxygenScrubberComponent, STATIC_OXYGEN } from "../../components/OxygenScrubber/OxygenScrubber";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Centered health bar at top */}
      <View style={styles.healthContainer}>
        <HealthBar value={67} />
      </View>

      {/* Left rail for compact vertical widgets */}
      <View style={styles.leftRail}>
        <LiveGeneratorComponent value={STATIC_GENERATOR} />
        <OxygenScrubberComponent value={STATIC_OXYGEN} style={{ marginTop: 24 }} />
      </View>

      {/* Right-side "Exterior Values" box */}
      <View style={styles.exteriorBox}>
        <Text style={styles.exteriorTitle}>Exterior Values</Text>

        <View style={styles.exteriorItem}>
          <Thermometer value={67} />
        </View>

        <View style={styles.exteriorItem}>
          {/* Placeholder for Radiation component */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121ff",
    padding: 16,
  },
  healthContainer: {
    marginTop: 12,
    alignSelf: "stretch",
    alignItems: "center",
    gap: 6,
  },
  healthTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,                 // a bit bigger; try 20 if you want more presence
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.9)", // glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },

  // ⬇️ fixed-width left column so vertical bars align perfectly
  leftRail: {
    width: 72,            // must match COLUMN_WIDTH in your components
    alignItems: "center", // center bars within the rail
    gap: 24,
    marginTop: 16,
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
  label: {
    color: "#fff",
    marginBottom: 4,
  },
  value: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});