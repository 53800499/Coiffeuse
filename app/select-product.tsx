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

// Simuler la récupération des données des produits depuis une API
const products = [
  {
    id: "1",
    name: "Shampoing Hydratant",
    description: "Shampoing nourrissant pour cheveux secs et abîmés",
    rating: 4.5,
    image: require("../assets/placeholder-product.png"),
    price: "24.99 €",
    duration: "45 min"
  },
  {
    id: "2",
    name: "Masque Capillaire",
    description: "Masque réparateur intensif pour cheveux colorés",
    rating: 4.8,
    image: require("../assets/placeholder-product.png"),
    price: "29.99 €",
    duration: "30 min"
  },
  {
    id: "3",
    name: "Sérum Brillance",
    description: "Sérum lissant pour cheveux brillants et soyeux",
    rating: 4.2,
    image: require("../assets/placeholder-product.png"),
    price: "19.99 €",
    duration: "20 min"
  }
];

export default function SelectProduct() {
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < Math.floor(rating) ? "star" : "star-outline"}
          size={16}
          color="#FF6347"
        />
      );
    }
    return stars;
  };

  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Choisir un service</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  listContainer: {
    padding: 15
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6347"
  },
  duration: {
    fontSize: 14,
    color: "#666"
  }
});
