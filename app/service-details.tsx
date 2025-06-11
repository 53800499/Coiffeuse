/** @format */

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Données de test pour la galerie
const galleryImages = [
  require("../assets/images/gallery-1.jpg"),
  require("../assets/images/gallery-2.jpg"),
  require("../assets/images/gallery-3.jpg"),
  require("../assets/images/gallery-4.jpg"),
  require("../assets/images/gallery-5.jpg"),
  require("../assets/images/gallery-6.jpg")
];

export default function ServiceDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleBookAppointment = () => {
    // TODO: Implémenter la logique de réservation
    console.log("Réservation:", {
      service: params.title,
      date: selectedDate,
      time: selectedTime,
      name,
      phone
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
        <Text style={styles.title}>{params.title}</Text>
      </View>

      {/* Galerie */}
      <View style={styles.galleryContainer}>
        <Text style={styles.sectionTitle}>Galerie</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}>
          {galleryImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}>
              <Image source={image} style={styles.galleryImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Formulaire de rendez-vous */}
      <View style={styles.bookingContainer}>
        <Text style={styles.sectionTitle}>Prendre rendez-vous</Text>

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
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}>
            <Text>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Heure</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}>
            <Text>{selectedTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>

      {/* Modal pour l'image sélectionnée */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSelectedImage(null)}>
          {selectedImage && (
            <Image source={selectedImage} style={styles.modalImage} />
          )}
        </TouchableOpacity>
      </Modal>

      {/* DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* TimePicker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
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
  galleryContainer: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16
  },
  gallery: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  galleryImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 16
  },
  bookingContainer: {
    padding: 16
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
  dateTimeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12
  },
  bookButton: {
    backgroundColor: "#FF6347",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain"
  }
});
