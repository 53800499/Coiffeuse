/** @format */

import React, { createContext, useContext, useState } from "react";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: string;
  duration: string;
  stylist: {
    id: string;
    name: string;
    image?: string;
  };
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

export function AppointmentsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      service: "Coupe de cheveux",
      date: "2024-03-20",
      time: "14:00",
      status: "confirmed",
      price: "30€",
      duration: "30 min",
      stylist: {
        id: "1",
        name: "Marie Dupont",
        image: "https://example.com/marie.jpg"
      }
    },
    {
      id: "2",
      service: "Coloration",
      date: "2024-03-25",
      time: "10:30",
      status: "pending",
      price: "60€",
      duration: "1h30",
      stylist: {
        id: "2",
        name: "Sophie Martin",
        image: "https://example.com/sophie.jpg"
      }
    }
  ]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const updateAppointment = (id: string, data: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, ...data } : appointment
      )
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        cancelAppointment
      }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error(
      "useAppointments must be used within an AppointmentsProvider"
    );
  }
  return context;
}

const AppointmentsContextModule = {
  AppointmentsProvider,
  useAppointments
};

export default AppointmentsContextModule;
