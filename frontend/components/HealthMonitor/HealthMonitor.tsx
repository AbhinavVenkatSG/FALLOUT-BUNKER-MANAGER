// Rami Musleh

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { value: number };

const BAR_COLORS = [
  { stop: 0, color: [255, 25, 0, 255] },
  { stop: 50, color: [255, 204, 0, 255] },
  { stop: 100, color: [0, 255, 106, 255] },
];

const RADIUS = 20;
const TRACK_HEIGHT = 24;

export default function HealthMonitor({ value }: Props) {
  value = Math.round(boundsCheck(value));
  const fillColor = getFillColor(value);
  const roundRight = value > 98 ? RADIUS : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bunker Wellbeing</Text>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${value}%`,
              backgroundColor: fillColor,
              borderTopRightRadius: roundRight,
              borderBottomRightRadius: roundRight,
            },
          ]}
        />
        <Text style={styles.value}>{value}%</Text>
      </View>
    </View>
  );
}

function boundsCheck(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getFillColor(value: number) {
  const [start, end] = value <= 50 ? [BAR_COLORS[0], BAR_COLORS[1]] : [BAR_COLORS[1], BAR_COLORS[2]];
  const range = end.stop - start.stop || 1;
  const t = (value - start.stop) / range;
  const interpolated = start.color.map((component, index) => {
    const delta = end.color[index] - component;
    return Math.round(component + delta * t);
  });
  return `rgba(${interpolated[0]}, ${interpolated[1]}, ${interpolated[2]}, ${interpolated[3] / 255})`;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: 6,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 14,
    alignSelf: "center",
    width: "100%",
  },
  track: {
    backgroundColor: "#333",
    borderRadius: RADIUS,
    overflow: "hidden",
    justifyContent: "center",
    height: TRACK_HEIGHT,
  },
  fill: {
    height: "100%",
    borderTopLeftRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
  },
  value: {
    position: "absolute",
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
    color: "#fff",
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
