import { UserProvider } from '@/context/UserContext';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { CustomSplashScreen } from './(pages)/CustomSplashScreen';
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

  if (!isAppReady || !isSplashFinished) {
    return (
      <CustomSplashScreen
        onFinish={() => setSplashFinished(true)}
      />
    );
  }

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}