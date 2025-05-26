import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Service {
  id: number;
  nom: string;
  prix: number;
  description: string;
  duree: number; // en minutes
}

export interface Specialist {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  photo?: string;
}

export interface Appointment {
  id: number;
  date: string;
  heure: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  service: Service;
  specialist: Specialist;
  client: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tel: string;
  };
  notes?: string;
}

export interface BookingData {
  date: string;
  heure: string;
  serviceId: number;
  specialistId: number;
  notes?: string;
}

class AppointmentService {
  private static instance: AppointmentService;
  private appointments: Appointment[] = [];

  private constructor() {}

  static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  async getAppointments(): Promise<Appointment[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/appointments', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      this.appointments = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockAppointments();
    }
  }

  async createAppointment(bookingData: BookingData): Promise<Appointment> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      const appointment = await response.json();
      this.appointments.push(appointment);
      return appointment;
    } catch (error) {
      throw new Error('Failed to create appointment');
    }
  }

  async cancelAppointment(appointmentId: number): Promise<void> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/appointments/${appointmentId}/cancel`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      this.appointments = this.appointments.map(appointment =>
        appointment.id === appointmentId
          ? {...appointment, status: 'cancelled'}
          : appointment,
      );
    } catch (error) {
      throw new Error('Failed to cancel appointment');
    }
  }

  private getMockAppointments(): Appointment[] {
    return [
      {
        id: 1,
        date: '2024-03-20',
        heure: '14:30',
        status: 'confirmed',
        service: {
          id: 1,
          nom: 'Coupe de cheveux',
          prix: 30,
          description: 'Coupe de cheveux classique',
          duree: 30,
        },
        specialist: {
          id: 1,
          nom: 'Doe',
          prenom: 'Jane',
          email: 'jane.doe@example.com',
          tel: '0123456789',
        },
        client: {
          id: 1,
          nom: 'Smith',
          prenom: 'John',
          email: 'john.smith@example.com',
          tel: '0987654321',
        },
      },
      {
        id: 2,
        date: '2024-03-25',
        heure: '10:00',
        status: 'pending',
        service: {
          id: 2,
          nom: 'Coloration',
          prix: 60,
          description: 'Coloration complète',
          duree: 120,
        },
        specialist: {
          id: 1,
          nom: 'Doe',
          prenom: 'Jane',
          email: 'jane.doe@example.com',
          tel: '0123456789',
        },
        client: {
          id: 1,
          nom: 'Smith',
          prenom: 'John',
          email: 'john.smith@example.com',
          tel: '0987654321',
        },
      },
    ];
  }
}

export const appointmentService = AppointmentService.getInstance();
