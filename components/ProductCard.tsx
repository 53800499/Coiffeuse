/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category
}: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/product-details",
      params: { id, name, category }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{price}FCFA</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  content: {
    padding: 16
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347"
  },
  addButton: {
    padding: 4
  }
});
