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
  const [isSplashFinished, setSplashFinished] = useState(true); //temporaty for better debugging

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

  useEffect(() => {
    if (isAppReady && isSplashFinished && !loading && !navigationAttempted.current) {
      navigationAttempted.current = true;

      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [isAppReady, isSplashFinished, loading, user]);


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