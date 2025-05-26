/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Category {
  id: string;
  name: string;
  image: any;
}

interface Product {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: any;
  price: string;
  categoryId: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Coiffures",
    image: require("../../assets/placeholder-category.png")
  },
  {
    id: "2",
    name: "Soins",
    image: require("../../assets/placeholder-category.png")
  },
  {
    id: "3",
    name: "Coloration",
    image: require("../../assets/placeholder-category.png")
  },
  {
    id: "4",
    name: "Mèches",
    image: require("../../assets/placeholder-category.png")
  }
];

const products: Product[] = [
  {
    id: "1",
    name: "Shampoing Hydratant",
    description: "Shampoing nourrissant pour cheveux secs et abîmés",
    rating: 4.5,
    image: require("../../assets/placeholder-product.png"),
    price: "24.99 €",
    categoryId: "2"
  },
  {
    id: "2",
    name: "Masque Capillaire",
    description: "Masque réparateur intensif pour cheveux colorés",
    rating: 4.8,
    image: require("../../assets/placeholder-product.png"),
    price: "29.99 €",
    categoryId: "2"
  },
  {
    id: "3",
    name: "Sérum Brillance",
    description: "Sérum lissant pour cheveux brillants et soyeux",
    rating: 4.2,
    image: require("../../assets/placeholder-product.png"),
    price: "19.99 €",
    categoryId: "2"
  },
  {
    id: "4",
    name: "Coloration Brune",
    description: "Teinture capillaire brune naturelle",
    rating: 4.6,
    image: require("../../assets/placeholder-product.png"),
    price: "15.99 €",
    categoryId: "3"
  },
  {
    id: "5",
    name: "Mèches Blondes",
    description: "Mèches blondes naturelles",
    rating: 4.7,
    image: require("../../assets/placeholder-product.png"),
    price: "39.99 €",
    categoryId: "4"
  }
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const router = useRouter();

  const filteredProducts = React.useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.categoryId === selectedCategory)
      : products;
  }, [selectedCategory]);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => {
        setSelectedCategory(selectedCategory === item.id ? null : item.id);
      }}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Menu pressed")}>
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
            source={require("../../assets/placeholder-profile.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

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

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(null);
              console.log("View all categories");
            }}>
            <Text style={styles.viewAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesListContent}
        />
      </View>

      {/* Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory
              ? `Produits - ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`
              : "Tous les Produits"}
          </Text>
          <TouchableOpacity onPress={() => console.log("View all products")}>
            <Text style={styles.viewAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingTop: 40
  },
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333"
  },
  banner: {
    height: 180,
    backgroundColor: "#FF6347",
    borderRadius: 15,
    marginBottom: 25,
    overflow: "hidden",
    flexDirection: "row",
    padding: 20
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: "center"
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8
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
    width: 150,
    height: 150,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  section: {
    marginBottom: 25
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  viewAllText: {
    color: "#FF6347",
    fontSize: 14
  },
  categoriesListContent: {
    paddingRight: 15
  },
  categoryItem: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
    padding: 8,
    borderRadius: 10
  },
  selectedCategoryItem: {
    backgroundColor: "#FF6347"
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center"
  },
  selectedCategoryText: {
    color: "#fff"
  },
  productRow: {
    justifyContent: "space-between",
    marginBottom: 15
  },
  productItem: {
    width: (Dimensions.get("window").width - 45) / 2,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  productInfo: {
    padding: 5
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
    marginBottom: 8
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347"
  }
});

export default HomeScreen;
