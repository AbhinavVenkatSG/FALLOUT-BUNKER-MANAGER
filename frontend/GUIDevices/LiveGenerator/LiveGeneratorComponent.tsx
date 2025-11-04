import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

type LabelPosition = "below" | "above" | "left";

type Props = {
  value: number;                  // 0..100 (clamped internally)
  label?: string;                 // default "Generator"
  style?: StyleProp<ViewStyle>;   // wrapper styles
  labelPosition?: LabelPosition;  // below | above | left
  labelOffset?: number;           // px spacing
  showValue?: boolean;            // show numeric value
};

const TRACK_HEIGHT = 120;
const TRACK_WIDTH  = 20;

export default function LiveGeneratorComponent({
  value,
  label = "Generator",
  style,
  labelPosition = "below",
  labelOffset = 4,
  showValue = true,
}: Props) {
  const safe = Math.max(0, Math.min(100, value));
  const anim = useRef(new Animated.Value(safe)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: safe, duration: 250, useNativeDriver: false }).start();
  }, [safe]);

  const height = anim.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] });
  const color = anim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ["#ff1900ff", "#ffcc00ff", "#00ff6aff"],
  });

  const NumberValue = showValue ? (
    <Text style={[styles.value, { marginTop: labelOffset }]}>{Math.round(safe)}</Text>
  ) : null;

  const Label = (
    <Text
      style={[
        styles.label,
        labelPosition !== "left" ? { marginTop: labelOffset } : { marginRight: labelOffset },
      ]}
    >
      {label}
    </Text>
  );

  const Bar = (
    <View style={styles.wrap}>
      <Animated.View style={[styles.fill, { height, backgroundColor: color }]} />
    </View>
  );

  let content: React.ReactNode;
  if (labelPosition === "left") {
    content = (
      <View style={styles.row}>
        {Label}
        <View style={styles.colCenter}>
          {Bar}
          {NumberValue}
        </View>
      </View>
    );
  } else if (labelPosition === "above") {
    content = (
      <View style={styles.colCenter}>
        <Text style={[styles.label, { marginBottom: labelOffset }]}>{label}</Text>
        {Bar}
        {NumberValue}
      </View>
    );
  } else {
    content = (
      <View style={styles.colCenter}>
        {Bar}
        {NumberValue}
        {Label}
      </View>
    );
  }

  return <View style={[styles.root, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  root: { alignSelf: "flex-start" },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  colCenter: { flexDirection: "column", alignItems: "center" },
  wrap: {
    height: TRACK_HEIGHT,
    width: TRACK_WIDTH,
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column-reverse",
  },
  fill: { width: "100%" },
  value: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 14,
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.95)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  label: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});