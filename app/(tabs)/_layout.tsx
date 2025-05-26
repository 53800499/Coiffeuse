/** @format */

import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
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
        name="profile"
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
