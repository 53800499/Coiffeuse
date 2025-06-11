/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { authService, User } from "../../services/authService";

export default function CoiffeuseDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const menuItems = [
    {
      title: "Rendez-vous",
      icon: "calendar",
      color: "#FF6347",
      route: "/appointments"
    },
    {
      title: "Clients",
      icon: "people",
      color: "#4CAF50",
      route: "/clients"
    },
    {
      title: "Services",
      icon: "cut",
      color: "#2196F3",
      route: "/services"
    },
    {
      title: "Profil",
      icon: "person",
      color: "#9C27B0",
      route: "/profile"
    }
  ];

  const handleLogout = async () => {
    await authService.logout();
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Bienvenue, {user?.prenom || "Coiffeuse"}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={32} color="#FF6347" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Rendez-vous aujourd'hui</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={32} color="#4CAF50" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Clients actifs</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}>
              <View style={styles.menuItemContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${item.color}15` }
                  ]}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.color}
                  />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  logoutButton: {
    padding: 8
  },
  content: {
    flex: 1
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 20
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center"
  },
  menuContainer: {
    padding: 20
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3
  },
  menuItemContent: {
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
    fontSize: 16,
    color: "#333",
    fontWeight: "500"
  }
});
