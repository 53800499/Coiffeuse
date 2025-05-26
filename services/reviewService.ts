import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Review {
  id: number;
  note: number;
  commentaire: string;
  date: string;
  client: {
    id: number;
    nom: string;
    prenom: string;
  };
  specialist: {
    id: number;
    nom: string;
    prenom: string;
  };
  appointmentId: number;
}

export interface ReviewData {
  note: number;
  commentaire: string;
  appointmentId: number;
}

class ReviewService {
  private static instance: ReviewService;
  private reviews: Review[] = [];

  private constructor() {}

  static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async getReviews(): Promise<Review[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/reviews', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      this.reviews = data;
      return data;
    } catch (error) {
      // For development, return mock data
      return this.getMockReviews();
    }
  }

  async getSpecialistReviews(specialistId: number): Promise<Review[]> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `http://your-api-url/specialists/${specialistId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch specialist reviews');
      }

      return await response.json();
    } catch (error) {
      // For development, return mock data
      return this.getMockReviews().filter(
        review => review.specialist.id === specialistId,
      );
    }
  }

  async addReview(reviewData: ReviewData): Promise<Review> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const review = await response.json();
      this.reviews.push(review);
      return review;
    } catch (error) {
      throw new Error('Failed to add review');
    }
  }

  private getMockReviews(): Review[] {
    return [
      {
        id: 1,
        note: 5,
        commentaire: 'Excellent service, très professionnelle !',
        date: '2024-03-15',
        client: {
          id: 1,
          nom: 'Smith',
          prenom: 'John',
        },
        specialist: {
          id: 1,
          nom: 'Doe',
          prenom: 'Jane',
        },
        appointmentId: 1,
      },
      {
        id: 2,
        note: 4,
        commentaire: 'Très bon service, je recommande.',
        date: '2024-03-10',
        client: {
          id: 2,
          nom: 'Johnson',
          prenom: 'Mary',
        },
        specialist: {
          id: 1,
          nom: 'Doe',
          prenom: 'Jane',
        },
        appointmentId: 2,
      },
      {
        id: 3,
        note: 5,
        commentaire: 'Parfait ! Je reviendrai.',
        date: '2024-03-05',
        client: {
          id: 3,
          nom: 'Brown',
          prenom: 'Sarah',
        },
        specialist: {
          id: 2,
          nom: 'Smith',
          prenom: 'Sarah',
        },
        appointmentId: 3,
      },
    ];
  }
}

export const reviewService = ReviewService.getInstance();
