/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "./context/UserContext";

export default function CardsScreen() {
  const router = useRouter();
  const { user } = useUser();

  // Simuler des données de cartes
  const cards = [
    {
      id: "1",
      type: "Visa",
      number: "**** **** **** 1234",
      expiry: "12/25",
      isDefault: true
    },
    {
      id: "2",
      type: "Mastercard",
      number: "**** **** **** 5678",
      expiry: "09/24",
      isDefault: false
    }
  ];

  const renderCard = (card: (typeof cards)[0]) => (
    <View key={card.id} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>{card.type}</Text>
          {card.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Par défaut</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardNumber}>{card.number}</Text>
        <Text style={styles.cardExpiry}>Expire le {card.expiry}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
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
        <Text style={styles.title}>Mes cartes</Text>
      </View>

      <View style={styles.content}>
        {cards.map(renderCard)}

        <TouchableOpacity style={styles.addCardButton}>
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.addCardText}>Ajouter une carte</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 15
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  card: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 20,
    marginRight: 10
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  cardType: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  defaultBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  defaultText: {
    color: "#fff",
    fontSize: 12
  },
  cardNumber: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10
  },
  cardExpiry: {
    color: "#fff",
    fontSize: 14
  },
  deleteButton: {
    padding: 10
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  addCardText: {
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 10
  }
});
