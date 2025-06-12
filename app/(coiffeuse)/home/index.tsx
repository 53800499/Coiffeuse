/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { authService, User } from "../../../services/authService";

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

  // Simule un avatar et un badge expert
  const avatarUrl =
    user?.photoURL ||
    "https://randomuser.me/api/portraits/women/44.jpg"; // à remplacer par ta vraie image

  const menuItems = [
    {
      title: "Rendez-vous",
      icon: "calendar",
      color: "#FF6347",
      route: "/(coiffeuse)/calendar"
    },
    {
      title: "Clients",
      icon: "people",
      color: "#4CAF50",
      route: "/(coiffeuse)/home/clients"
    },
    {
      title: "Services",
      icon: "cut",
      color: "#2196F3",
      route: "/(coiffeuse)/home/services"
    },
    {
      title: "Produits",
      icon: "cube",
      color: "#FF9800",
      route: "/(coiffeuse)/home/produits"
    },
    {
      title: "Profil",
      icon: "person",
      color: "#9C27B0",
      route: "/(coiffeuse)/home/profile"
    }
  ];

  const stats = [
    {
      icon: "cash",
      color: "#2196F3",
      label: "Chiffre d'affaires",
      value: "250 000 FCFA"
    },
    {
      icon: "cart",
      color: "#FF9800",
      label: "Ventes produits",
      value: "18"
    },
    {
      icon: "people",
      color: "#4CAF50",
      label: "Clients actifs",
      value: "45"
    },
    {
      icon: "star",
      color: "#FFD700",
      label: "Avis clients",
      value: "4.9/5"
    }
  ];

  const popularServices = [
    { name: "Tresses africaines", price: "15 000 FCFA", icon: "cut", count: 12 },
    { name: "Défrisage", price: "10 000 FCFA", icon: "color-palette", count: 8 },
    { name: "Brushing", price: "8 000 FCFA", icon: "leaf", count: 6 }
  ];

  const products = [
    { name: "Shampoing Pro", price: "4 000 FCFA", stock: 12, icon: "flask" },
    { name: "Crème coiffante", price: "3 500 FCFA", stock: 7, icon: "cube" },
    { name: "Sérum réparateur", price: "6 000 FCFA", stock: 3, icon: "water" }
  ];

  const handleLogout = async () => {
    await authService.logout();
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      {/* Header expert */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>
              {user?.prenom || "Coiffeuse"}{" "}
              <Text style={styles.expertBadge}>Expert(e)</Text>
            </Text>
            <Text style={styles.subText}>Salon professionnel</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Statistiques */}
        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              <Text style={styles.statNumber}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu rapide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation rapide</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => router.push(item.route)}>
                <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services stars */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services stars</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularServices.map((service, idx) => (
              <View key={idx} style={styles.cardSmall}>
                <Ionicons name={service.icon as any} size={28} color="#FF6347" />
                <Text style={styles.cardTitle}>{service.name}</Text>
                <Text style={styles.cardSub}>{service.price}</Text>
                <View style={styles.badge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.badgeText}>{service.count} fois</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Produits phares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits phares</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((prod, idx) => (
              <View key={idx} style={styles.cardSmall}>
                <Ionicons name={prod.icon as any} size={28} color="#FF9800" />
                <Text style={styles.cardTitle}>{prod.name}</Text>
                <Text style={styles.cardSub}>{prod.price}</Text>
                <View style={[styles.badge, { backgroundColor: "#FFF3E0" }]}>
                  <Ionicons name="cube" size={14} color="#FF9800" />
                  <Text style={[styles.badgeText, { color: "#FF9800" }]}>
                    Stock : {prod.stock}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#FF6347"
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  expertBadge: {
    fontSize: 13,
    color: "#fff",
    backgroundColor: "#FF6347",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
    overflow: "hidden"
  },
  subText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2
  },
  logoutButton: {
    padding: 8
  },
  content: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 18
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center"
  },
  section: {
    marginTop: 28
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginLeft: 20
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12
  },
  menuItem: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },
  menuItemText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500"
  },
  cardSmall: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: 130,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 8
  },
  cardSub: {
    fontSize: 13,
    color: "#FF6347",
    marginTop: 2
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6
  },
  badgeText: {
    fontSize: 12,
    color: "#FFD700",
    marginLeft: 4,
    fontWeight: "bold"
  }
});
