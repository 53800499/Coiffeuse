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

export default function ReviewsScreen() {
  const router = useRouter();
  const { user } = useUser();

  // Simuler des données d'avis
  const reviews = [
    {
      id: "1",
      service: "Coupe de cheveux",
      date: "15/03/2024",
      rating: 5,
      comment: "Excellent service, très professionnel !",
      image: require("../assets/placeholder-profile.png")
    },
    {
      id: "2",
      service: "Coloration",
      date: "01/03/2024",
      rating: 4,
      comment: "Bon résultat, mais un peu long à réaliser.",
      image: require("../assets/placeholder-profile.png")
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={16}
            color={star <= rating ? "#FFD700" : "#999"}
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: (typeof reviews)[0] }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={item.image} style={styles.reviewImage} />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewService}>{item.service}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
      </View>
      {renderStars(item.rating)}
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Mes avis</Text>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
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
  reviewItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  reviewImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  reviewInfo: {
    marginLeft: 10
  },
  reviewService: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20
  }
});
