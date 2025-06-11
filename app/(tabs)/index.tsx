/** @format */

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import ProductCard from "../../components/ProductCard";
import ServiceCard from "../../components/ServiceCard";

// Données de test pour les services
const services = [
  {
    id: 1,
    title: "Coupe Femme",
    description: "Coupe et brushing professionnel pour femme",
    price: 35,
    duration: 60,
    image: require("../../assets/images/service-1.jpg")
  },
  {
    id: 2,
    title: "Coupe Homme",
    description: "Coupe et coiffage pour homme",
    price: 25,
    duration: 30,
    image: require("../../assets/images/service-2.jpg")
  },
  {
    id: 3,
    title: "Coloration",
    description: "Coloration professionnelle avec produits de qualité",
    price: 45,
    duration: 90,
    image: require("../../assets/images/service-3.jpg")
  }
];

// Données de test pour les catégories de produits
const categories = [
  {
    id: 1,
    name: "Shampoings",
    image: require("../../assets/images/category-1.jpg")
  },
  {
    id: 2,
    name: "Soins",
    image: require("../../assets/images/category-2.jpg")
  },
  {
    id: 3,
    name: "Coiffants",
    image: require("../../assets/images/category-3.jpg")
  },
  {
    id: 4,
    name: "Accessoires",
    image: require("../../assets/images/category-4.jpg")
  }
];

// Données de test pour les produits
const products = [
  {
    id: 1,
    name: "Shampoing Hydratant",
    description: "Shampoing professionnel pour cheveux secs",
    price: 15.99,
    image: require("../../assets/images/product-1.jpg"),
    category: "Shampoings"
  },
  {
    id: 2,
    name: "Masque Réparateur",
    description: "Masque intensif pour cheveux abîmés",
    price: 24.99,
    image: require("../../assets/images/product-2.jpg"),
    category: "Soins"
  },
  {
    id: 3,
    name: "Gel Coiffant",
    description: "Gel fixant longue tenue",
    price: 12.99,
    image: require("../../assets/images/product-3.jpg"),
    category: "Coiffants"
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Section Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nos Services</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.servicesContainer}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard as ViewStyle}>
              <ServiceCard {...service} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Section Catégories de Produits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories de Produits</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}>
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === "Tous" && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory("Tous")}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "Tous" && styles.selectedCategoryText
              ]}>
              Tous
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.name && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category.name)}>
              <Image source={category.image} style={styles.categoryImage} />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.name &&
                    styles.selectedCategoryText
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Section Produits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produits</Text>
        <View style={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard as ViewStyle}>
              <ProductCard {...product} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  section: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16
  },
  servicesContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  serviceCard: {
    width: 300,
    marginRight: 16
  },
  categoriesContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  selectedCategory: {
    backgroundColor: "#FF6347"
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8
  },
  categoryText: {
    fontSize: 14,
    color: "#333"
  },
  selectedCategoryText: {
    color: "#fff"
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  productCard: {
    width: "48%",
    marginBottom: 16
  }
});
