// app/(tabs)/index.tsx
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// ✅ named exports only; nothing here executes hooks on import
import { HealthBar, useDeltaFromUrl, useHealthEngine } from '../../GUIDevices/HealthMonitor/HealthMonitor';

export default function HomeScreen() {
  // ✅ hooks at top level of a function component
  const { health, applyDelta } = useHealthEngine(85);

  useDeltaFromUrl('http://<host>:5173/status.json', {
    intervalMs: 5000,
    onDelta: applyDelta,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.healthCard}>
        <ThemedText type="subtitle">Bunker Health</ThemedText>
        <View style={{ marginTop: 8 }}>
          <HealthBar value={health} />
        </View>
      </ThemedView>

      {/* ...rest of your original content... */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  healthCard: { gap: 8, marginBottom: 12, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, backgroundColor: '#111' },
  reactLogo: { height: 178, width: 290, bottom: 0, left: 0, position: 'absolute' },
});