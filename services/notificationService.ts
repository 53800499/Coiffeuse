import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export interface Notification {
  id: number;
  titre: string;
  message: string;
  date: string;
  lu: boolean;
  type: 'appointment' | 'payment' | 'review' | 'system';
  data?: {
    appointmentId?: number;
    paymentId?: number;
    reviewId?: number;
  };
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];

  private constructor() {
    this.setupMessaging();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async setupMessaging() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        await this.updateFCMToken(token);

        messaging().onTokenRefresh(async token => {
          await this.updateFCMToken(token);
        });

        messaging().onMessage(async remoteMessage => {
          // Handle foreground messages
          this.handleNotification(remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
          // Handle background messages
          this.handleNotification(remoteMessage);
        });
      }
    } catch (error) {
      console.error('Failed to setup messaging:', error);
    }
  }

  private async updateFCMToken(token: string) {
    try {
      // TODO: Replace with actual API call
      await fetch('http://your-api-url/notifications/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify({token}),
      });
    } catch (error) {
      console.error('Failed to update FCM token:', error);
    }
  }

  private handleNotification(remoteMessage: any) {
    const notification: Notification = {
      id: Date.now(),
      titre: remoteMessage.notification?.title || 'Nouvelle notification',
      message: remoteMessage.notification?.body || '',
      date: new Date().toISOString(),
      lu: false,
      type: remoteMessage.data?.type || 'system',
      data: remoteMessage.data,
    };

    this.notifications.unshift(notification);
    // TODO: Save notification to local storage
  }

  async getNotifications(): Promise<Notification[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/notifications', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      this.notifications = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockNotifications();
    }
  }

  async markAsRead(notificationId: number): Promise<void> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/notifications/${notificationId}/read`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      this.notifications = this.notifications.map(notification =>
        notification.id === notificationId
          ? {...notification, lu: true}
          : notification,
      );
    } catch (error) {
      throw new Error('Failed to mark notification as read');
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        'http://your-api-url/notifications/read-all',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }

      this.notifications = this.notifications.map(notification => ({
        ...notification,
        lu: true,
      }));
    } catch (error) {
      throw new Error('Failed to mark all notifications as read');
    }
  }

  private getMockNotifications(): Notification[] {
    return [
      {
        id: 1,
        titre: 'Rendez-vous confirmé',
        message: 'Votre rendez-vous du 20 mars à 14h30 a été confirmé.',
        date: '2024-03-15T10:00:00Z',
        lu: false,
        type: 'appointment',
        data: {
          appointmentId: 1,
        },
      },
      {
        id: 2,
        titre: 'Paiement reçu',
        message: 'Votre paiement de 30€ a été reçu avec succès.',
        date: '2024-03-15T09:30:00Z',
        lu: true,
        type: 'payment',
        data: {
          paymentId: 1,
        },
      },
      {
        id: 3,
        titre: 'Nouvel avis',
        message: 'Vous avez reçu un nouvel avis 5 étoiles !',
        date: '2024-03-14T16:45:00Z',
        lu: false,
        type: 'review',
        data: {
          reviewId: 1,
        },
      },
    ];
  }
}

export const notificationService = NotificationService.getInstance();
