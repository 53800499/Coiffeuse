/** @format */

import { Header } from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import ProductCard from "../../components/ProductCard";
import ServiceCard from "../../components/ServiceCard";

interface Category {
  id: number;
  name: string;
  image: any;
}

interface Product {
  id: number;
  name: string;
  description: string;
  rating: number;
  image: any;
  price: string;
  categoryId: string;
}

// Données de test pour les services
const services = [
  {
    id: 1,
    title: "Coupe Femme",
    description: "Coupe et brushing professionnel pour femme",
    price: 3500,
    duration: 60,
    image: require("../../assets/images/service-1.jpg")
  },
  {
    id: 2,
    title: "Coupe Homme",
    description: "Coupe et coiffage professionnelle pour homme",
    price: 2500,
    duration: 30,
    image: require("../../assets/images/service-2.jpg")
  },
  {
    id: 3,
    title: "Coloration",
    description: "Coloration professionnelle avec produits de qualité",
    price: 4500,
    duration: 90,
    image: require("../../assets/images/service-3.jpg")
  }
];

// Données de test pour les catégories de produits
const categories = [
  {
    id: 1,
    name: "Shampoings",
    image: require("../../assets/images/sha.jpg")
  },
  {
    id: 2,
    name: "Soins",
    image: require("../../assets/images/soin.jpg")
  },
  {
    id: 3,
    name: "Coiffants",
    image: require("../../assets/images/coiffant.jpg")
  },
  {
    id: 4,
    name: "Accessoires",
    image: require("../../assets/images/ace.jpg")
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

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const router = useRouter();

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategory
      ]}
      onPress={() => {
        setSelectedCategory(item.name);
      }}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < Math.floor(item.rating) ? "star" : "star-outline"}
          size={16}
          color="#FF6347"
        />
      );
    }

    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => {
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id }
          });
        }}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratingContainer}>{stars}</View>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullScreenContainer}>
      <Header />

      <ScrollView style={styles.contentScrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Offres Spéciales</Text>
            <Text style={styles.bannerSubtitle}>
              Jusqu&apos;à 50% de réduction
            </Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => console.log("Promo pressed")}>
              <Text style={styles.bannerButtonText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/placeholder-banner.png")}
            style={styles.bannerImage}
          />
        </View>

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

        {/* Section Catégories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>
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
              <React.Fragment key={category.id}>
                {renderCategoryItem({ item: category })}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* Section Produits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits</Text>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard as ViewStyle}>
                <ProductCard {...product} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  contentScrollView: {
    flex: 1
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333"
  },
  banner: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FF6347",
    borderRadius: 15,
    overflow: "hidden",
    height: 150
  },
  bannerTextContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15
  },
  bannerButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start"
  },
  bannerButtonText: {
    color: "#FF6347",
    fontWeight: "bold"
  },
  bannerImage: {
    width: "40%",
    height: "100%"
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    fontFamily: "Poppins-SemiBold"
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
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 5
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
  productCard: {
    width: "48%",
    marginBottom: 16
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  productImage: {
    width: 100,
    height: 100
  },
  productInfo: {
    flex: 1,
    padding: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginBottom: 5
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347"
  }
});

export default HomeScreen;
