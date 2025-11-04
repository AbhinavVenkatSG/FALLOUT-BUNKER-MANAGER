// ✅ correct imports
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// (rest)
import { HealthBar, STATUS_URL, useDeltaFromUrl, useHealthEngine } from '../../GUIDevices/HealthMonitor/HealthMonitor';
export default function HomeScreen() {
  const { health, applyDelta } = useHealthEngine(85);

  useDeltaFromUrl(STATUS_URL, {
    intervalMs: 5000,
    onDelta: (delta, seq) => {
      console.log("delta", delta, "seq", seq);
      applyDelta(delta, seq);
    },
  });

  return (
    <ThemedView style={{ padding: 16, gap: 12 }}>
      <HealthBar value={health} />
      <ThemedText style={{ opacity: 0.7, fontSize: 12 }}>
        {`URL: ${STATUS_URL}`}
      </ThemedText>
    </ThemedView>
  );
}