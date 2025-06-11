/** @format */

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { authService } from "../services/authService";
import { useAppointments } from "./context/AppointmentsContext";

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addAppointment } = useAppointments();

  const { serviceId, serviceTitle, servicePrice, serviceDuration } = params;

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showMode = (currentMode: "date" | "time") => {
    if (currentMode === "date") {
      setShowDatePicker(true);
    } else {
      setShowTimePicker(true);
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleBookAppointment = async () => {
    if (!serviceId || !serviceTitle || !servicePrice || !serviceDuration) {
      Alert.alert("Erreur", "Informations de service manquantes.");
      return;
    }

    const currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      Alert.alert(
        "Erreur",
        "Vous devez être connecté pour prendre un rendez-vous."
      );
      router.replace("/auth");
      return;
    }

    // Simuler un styliste pour le rendez-vous (à remplacer par une vraie sélection/logique)
    const dummyStylist = {
      id: "stylist-1",
      name: "Coiffeuse Experte"
    };

    const newAppointment = {
      id: Math.random().toString(), // Générer un ID unique temporaire
      date: date.toISOString().split("T")[0],
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      service: serviceTitle as string,
      status: "pending" as "pending",
      price: servicePrice as string,
      duration: serviceDuration as string,
      stylist: dummyStylist
    };

    addAppointment(newAppointment);
    Alert.alert("Succès", "Rendez-vous pris avec succès!");
    router.replace("/calendar"); // Rediriger vers la page du calendrier
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Prendre rendez-vous</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Service sélectionné</Text>
        <View style={styles.serviceDetailsCard}>
          <Text style={styles.serviceTitle}>{serviceTitle}</Text>
          <Text style={styles.serviceInfo}>Prix: {servicePrice} €</Text>
          <Text style={styles.serviceInfo}>Durée: {serviceDuration} min</Text>
        </View>

        <Text style={styles.sectionTitle}>Date et heure</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.inputButton}>
          <Text style={styles.inputButtonText}>
            Date: {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity onPress={showTimepicker} style={styles.inputButton}>
          <Text style={styles.inputButtonText}>
            Heure:{" "}
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Confirmer le rendez-vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  content: {
    flex: 1,
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 20
  },
  serviceDetailsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 5
  },
  serviceInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 3
  },
  inputButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee"
  },
  inputButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500"
  },
  bookButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
