/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    // TODO: Implémenter la logique de commande
    console.log("Commande:", {
      product: params.name,
      quantity: parseInt(quantity),
      name,
      phone,
      address
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{params.name}</Text>
      </View>

      {/* Image du produit */}
      <Image
        source={require("../assets/images/product-1.jpg")}
        style={styles.productImage}
      />

      {/* Informations du produit */}
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{params.category}</Text>
        <Text style={styles.price}>1599 <FCFA></FCFA> </Text>
        <Text style={styles.description}>
          Shampoing professionnel pour cheveux secs. Formule enrichie en huiles
          naturelles pour une hydratation intense et durable.
        </Text>
      </View>

      {/* Formulaire de commande */}
      <View style={styles.orderContainer}>
        <Text style={styles.sectionTitle}>Passer commande</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantité</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                const newQuantity = Math.max(1, parseInt(quantity) - 1);
                setQuantity(newQuantity.toString());
              }}>
              <Ionicons name="remove" size={24} color="#333" />
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                const newQuantity = parseInt(quantity) + 1;
                setQuantity(newQuantity.toString());
              }}>
              <Ionicons name="add" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Votre nom"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Votre numéro de téléphone"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adresse de livraison</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={address}
            onChangeText={setAddress}
            placeholder="Votre adresse complète"
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Commander</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  backButton: {
    marginRight: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover"
  },
  infoContainer: {
    padding: 16
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24
  },
  orderContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  addressInput: {
    height: 100,
    textAlignVertical: "top"
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden"
  },
  quantityButton: {
    padding: 12,
    backgroundColor: "#f5f5f5"
  },
  quantityInput: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    padding: 12
  },
  orderButton: {
    backgroundColor: "#FF6347",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
