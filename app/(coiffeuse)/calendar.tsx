/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import { fonts, fontSizes } from "../theme/fonts";

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: string;
  duration: string;
  stylist: {
    id: string;
    name: string;
    image?: string;
  };
}

// Données de rendez-vous fictives pour la démonstration
const demoAppointments: Appointment[] = [
  {
    id: "1",
    date: "2025-06-11",
    time: "10:00",
    service: "Coupe de cheveux",
    status: "pending",
    price: "20€",
    duration: "30min",
    stylist: {
      id: "a",
      name: "Jean Dupont",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  },
  {
    id: "2",
    date: "2025-11-06",
    time: "11:00",
    service: "Coloration",
    status: "confirmed",
    price: "50€",
    duration: "60min",
    stylist: {
      id: "b",
      name: "Marie Curie",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  },
  {
    id: "3",
    date: "2025-06-12",
    time: "09:00",
    service: "Brushing",
    status: "completed",
    price: "30€",
    duration: "45min",
    stylist: {
      id: "a",
      name: "Jean Dupont",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  }
];

export default function CalendarScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(demoAppointments);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const markedDates = appointments.reduce((acc, appointment) => {
    if (
      appointment.status === "pending" ||
      appointment.status === "confirmed"
    ) {
      acc[appointment.date] = {
        marked: true,
        dotColor: "#FF6347"
      };
    }
    return acc;
  }, {} as { [key: string]: { marked: boolean; dotColor: string } });

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancelAppointment = () => {
    if (selectedAppointment) {
      cancelAppointment(selectedAppointment.id);
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleBookNewAppointment = () => {
    router.push("/select-service");
  };

  const handleAccept = (appointmentId: string) => {
    // Assimulation : change le status à "confirmed"
    updateStatus(appointmentId, "confirmed");
  };

  const handleReject = (appointmentId: string) => {
    // Assimulation : change le status à "cancelled"
    updateStatus(appointmentId, "cancelled");
  };

  const handlePostpone = (appointmentId: string) => {
    // Assimulation : change le status à "pending" (ou affiche une alerte)
    updateStatus(appointmentId, "pending");
    alert("Le rendez-vous a été reporté !");
  };

  const updateStatus = (
    appointmentId: string,
    newStatus: Appointment["status"]
  ) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: newStatus } : app
      )
    );
  };

  // Pour annuler :
  const cancelAppointment = (appointmentId: string) => {
    updateStatus(appointmentId, "cancelled");
  };

  const renderAppointment = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentTimeContainer}>
        <View style={styles.timeBadge}>
          <Ionicons name="time" size={16} color="#FF6347" />
          <Text style={[styles.appointmentTime, { fontFamily: fonts.medium }]}>
            {appointment.time}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                appointment.status === "pending" ? "#FFF3E0" : "#E8F5E9"
            }
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color: appointment.status === "pending" ? "#FF9800" : "#4CAF50",
                fontFamily: fonts.medium
              }
            ]}>
            {appointment.status === "pending" ? "En attente" : "Confirmé"}
          </Text>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={[styles.serviceName, { fontFamily: fonts.semiBold }]}>
          {appointment.service}
        </Text>
        <View style={styles.stylistContainer}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={[styles.specialistName, { fontFamily: fonts.regular }]}>
            {appointment.stylist.name}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={[styles.appointmentPrice, { fontFamily: fonts.semiBold }]}>
            {appointment.price}
          </Text>
          <View style={styles.durationBadge}>
            <Ionicons name="hourglass-outline" size={14} color="#666" />
            <Text style={[styles.durationText, { fontFamily: fonts.regular }]}>
              {appointment.duration}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.appointmentActions}>
        {appointment.status === "pending" && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#E8F5E9" }]}
              onPress={() => handleAccept(appointment.id)}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#FFEBEE" }]}
              onPress={() => handleReject(appointment.id)}>
              <Ionicons name="close-circle" size={20} color="#FF3B30" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#FFFDE7" }]}
              onPress={() => handlePostpone(appointment.id)}>
              <Ionicons name="time" size={20} color="#FF9800" />
            </TouchableOpacity>
          </>
        )}
        {appointment.status === "confirmed" && (
          <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Accepté</Text>
        )}
        {appointment.status === "cancelled" && (
          <Text style={{ color: "#FF3B30", fontWeight: "bold" }}>Rejeté</Text>
        )}
      </View>
    </View>
  );

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date === selectedDate &&
      (appointment.status === "pending" || appointment.status === "confirmed")
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Rendez-vous
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleBookNewAppointment}>
          <Ionicons name="add-circle" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              marked: markedDates[selectedDate]?.marked,
              dotColor: "#FF6347"
            }
          }}
          theme={{
            todayTextColor: "#FF6347",
            selectedDayBackgroundColor: "#FF6347",
            selectedDayTextColor: "#fff",
            dotColor: "#FF6347"
          }}
        />
      </View>

      <View style={styles.appointmentsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: fonts.medium }]}>
            Rendez-vous du {new Date(selectedDate).toLocaleDateString("fr-FR")}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(renderAppointment)
          ) : (
            <View style={styles.noAppointments}>
              <Text
                style={[
                  styles.noAppointmentsText,
                  { fontFamily: fonts.regular }
                ]}>
                Aucun rendez-vous pour cette date
              </Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookNewAppointment}>
                <Text
                  style={[styles.bookButtonText, { fontFamily: fonts.medium }]}>
                  Prendre rendez-vous
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { fontFamily: fonts.semiBold }]}>
              Annuler le rendez-vous ?
            </Text>
            <Text style={[styles.modalText, { fontFamily: fonts.regular }]}>
              Êtes-vous sûr de vouloir annuler ce rendez-vous ?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCancelModal(false)}>
                <Text
                  style={[
                    styles.modalButtonText,
                    { fontFamily: fonts.medium }
                  ]}>
                  Non
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmCancelAppointment}>
                <Text
                  style={[
                    styles.modalButtonText,
                    styles.confirmButtonText,
                    { fontFamily: fonts.medium }
                  ]}>
                  Oui, annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleBookNewAppointment}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  title: {
    fontSize: fontSizes["2xl"],
    color: "#333"
  },
  addButton: {
    padding: 5
  },
  calendarContainer: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10
  },
  appointmentsContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    color: "#333"
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  appointmentTimeContainer: {
    marginRight: 15,
    alignItems: "center"
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8
  },
  appointmentTime: {
    fontSize: fontSizes.sm,
    color: "#FF6347",
    marginLeft: 4
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: fontSizes.xs,
    textTransform: "uppercase"
  },
  appointmentDetails: {
    flex: 1
  },
  serviceName: {
    fontSize: fontSizes.base,
    color: "#333",
    marginBottom: 6
  },
  stylistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  specialistName: {
    fontSize: fontSizes.sm,
    color: "#666",
    marginLeft: 4
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  appointmentPrice: {
    fontSize: fontSizes.base,
    color: "#FF6347"
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  durationText: {
    fontSize: fontSizes.xs,
    color: "#666",
    marginLeft: 4
  },
  appointmentActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  paymentButton: {
    backgroundColor: "#FFF5F5"
  },
  cancelButton: {
    backgroundColor: "#FFF5F5"
  },
  noAppointments: {
    alignItems: "center",
    padding: 20
  },
  noAppointmentsText: {
    fontSize: fontSizes.base,
    color: "#666",
    marginBottom: 20
  },
  bookButton: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  bookButtonText: {
    color: "#fff",
    fontSize: fontSizes.base
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: fontSizes.xl,
    color: "#333",
    marginBottom: 10
  },
  modalText: {
    fontSize: fontSizes.base,
    color: "#666",
    textAlign: "center",
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5
  },
  confirmButton: {
    backgroundColor: "#FF6347"
  },
  confirmButtonText: {
    color: "#fff"
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FF6347",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtonText: {
    fontSize: fontSizes.base,
    color: "#333",
    textAlign: "center",
    fontFamily: fonts.medium
  }
});
