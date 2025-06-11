/** @format */

import { Header } from "@/components/header";
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
import { useAppointments } from "../context/AppointmentsContext";
import { fonts } from "../theme/fonts";

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

export default function CalendarScreen() {
  const router = useRouter();
  const { appointments, cancelAppointment } = useAppointments();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

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
          <TouchableOpacity
            style={[styles.actionButton, styles.paymentButton]}
            onPress={() => {
              // Ici, vous pouvez ajouter la logique de paiement MTN MoMo
              alert("Paiement MTN MoMo en cours...");
            }}>
            <Ionicons name="wallet" size={20} color="#FF6347" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => handleCancelAppointment(appointment)}>
          <Ionicons name="close-circle" size={20} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "pending" || appointment.status === "confirmed"
  );

  return (
    <View style={styles.container}>
      {/* <Header /> */}

      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Vos Rendez-vous à venir
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleBookNewAppointment}>
          <Ionicons name="add-circle" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <View style={styles.appointmentsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: fonts.medium }]}>
            Rendez-vous
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
                Aucun rendez-vous à venir
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
                  Oui
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  title: {
    fontSize: 24,
    color: "#333"
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#E0F7FA"
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  appointmentsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333"
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  appointmentTimeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEDE0",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 5
  },
  appointmentTime: {
    fontSize: 14,
    color: "#FF6347",
    marginLeft: 5
  },
  statusBadge: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  statusText: {
    fontSize: 12
  },
  appointmentDetails: {
    flex: 1,
    marginRight: 10
  },
  serviceName: {
    fontSize: 16,
    marginBottom: 5
  },
  stylistContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  specialistName: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  appointmentPrice: {
    fontSize: 16,
    color: "#333"
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 3
  },
  appointmentActions: {
    flexDirection: "column",
    alignItems: "center"
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    marginBottom: 5
  },
  paymentButton: {
    backgroundColor: "#FFEDE0"
  },
  cancelButton: {
    backgroundColor: "#FFEDED"
  },
  noAppointments: {
    alignItems: "center",
    marginTop: 50
  },
  noAppointmentsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20
  },
  bookButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: "#333"
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  confirmButton: {
    backgroundColor: "#FF6347"
  },
  confirmButtonText: {
    color: "#fff"
  },
  modalButtonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center"
  }
});
