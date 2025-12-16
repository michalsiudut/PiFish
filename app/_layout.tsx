import { UserProvider } from '@/context/UserContext';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { CustomSplashScreen } from '../components/CustomSplashScreen';
import './globals.css';
SplashScreen.preventAutoHideAsync().catch(() => { });


export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAppReady && isSplashFinished) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start();
    }
  }, [isAppReady, isSplashFinished, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
      </Animated.View>

      {(!isAppReady || !isSplashFinished) && (
        <View style={styles.splashOverlay} pointerEvents="auto">
          <CustomSplashScreen onFinish={() => setSplashFinished(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    backgroundColor: '#fff',
  },
});