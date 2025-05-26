import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Service} from './appointmentService';

class ServiceService {
  private static instance: ServiceService;
  private services: Service[] = [];

  private constructor() {}

  static getInstance(): ServiceService {
    if (!ServiceService.instance) {
      ServiceService.instance = new ServiceService();
    }
    return ServiceService.instance;
  }

  async getServices(): Promise<Service[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/services', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      this.services = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockServices();
    }
  }

  async getServiceById(id: number): Promise<Service | null> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`http://your-api-url/services/${id}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }

      return await response.json();
    } catch (error) {
      // For development, return mock data
      return this.getMockServices().find(service => service.id === id) || null;
    }
  }

  private getMockServices(): Service[] {
    return [
      {
        id: 1,
        nom: 'Coupe de cheveux',
        prix: 30,
        description: 'Coupe de cheveux classique',
        duree: 30,
      },
      {
        id: 2,
        nom: 'Coloration',
        prix: 60,
        description: 'Coloration complète',
        duree: 120,
      },
      {
        id: 3,
        nom: 'Mèches',
        prix: 80,
        description: 'Pose de mèches',
        duree: 90,
      },
      {
        id: 4,
        nom: 'Brushing',
        prix: 25,
        description: 'Brushing professionnel',
        duree: 45,
      },
      {
        id: 5,
        nom: 'Shampoing',
        prix: 15,
        description: 'Shampoing et soin',
        duree: 20,
      },
      {
        id: 6,
        nom: 'Manucure',
        prix: 35,
        description: 'Soin des mains et pose de vernis',
        duree: 60,
      },
    ];
  }
}

export const serviceService = ServiceService.getInstance();
