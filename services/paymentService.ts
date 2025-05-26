import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PaymentMethod {
  id: number;
  type: 'card';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface Payment {
  id: number;
  montant: number;
  mode: 'card' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  appointmentId: number;
}

export interface PaymentData {
  appointmentId: number;
  montant: number;
  mode: 'card' | 'cash';
  cardId?: number;
}

class PaymentService {
  private static instance: PaymentService;
  private paymentMethods: PaymentMethod[] = [];
  private payments: Payment[] = [];

  private constructor() {}

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/payment-methods', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      const data = await response.json();
      this.paymentMethods = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockPaymentMethods();
    }
  }

  async addPaymentMethod(
    cardNumber: string,
    expiryDate: string,
    cvv: string,
  ): Promise<PaymentMethod> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      const paymentMethod = await response.json();
      this.paymentMethods.push(paymentMethod);
      return paymentMethod;
    } catch (error) {
      throw new Error('Failed to add payment method');
    }
  }

  async deletePaymentMethod(id: number): Promise<void> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/payment-methods/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }

      this.paymentMethods = this.paymentMethods.filter(
        method => method.id !== id,
      );
    } catch (error) {
      throw new Error('Failed to delete payment method');
    }
  }

  async setDefaultPaymentMethod(id: number): Promise<void> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/payment-methods/${id}/default`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to set default payment method');
      }

      this.paymentMethods = this.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }));
    } catch (error) {
      throw new Error('Failed to set default payment method');
    }
  }

  async processPayment(paymentData: PaymentData): Promise<Payment> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      const payment = await response.json();
      this.payments.push(payment);
      return payment;
    } catch (error) {
      throw new Error('Failed to process payment');
    }
  }

  private getMockPaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 1,
        type: 'card',
        last4: '4242',
        expiry: '12/24',
        isDefault: true,
      },
      {
        id: 2,
        type: 'card',
        last4: '5678',
        expiry: '09/25',
        isDefault: false,
      },
    ];
  }
}

export const paymentService = PaymentService.getInstance();
