import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavigate = (page: string) => {
    setMenuVisible(false);
    // Remplace ceci par ta navigation réelle
    console.log("Naviguer vers :", page);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={30} color="#333" />
      </TouchableOpacity>
      <View>
        <Text style={styles.greeting}>Bonjour</Text>
        <Text style={styles.userName}>Doe John</Text>
      </View>
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => console.log("Profile pressed")}>
        <Image
          source={require("../assets/placeholder-profile.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate("Prestations")}>
              <Text>Gestion des prestations</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate("RepertoireCoiffeuse")}>
              <Text>Répertoire de coiffeuse</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate("Stocks")}>
              <Text>Gestion des stocks</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate("Comptabilite")}>
              <Text>Gestion de la comptabilité</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate("Logout")}>
              <Text style={{ color: "red" }}>Déconnexion</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  greeting: {
    fontSize: 16,
    color: "#888"
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden"
  },
  profileImage: {
    width: "100%",
    height: "100%"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  menuContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 60,
    marginLeft: 10,
    borderRadius: 8,
    elevation: 5,
    minWidth: 220
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});