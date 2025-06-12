/** @format */
/*
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
 */
/** @format */

import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";

export default function CoiffeuseLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "#888",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 5,
          paddingTop: 5
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendrier",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
