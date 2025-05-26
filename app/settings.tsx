/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";

interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  type?: "switch";
  value?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const [settings, setSettings] = React.useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    locationServices: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const menuItems: MenuSection[] = [
    {
      title: "Compte",
      items: [
        {
          icon: "person-outline",
          title: "Informations personnelles",
          subtitle: "Modifier vos informations de profil",
          onPress: () => router.push("/edit-profile")
        },
        {
          icon: "lock-closed-outline",
          title: "Sécurité",
          subtitle: "Mot de passe et authentification",
          onPress: () => router.push("/security")
        }
      ]
    },
    {
      title: "Préférences",
      items: [
        {
          icon: "notifications-outline",
          title: "Notifications",
          subtitle: "Gérer les notifications push",
          type: "switch",
          value: settings.notifications,
          onToggle: () => toggleSetting("notifications")
        },
        {
          icon: "mail-outline",
          title: "Notifications par email",
          subtitle: "Recevoir des emails",
          type: "switch",
          value: settings.emailNotifications,
          onToggle: () => toggleSetting("emailNotifications")
        },
        {
          icon: "moon-outline",
          title: "Mode sombre",
          subtitle: "Changer le thème de l'application",
          type: "switch",
          value: settings.darkMode,
          onToggle: () => toggleSetting("darkMode")
        },
        {
          icon: "location-outline",
          title: "Services de localisation",
          subtitle: "Autoriser l'accès à votre position",
          type: "switch",
          value: settings.locationServices,
          onToggle: () => toggleSetting("locationServices")
        }
      ]
    },
    {
      title: "Application",
      items: [
        {
          icon: "information-circle-outline",
          title: "À propos",
          subtitle: "Version et informations",
          onPress: () => router.push("/about")
        },
        {
          icon: "document-text-outline",
          title: "Conditions d'utilisation",
          subtitle: "Lire les conditions",
          onPress: () => router.push("/terms")
        },
        {
          icon: "shield-outline",
          title: "Politique de confidentialité",
          subtitle: "Comment nous utilisons vos données",
          onPress: () => router.push("/privacy")
        }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Paramètres</Text>
      </View>

      {menuItems.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.lastMenuItem
                ]}
                onPress={item.onPress}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color="#007AFF"
                    />
                  </View>
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                {item.type === "switch" ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: "#E0E0E0", true: "#81b0ff" }}
                    thumbColor={item.value ? "#007AFF" : "#f4f3f4"}
                    ios_backgroundColor="#E0E0E0"
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.copyrightText}>
          © 2024 Coiffeuse. Tous droits réservés.
        </Text>
      </View>
    </ScrollView>
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
    borderBottomColor: "#eee",
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
  backButton: {
    marginRight: 15,
    padding: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginLeft: 20,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
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
  lastMenuItem: {
    borderBottomWidth: 0
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
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
  menuItemInfo: {
    flex: 1
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: "#666"
  },
  versionContainer: {
    alignItems: "center",
    padding: 24,
    marginTop: 8
  },
  versionText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4
  },
  copyrightText: {
    fontSize: 12,
    color: "#999"
  }
});
