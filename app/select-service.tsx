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

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: any;
}

// Données de test pour les services
const services: Service[] = [
  {
    id: 1,
    title: "Coupe Femme",
    description: "Coupe et brushing professionnel pour femme",
    price: 3500,
    duration: 60,
    image: require("../assets/images/coupe femme.jpg")
  },
  {
    id: 2,
    title: "Coupe Homme",
    description: "Coupe et coiffage professionnelle pour homme",
    price: 2500,
    duration: 30,
    image: require("../assets/images/service-2.jpg")
  },
  {
    id: 3,
    title: "Coloration",
    description: "Coloration professionnelle avec produits de qualité",
    price: 6500,
    duration: 90,
    image: require("../assets/images/60.png")
  }
  ,
  {
    id: 4,
    title: " Coupe garçon",
    description: "Coupe rapide et soignée pour garçons, adaptée à tous les styles.",
    price: 500,
    duration: 35,
    image: require("../assets/images/couupe garcon.jpg")
  }
  ,
  {
    id: 5,
    title: "Soin capillaire profond",
    description: "Traitement nourrissant en profondeur pour cheveux secs ou abîmés.",
    price: 4500,
    duration: 60,
    image: require("../assets/images/soin profond.jpg")
  }
  ,
  {
    id: 6,
    title: " Extension de cils",
    description: "Pose de cils pour un regard plus intense et naturellement allongé.",
    price: 9500,
    duration: 90,
    image: require("../assets/images/Extension de cils.jpg")
  }  ,
  {
    id: 7,
    title: "Défrisage",
    description: "Lissage durable des cheveux pour un rendu souple et sans frisottis.",
    price: 5000,
    duration: 45,
    image: require("../assets/images/Défrisage.jpg")
  }
  ,
  {
    id: 8,
    title: "Taille de barbe",
    description: "Coloration professionnelle avec produits de qualité",
    price: 1000,
    duration: 30,
    image: require("../assets/images/Taille de barbe.jpg")
  }
  ,
  {
    id: 9,
    title: " Tresse afro",
    description: "Réalisation de tresses traditionnelles ou modernes selon vos envies.",
    price: 4500,
    duration: 90,
    image: require("../assets/images/Tresse afro.jpg")
  }
];

export default function SelectService() {
  const router = useRouter();

  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => {
        // Naviguer vers la page de détail du service ou de prise de rendez-vous
        router.push({
          pathname: "/book-appointment",
          params: {
            serviceId: item.id,
            serviceTitle: item.title,
            servicePrice: item.price,
            serviceDuration: item.duration
          }
        });
      }}>
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceDetails}>
          <Text style={styles.price}>{item.price} €</Text>
          <Text style={styles.duration}>{item.duration} min</Text>
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
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
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
  serviceCard: {
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
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15
  },
  serviceInfo: {
    flex: 1
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10
  },
  serviceDetails: {
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
