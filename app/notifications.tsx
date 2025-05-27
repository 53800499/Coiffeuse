/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";
import { fonts, fontSizes } from "./theme/fonts";

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Simuler des données de notifications
  const notifications = [
    {
      id: "1",
      type: "appointment",
      title: "Rendez-vous confirmé",
      message:
        "Votre rendez-vous pour une coupe de cheveux est confirmé pour demain à 14h.",
      date: "Il y a 2 heures",
      isRead: false,
      color: "#FF6347"
    },
    {
      id: "2",
      type: "promotion",
      title: "Offre spéciale",
      message:
        "Profitez de -20% sur tous les services de coloration ce mois-ci !",
      date: "Il y a 1 jour",
      isRead: true,
      color: "#4CAF50"
    },
    {
      id: "3",
      type: "reminder",
      title: "Rappel de rendez-vous",
      message: "N'oubliez pas votre rendez-vous demain à 15h30.",
      date: "Il y a 2 jours",
      isRead: true,
      color: "#2196F3"
    }
  ];

  const filters = [
    { id: "all", label: "Tout", icon: "notifications" },
    { id: "unread", label: "Non lues", icon: "mail-unread" },
    { id: "appointment", label: "Rendez-vous", icon: "calendar" },
    { id: "promotion", label: "Promotions", icon: "pricetag" }
  ];

  // Filtrer les notifications en fonction du filtre sélectionné
  const filteredNotifications = useMemo(() => {
    switch (selectedFilter) {
      case "unread":
        return notifications.filter((notification) => !notification.isRead);
      case "appointment":
        return notifications.filter(
          (notification) => notification.type === "appointment"
        );
      case "promotion":
        return notifications.filter(
          (notification) => notification.type === "promotion"
        );
      default:
        return notifications;
    }
  }, [selectedFilter, notifications]);

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

  const renderFilterItem = ({ item }: { item: (typeof filters)[0] }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.filterItemActive
      ]}
      onPress={() => setSelectedFilter(item.id)}>
      <Ionicons
        name={item.icon as any}
        size={20}
        color={selectedFilter === item.id ? "#FF6347" : "#666"}
      />
      <Text
        style={[
          styles.filterLabel,
          { fontFamily: fonts.medium },
          selectedFilter === item.id && styles.filterLabelActive
        ]}>
        {item.label}
      </Text>
      {item.id === "unread" &&
        notifications.filter((n) => !n.isRead).length > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
              {notifications.filter((n) => !n.isRead).length}
            </Text>
          </View>
        )}
    </TouchableOpacity>
  );

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
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: `${item.color}15` }
        ]}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color={item.color}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={[styles.notificationTitle, { fontFamily: fonts.semiBold }]}>
            {item.title}
          </Text>
          <Text
            style={[styles.notificationDate, { fontFamily: fonts.regular }]}>
            {item.date}
          </Text>
        </View>
        <Text
          style={[styles.notificationMessage, { fontFamily: fonts.regular }]}>
          {item.message}
        </Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off" size={48} color="#999" />
      <Text style={[styles.emptyText, { fontFamily: fonts.medium }]}>
        Aucune notification
      </Text>
      <Text style={[styles.emptySubText, { fontFamily: fonts.regular }]}>
        {selectedFilter === "unread"
          ? "Vous n'avez pas de notifications non lues"
          : selectedFilter === "appointment"
          ? "Vous n'avez pas de notifications de rendez-vous"
          : selectedFilter === "promotion"
          ? "Vous n'avez pas de notifications de promotions"
          : "Vous n'avez pas de notifications"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Notifications
        </Text>
        <TouchableOpacity style={styles.clearButton}>
          <Ionicons name="checkmark-done" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  backButton: {
    padding: 8
  },
  title: {
    fontSize: fontSizes.xl,
    color: "#333"
  },
  clearButton: {
    padding: 8
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  filtersList: {
    paddingHorizontal: 15
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f8f8f8"
  },
  filterItemActive: {
    backgroundColor: "#FFF5F5"
  },
  filterLabel: {
    fontSize: fontSizes.sm,
    color: "#666",
    marginLeft: 5
  },
  filterLabelActive: {
    color: "#FF6347"
  },
  listContainer: {
    padding: 15
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  unreadNotification: {
    backgroundColor: "#FFF5F5"
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: fontSizes.base,
    color: "#333"
  },
  notificationDate: {
    fontSize: fontSizes.xs,
    color: "#999"
  },
  notificationMessage: {
    fontSize: fontSizes.sm,
    color: "#666",
    lineHeight: 20
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6347",
    position: "absolute",
    top: 15,
    right: 15
  },
  filterBadge: {
    backgroundColor: "#FF6347",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    paddingHorizontal: 5
  },
  filterBadgeText: {
    color: "#fff",
    fontSize: fontSizes.xs,
    fontFamily: fonts.medium
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50
  },
  emptyText: {
    fontSize: fontSizes.lg,
    color: "#333",
    marginTop: 15,
    marginBottom: 5
  },
  emptySubText: {
    fontSize: fontSizes.base,
    color: "#666",
    textAlign: "center"
  }
});
