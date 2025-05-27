/** @format */

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAppointments } from "../context/AppointmentsContext";

// Simuler la récupération des données du produit depuis une API
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Shampoing Hydratant",
      description: "Shampoing nourrissant pour cheveux secs et abîmés",
      rating: 4.5,
      image: require("../../assets/placeholder-product.png"),
      price: "24.99 €",
      categoryId: "2",
      duration: "45 min",
      details:
        "Un shampoing profondément hydratant qui nourrit et répare les cheveux secs et abîmés. Formulé avec des ingrédients naturels pour une meilleure santé capillaire."
    },
    {
      id: "2",
      name: "Masque Capillaire",
      description: "Masque réparateur intensif pour cheveux colorés",
      rating: 4.8,
      image: require("../../assets/placeholder-product.png"),
      price: "29.99 €",
      categoryId: "2",
      duration: "30 min",
      details:
        "Masque intensif qui protège et répare les cheveux colorés. Enrichi en protéines et vitamines pour maintenir la couleur et la brillance."
    },
    {
      id: "3",
      name: "Sérum Brillance",
      description: "Sérum lissant pour cheveux brillants et soyeux",
      rating: 4.2,
      image: require("../../assets/placeholder-product.png"),
      price: "19.99 €",
      categoryId: "2",
      duration: "20 min",
      details:
        "Sérum léger qui apporte brillance et douceur aux cheveux. Idéal pour les cheveux ternes et sans vie."
    },
    {
      id: "4",
      name: "Shampoing Hydratant",
      description: "Shampoing nourrissant pour cheveux secs et abîmés",
      rating: 4.5,
      image: require("../../assets/placeholder-product.png"),
      price: "24.99 €",
      categoryId: "2",
      duration: "45 min",
      details:
        "Un shampoing profondément hydratant qui nourrit et répare les cheveux secs et abîmés. Formulé avec des ingrédients naturels pour une meilleure santé capillaire."
    },
    {
      id: "5",
      name: "Masque Capillaire",
      description: "Masque réparateur intensif pour cheveux colorés",
      rating: 4.8,
      image: require("../../assets/placeholder-product.png"),
      price: "29.99 €",
      categoryId: "2",
      duration: "30 min",
      details:
        "Masque intensif qui protège et répare les cheveux colorés. Enrichi en protéines et vitamines pour maintenir la couleur et la brillance."
    },
    {
      id: "6",
      name: "Sérum Brillance",
      description: "Sérum lissant pour cheveux brillants et soyeux",
      rating: 4.2,
      image: require("../../assets/placeholder-product.png"),
      price: "19.99 €",
      categoryId: "2",
      duration: "20 min",
      details:
        "Sérum léger qui apporte brillance et douceur aux cheveux. Idéal pour les cheveux ternes et sans vie."
    }
  ];
  return products.find((p) => p.id === id);
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addAppointment } = useAppointments();
  const product = getProductById(id as string);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produit non trouvé</Text>
      </View>
    );
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i < Math.floor(product.rating) ? "star" : "star-outline"}
        size={20}
        color="#FF6347"
      />
    );
  }

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBooking = () => {
    // Créer un nouveau rendez-vous
    const newAppointment = {
      id: Date.now().toString(), // Générer un ID unique
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      service: product.name,
      status: "pending" as const,
      price: product.price,
      duration: product.duration,
      stylist: {
        id: "1",
        name: "Marie Dupont",
        image: "https://example.com/marie.jpg"
      }
    };

    // Ajouter le rendez-vous via le contexte
    addAppointment(newAppointment);

    // Rediriger vers la page des rendez-vous
    router.push("/(tabs)/calendar");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Image source={product.image} style={styles.productImage} />

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.ratingContainer}>{stars}</View>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.duration}>Durée: {product.duration}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.details}</Text>

        <Text style={styles.sectionTitle}>Prendre rendez-vous</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <View style={styles.timeContainer}>
          {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
            (time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.selectedTimeButton
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeButtonText,
                    selectedTime === time && styles.selectedTimeButtonText
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.bookButton,
            !selectedTime && styles.bookButtonDisabled
          ]}
          disabled={!selectedTime}
          onPress={handleBooking}>
          <Text
            style={[
              styles.bookButtonText,
              !selectedTime && styles.bookButtonTextDisabled
            ]}>
            Prendre rendez-vous
          </Text>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover"
  },
  content: {
    padding: 20
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 10
  },
  duration: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24
  },
  dateButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center"
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20
  },
  timeButton: {
    width: "30%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center"
  },
  selectedTimeButton: {
    backgroundColor: "#FF6347"
  },
  timeButtonText: {
    fontSize: 14,
    color: "#333"
  },
  selectedTimeButtonText: {
    color: "#fff"
  },
  bookButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  bookButtonDisabled: {
    backgroundColor: "#ccc"
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  bookButtonTextDisabled: {
    color: "#999"
  }
});
