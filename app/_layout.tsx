import Loader from '@/components/Loader';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { CustomSplashScreen } from '../components/CustomSplashScreen';
import './globals.css';
SplashScreen.preventAutoHideAsync().catch(() => { });

function RootLayoutComponent() {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashFinished, setSplashFinished] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();
  const navigationAttempted = useRef(false);

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
  }, [isAppReady, isSplashFinished]);

  // Kieruj do odpowiedniego ekranu po załadowaniu - wyzwola się tylko raz
  useEffect(() => {
    if (isAppReady && isSplashFinished && !loading && !navigationAttempted.current) {
      navigationAttempted.current = true;
      console.log('[RootLayout] Routing user to:', user ? '(tabs)' : '(auth)');

      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [isAppReady, isSplashFinished, loading, user]);

  console.log('[RootLayout] Auth state:', { user: user?.email, loading, isAppReady, isSplashFinished });

  // Czekaj na splash
  if (!isAppReady || !isSplashFinished) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <UserProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </UserProvider>
        </Animated.View>

        <View style={styles.splashOverlay} pointerEvents="auto">
          <CustomSplashScreen onFinish={() => setSplashFinished(true)} />
        </View>
      </View>
    );
  }

  // Czekaj na załadowanie auth
  if (loading) {
    return (
      <View style={styles.container}>
        <Loader zIndex={0} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
      </Animated.View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutComponent />
    </AuthProvider>
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