/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useUser();

  // Simuler des données de notifications
  const notifications = [
    {
      id: "1",
      type: "appointment",
      title: "Rendez-vous confirmé",
      message:
        "Votre rendez-vous pour une coupe de cheveux est confirmé pour demain à 14h.",
      date: "Il y a 2 heures",
      isRead: false
    },
    {
      id: "2",
      type: "promotion",
      title: "Offre spéciale",
      message:
        "Profitez de -20% sur tous les services de coloration ce mois-ci !",
      date: "Il y a 1 jour",
      isRead: true
    },
    {
      id: "3",
      type: "reminder",
      title: "Rappel de rendez-vous",
      message: "N'oubliez pas votre rendez-vous demain à 15h30.",
      date: "Il y a 2 jours",
      isRead: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return "calendar";
      case "promotion":
        return "pricetag";
      case "reminder":
        return "alarm";
      default:
        return "notifications";
    }
  };

  const renderNotificationItem = ({
    item
  }: {
    item: (typeof notifications)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification
      ]}>
      <View style={styles.notificationIcon}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color={item.isRead ? "#999" : "#007AFF"}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDate}>{item.date}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40 // Pour éviter que le contenu soit caché sous la barre de statut
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  listContainer: {
    padding: 15
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  unreadNotification: {
    backgroundColor: "#F0F8FF"
  },
  notificationIcon: {
    marginRight: 15
  },
  notificationContent: {
    flex: 1
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  notificationDate: {
    fontSize: 12,
    color: "#999"
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20
  }
});
