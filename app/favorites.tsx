/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";

export default function FavoritesScreen() {
  const router = useRouter();
  const { user } = useUser();

  // Simuler des données de favoris
  const favorites = [
    {
      id: "1",
      name: "Coupe de cheveux",
      image: require("../assets/placeholder-profile.png"),
      price: "30€",
      duration: "30 min"
    },
    {
      id: "2",
      name: "Coloration",
      image: require("../assets/placeholder-profile.png"),
      price: "60€",
      duration: "1h30"
    }
  ];

  const renderFavoriteItem = ({ item }: { item: (typeof favorites)[0] }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() =>
        router.push({ pathname: "/product/[id]", params: { id: item.id } })
      }>
      <Image source={item.image} style={styles.favoriteImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={styles.favoritePrice}>{item.price}</Text>
          <Text style={styles.favoriteDuration}>{item.duration}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={24} color="#FF3B30" />
      </TouchableOpacity>
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
        <Text style={styles.title}>Mes favoris</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
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
  favoriteItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center"
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 15
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  favoriteDetails: {
    flexDirection: "row",
    alignItems: "center"
  },
  favoritePrice: {
    fontSize: 14,
    color: "#666",
    marginRight: 10
  },
  favoriteDuration: {
    fontSize: 14,
    color: "#666"
  },
  removeButton: {
    padding: 10
  }
});
