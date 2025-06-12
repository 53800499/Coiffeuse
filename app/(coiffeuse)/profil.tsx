/** @format */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

export default function ProfilScreen() {
  const router = useRouter();
  const { user, logout } = useUser();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [250, 120],
    extrapolate: "clamp"
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: "clamp"
  });

  const avatarScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp"
  });

  const stats = [
    {
      icon: "calendar-outline",
      label: "Rendez-vous",
      value: "12",
      color: "#FF6347"
    },
    {
      icon: "heart-outline",
      label: "Favoris",
      value: "8",
      color: "#FF69B4"
    },
    {
      icon: "star-outline",
      label: "Avis",
      value: "15",
      color: "#FFD700"
    }
  ];

  const menuItems = [
    {
      icon: "calendar-outline",
      title: "Mes rendez-vous",
      onPress: () => router.push("/(tabs)/calendar"),
      color: "#FF6347"
    },
    {
      icon: "heart-outline",
      title: "Favoris",
      onPress: () => router.push("/favorites"),
      color: "#FF69B4"
    },
    {
      icon: "star-outline",
      title: "Mes avis",
      onPress: () => router.push("/reviews"),
      color: "#FFD700"
    },
    {
      icon: "card-outline",
      title: "Mes cartes",
      onPress: () => router.push("/cards"),
      color: "#4CAF50"
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      onPress: () => router.push("/notifications"),
      color: "#2196F3"
    },
    {
      icon: "settings-outline",
      title: "Paramètres",
      onPress: () => router.push("/settings"),
      color: "#9C27B0"
    },
    {
      icon: "help-circle-outline",
      title: "Aide",
      onPress: () => router.push("/help"),
      color: "#FF9800"
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
        <LinearGradient
          colors={["#FF6347", "#FFB88C"]}
          style={styles.headerBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale: avatarScale }]
              }}>
              <View style={styles.avatarWrapper}>
                <Avatar
                  size={120}
                  image={require("../../assets/images/profile-bg.jpg")}
                  name={user?.name}
                />
                <TouchableOpacity
                  style={styles.cameraIcon}
                  onPress={() => router.push("/edit-profile")}
                  activeOpacity={0.7}>
                  <Ionicons name="camera" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </Animated.View>
            <Text style={[styles.name, { fontFamily: fonts.semiBold }]}>
              {user?.name || "Utilisateur"}
            </Text>
            <Text style={[styles.email, { fontFamily: fonts.regular }]}>
              {user?.email || "email@example.com"}
            </Text>
          </View>
        </LinearGradient>
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
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: `${stat.color}15` }
                ]}>
                <Ionicons
                  name={stat.icon as any}
                  size={24}
                  color={stat.color}
                />
              </View>
              <Text
                style={[
                  styles.statValue,
                  { fontFamily: fonts.semiBold, color: stat.color }
                ]}>
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
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${item.color}15` }
                  ]}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
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
    backgroundColor: "#f8f8f8"
  },
  header: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
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
  headerBackground: {
    flex: 1,
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 16
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  name: {
    fontSize: fontSizes["2xl"],
    color: "#fff",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: fonts.semiBold
  },
  email: {
    fontSize: fontSizes.base,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
      },
      android: {
        elevation: 5
      }
    })
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.sm,
    marginLeft: 5,
    fontWeight: "600"
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
    borderRadius: 16,
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
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  statValue: {
    fontSize: fontSizes.xl,
    marginBottom: 4
  },
  statLabel: {
    fontSize: fontSizes.sm,
    color: "#666"
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 10,
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    padding: 15,
    borderRadius: 16,
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
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#FF6347",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 10,
    position: "relative"
  },
  cameraIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#FF6347",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 3
  }
});
