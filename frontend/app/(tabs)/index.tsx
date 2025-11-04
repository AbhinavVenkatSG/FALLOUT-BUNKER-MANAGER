import React from "react";
import { StyleSheet, View } from "react-native";
import { HealthBar, STATIC_HEALTH } from "../../GUIDevices/HealthMonitor/HealthMonitor";
import { LiveGeneratorComponent, STATIC_GENERATOR } from "../../GUIDevices/LiveGenerator/LiveGenerator";
import { OxygenScrubberComponent, STATIC_OXYGEN } from "../../GUIDevices/OxygenScrubber/OxygenScrubber";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* full-width health */}
      <HealthBar value={STATIC_HEALTH} />

      {/* compact vertical bars below, left-aligned */}
      <LiveGeneratorComponent value={STATIC_GENERATOR} style={{ marginTop: 12, alignSelf: "flex-start" }} />
      <OxygenScrubberComponent value={STATIC_OXYGEN} style={{ marginTop: 12, alignSelf: "flex-start" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#242424ff",
    justifyContent: "flex-start",
    gap: 12,
  },
});