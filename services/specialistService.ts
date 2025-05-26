import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Specialist} from './appointmentService';

class SpecialistService {
  private static instance: SpecialistService;
  private specialists: Specialist[] = [];

  private constructor() {}

  static getInstance(): SpecialistService {
    if (!SpecialistService.instance) {
      SpecialistService.instance = new SpecialistService();
    }
    return SpecialistService.instance;
  }

  async getSpecialists(): Promise<Specialist[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/specialists', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch specialists');
      }

      const data = await response.json();
      this.specialists = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockSpecialists();
    }
  }

  async getSpecialistById(id: number): Promise<Specialist | null> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`http://your-api-url/specialists/${id}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch specialist');
      }

      return await response.json();
    } catch (error) {
      // For development, return mock data
      return (
        this.getMockSpecialists().find(specialist => specialist.id === id) ||
        null
      );
    }
  }

  async getSpecialistAvailability(
    specialistId: number,
    date: string,
  ): Promise<string[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/specialists/${specialistId}/availability?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch specialist availability');
      }

      return await response.json();
    } catch (error) {
      // For development, return mock data
      return this.getMockAvailability();
    }
  }

  private getMockSpecialists(): Specialist[] {
    return [
      {
        id: 1,
        nom: 'Doe',
        prenom: 'Jane',
        email: 'jane.doe@example.com',
        tel: '0123456789',
        photo: 'https://example.com/jane.jpg',
      },
      {
        id: 2,
        nom: 'Smith',
        prenom: 'Sarah',
        email: 'sarah.smith@example.com',
        tel: '0987654321',
        photo: 'https://example.com/sarah.jpg',
      },
      {
        id: 3,
        nom: 'Johnson',
        prenom: 'Emma',
        email: 'emma.johnson@example.com',
        tel: '0123456789',
        photo: 'https://example.com/emma.jpg',
      },
    ];
  }

  private getMockAvailability(): string[] {
    return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  }
}

export const specialistService = SpecialistService.getInstance();
