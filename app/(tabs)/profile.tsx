/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Avatar from "../components/Avatar";
import { useUser } from "../context/UserContext";
import { fonts, fontSizes } from "../theme/fonts";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUser();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: "clamp"
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp"
  });

  const stats = [
    {
      icon: "calendar-outline",
      label: "Rendez-vous",
      value: "12"
    },
    {
      icon: "heart-outline",
      label: "Favoris",
      value: "8"
    },
    {
      icon: "star-outline",
      label: "Avis",
      value: "15"
    }
  ];

  const menuItems = [
    {
      icon: "calendar-outline",
      title: "Mes rendez-vous",
      onPress: () => router.push("/(tabs)/calendar")
    },
    {
      icon: "heart-outline",
      title: "Favoris",
      onPress: () => router.push("/favorites")
    },
    {
      icon: "star-outline",
      title: "Mes avis",
      onPress: () => router.push("/reviews")
    },
    {
      icon: "card-outline",
      title: "Mes cartes",
      onPress: () => router.push("/cards")
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      onPress: () => router.push("/notifications")
    },
    {
      icon: "settings-outline",
      title: "Paramètres",
      onPress: () => router.push("/settings")
    },
    {
      icon: "help-circle-outline",
      title: "Aide",
      onPress: () => router.push("/help")
    }
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity
          }
        ]}>
        <View style={styles.headerContent}>
          <Avatar size={100} image={user?.profileImage} name={user?.name} />
          <Text style={[styles.name, { fontFamily: fonts.semiBold }]}>
            {user?.name || "Utilisateur"}
          </Text>
          <Text style={[styles.email, { fontFamily: fonts.regular }]}>
            {user?.email || "email@example.com"}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/edit-profile")}>
            <Ionicons name="pencil" size={16} color="#007AFF" />
            <Text style={[styles.editButtonText, { fontFamily: fonts.medium }]}>
              Modifier le profil
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon as any} size={24} color="#007AFF" />
              <Text style={[styles.statValue, { fontFamily: fonts.semiBold }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { fontFamily: fonts.regular }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={22} color="#007AFF" />
                </View>
                <Text
                  style={[styles.menuItemText, { fontFamily: fonts.medium }]}>
                  {item.title}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            router.replace("/auth");
          }}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={[styles.logoutButtonText, { fontFamily: fonts.medium }]}>
            Déconnexion
          </Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 3
      }
    })
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  name: {
    fontSize: fontSizes["2xl"],
    color: "#333",
    marginTop: 15
  },
  email: {
    fontSize: fontSizes.base,
    color: "#666",
    marginTop: 5
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15
  },
  editButtonText: {
    color: "#007AFF",
    fontSize: fontSizes.sm,
    marginLeft: 5
  },
  content: {
    flex: 1
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
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
  statItem: {
    alignItems: "center"
  },
  statValue: {
    fontSize: fontSizes.xl,
    color: "#333",
    marginTop: 5
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: "#666",
    marginTop: 2
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  menuItemText: {
    fontSize: fontSizes.base,
    color: "#333"
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
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
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: fontSizes.base,
    marginLeft: 8
  }
});
