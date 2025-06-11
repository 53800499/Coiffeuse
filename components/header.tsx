import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { authService, User } from "../services/authService";

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
    }
  };

  const handleNavigate = async (page: string) => {
    setMenuVisible(false);
    try {
      switch (page) {
        case "Profile":
          router.push("/profile");
          break;
        case "Settings":
          router.push("/settings");
          break;
        case "Help":
          router.push("/help");
          break;
        case "About":
          router.push("/about");
          break;
        case "Logout":
          await authService.logout();
          router.replace("/auth");
          break;
        default:
          console.log("Navigation vers:", page);
      }
    } catch (error) {
      if (page === "Logout") {
        Alert.alert(
          "Erreur",
          "Impossible de se déconnecter. Veuillez réessayer."
        );
      } else {
        console.error("Erreur de navigation:", error);
      }
    }
  };

  const menuItems = [
    {
      title: "Mon Profil",
      icon: "person-outline",
      action: "Profile"
    },
    {
      title: "Paramètres",
      icon: "settings-outline",
      action: "Settings"
    },
    {
      title: "Aide & Support",
      icon: "help-circle-outline",
      action: "Help"
    },
    {
      title: "À propos",
      icon: "information-circle-outline",
      action: "About"
    },
    {
      title: "Déconnexion",
      icon: "log-out-outline",
      action: "Logout",
      isDestructive: true
    }
  ];

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={30} color="#333" />
      </TouchableOpacity>
      <View>
        {/* <Text style={styles.greeting}>Bonjour</Text> */}
        <Text style={styles.userName}>
          {currentUser
            ? `${currentUser.prenom} ${currentUser.nom}`
            : "Utilisateur"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => handleNavigate("Profile")}>
        <Image
          source={require("../assets/placeholder-profile.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={[
                  styles.menuItem,
                  item.isDestructive && styles.destructiveMenuItem
                ]}
                onPress={() => handleNavigate(item.action)}>
                <View style={styles.menuItemContent}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.isDestructive ? "#FF3B30" : "#333"}
                    style={styles.menuIcon}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      item.isDestructive && styles.destructiveText
                    ]}>
                    {item.title}
                  </Text>
                </View>
                {!item.isDestructive && (
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5
  },
  greeting: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins-Regular"
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-SemiBold"
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FF6347"
  },
  profileImage: {
    width: "100%",
    height: "100%"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 60,
    marginLeft: 10,
    borderRadius: 12,
    elevation: 5,
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuIcon: {
    marginRight: 12
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular"
  },
  destructiveMenuItem: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 5
  },
  destructiveText: {
    color: "#FF3B30",
    fontFamily: "Poppins-Medium"
  }
});