/** @format */

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAppointments } from "../context/AppointmentsContext";
import { fonts, fontSizes } from "../theme/fonts";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];

export default function CalendarScreen() {
  const router = useRouter();
  const { appointments } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure");
      return;
    }
    router.push({
      pathname: "/select-product",
      params: {
        date: selectedDate,
        time: selectedTime
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Calendrier
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: fonts.medium }]}>
            Sélectionner une date
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}>
            {Array.from({ length: 14 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const dateStr = date.toISOString().split("T")[0];
              const isSelected = selectedDate === dateStr;

              return (
                <TouchableOpacity
                  key={dateStr}
                  style={[
                    styles.dateButton,
                    isSelected && styles.dateButtonSelected
                  ]}
                  onPress={() => handleDateSelect(dateStr)}>
                  <Text
                    style={[
                      styles.dateText,
                      { fontFamily: fonts.medium },
                      isSelected && styles.dateTextSelected
                    ]}>
                    {date.toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric"
                    })}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {selectedDate && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: fonts.medium }]}>
              Sélectionner une heure
            </Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                const isBooked = appointments.some(
                  (app) =>
                    app.date === selectedDate &&
                    app.time === time &&
                    app.status !== "cancelled"
                );

                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      isSelected && styles.timeButtonSelected,
                      isBooked && styles.timeButtonBooked
                    ]}
                    onPress={() => !isBooked && handleTimeSelect(time)}
                    disabled={isBooked}>
                    <Text
                      style={[
                        styles.timeText,
                        { fontFamily: fonts.medium },
                        isSelected && styles.timeTextSelected,
                        isBooked && styles.timeTextBooked
                      ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {selectedDate && selectedTime && (
          <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
            <Text style={[styles.bookButtonText, { fontFamily: fonts.medium }]}>
              Réserver
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  title: {
    fontSize: fontSizes["2xl"],
    color: "#333"
  },
  content: {
    flex: 1
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    color: "#333",
    marginBottom: 15
  },
  datesContainer: {
    flexDirection: "row"
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10
  },
  dateButtonSelected: {
    backgroundColor: "#007AFF"
  },
  dateText: {
    fontSize: fontSizes.base,
    color: "#666"
  },
  dateTextSelected: {
    color: "#fff"
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5
  },
  timeButton: {
    width: "30%",
    margin: "1.66%",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center"
  },
  timeButtonSelected: {
    backgroundColor: "#007AFF"
  },
  timeButtonBooked: {
    backgroundColor: "#e0e0e0"
  },
  timeText: {
    fontSize: fontSizes.base,
    color: "#666"
  },
  timeTextSelected: {
    color: "#fff"
  },
  timeTextBooked: {
    color: "#999"
  },
  bookButton: {
    backgroundColor: "#007AFF",
    margin: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: "center"
  },
  bookButtonText: {
    color: "#fff",
    fontSize: fontSizes.base
  }
});
