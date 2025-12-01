import { UserProvider } from '@/app/context/UserContext';
import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(pages)"
          options={{ headerShown: false }}
        />
      </Stack>
    </UserProvider>
  );
}