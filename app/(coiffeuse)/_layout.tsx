/** @format */

import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { authService } from "../../services/authService";

export default function CoiffeuseLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.getCurrentUser();
      if (!user || user.role !== "coiffeuse") {
        router.replace("/auth");
      }
    };
    checkAuth();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}>
      <Stack.Screen name="index" options={{ title: "Tableau de bord" }} />
      <Stack.Screen name="appointments" options={{ title: "Rendez-vous" }} />
      <Stack.Screen name="clients" options={{ title: "Clients" }} />
      <Stack.Screen name="services" options={{ title: "Services" }} />
      <Stack.Screen name="profile" options={{ title: "Profil" }} />
    </Stack>
  );
}
