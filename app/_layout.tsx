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
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (fontsLoaded) {
          const user = await authService.getCurrentUser();
          if (user) {
            if (user.role === "coiffeuse") {
              router.replace("/(coiffeuse)");
            } else {
              router.replace("/(tabs)");
            }
          } else {
            router.replace("/splash");
          }
        }
      } catch (error) {
        console.error("Erreur d'initialisation:", error);
        router.replace("/splash");
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !isLoading && isInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading, isInitialized]);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <UserProvider>
      <AppointmentsProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              contentStyle: { backgroundColor: "#fff" }
            }}>
            <Stack.Screen
              name="splash"
              options={{
                title: "Splash",
                animation: "fade",
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="auth"
              options={{
                title: "Authentication",
                animation: "fade",
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                title: "Client",
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="(coiffeuse)"
              options={{
                title: "Coiffeuse",
                headerShown: false,
                gestureEnabled: false
              }}
            />
          </Stack>
        </View>
      </AppointmentsProvider>
    </UserProvider>
  );
}
