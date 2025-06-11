/** @format */

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from "@expo-google-fonts/poppins";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { authService } from "../services/authService";
import { AppointmentsProvider } from "./context/AppointmentsContext";
import { UserProvider } from "./context/UserContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold
  });

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        if (user.role === "coiffeuse") {
          router.replace("/(coiffeuse)");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        router.replace("/auth");
      }
    };
    checkAuth();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <AppointmentsProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right"
            }}>
            <Stack.Screen name="splash" options={{ title: "Splash" }} />
            <Stack.Screen name="auth" options={{ title: "Authentication" }} />
            <Stack.Screen name="(tabs)" options={{ title: "Client" }} />
            <Stack.Screen name="(coiffeuse)" options={{ title: "Coiffeuse" }} />
          </Stack>
        </View>
      </AppointmentsProvider>
    </UserProvider>
  );
}
