/** @format */

import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  appointments: number;
  favorites: number;
  rating: number;
}

interface Favorite {
  id: string;
  name: string;
  price: string;
  duration: string;
}

interface Review {
  id: string;
  service: string;
  date: string;
  rating: number;
  comment: string;
}

interface Card {
  id: string;
  type: string;
  number: string;
  expiry: string;
  isDefault: boolean;
}

interface Notification {
  id: string;
  type: "appointment" | "promotion" | "reminder";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

interface UserContextType {
  user: User | null;
  favorites: Favorite[];
  reviews: Review[];
  cards: Card[];
  notifications: Notification[];
  updateUser: (userData: Partial<User>) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
  addReview: (review: Review) => void;
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Doe John",
    email: "john.doe@example.com",
    phone: "+33 6 12 34 56 78",
    profileImage: "https://example.com/john-doe.jpg",
    appointments: 12,
    favorites: 5,
    rating: 4.8
  });

  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: "1",
      name: "Coupe de cheveux",
      price: "3000 FCFA",
      duration: "30 min"
    },
    {
      id: "2",
      name: "Coloration",
      price: "6000 FCFA",
      duration: "1h30"
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      service: "Coupe de cheveux",
      date: "15/03/2024",
      rating: 5,
      comment: "Excellent service, très professionnel !"
    },
    {
      id: "2",
      service: "Coloration",
      date: "01/03/2024",
      rating: 4,
      comment: "Bon résultat, mais un peu long à réaliser."
    }
  ]);

  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "Visa",
      number: "**** **** **** 1234",
      expiry: "12/25",
      isDefault: true
    },
    {
      id: "2",
      type: "Mastercard",
      number: "**** **** **** 5678",
      expiry: "09/24",
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "Rendez-vous confirmé",
      message:
        "Votre rendez-vous pour une coupe de cheveux est confirmé pour demain à 14h.",
      date: "Il y a 2 heures",
      isRead: false
    },
    {
      id: "2",
      type: "promotion",
      title: "Offre spéciale",
      message:
        "Profitez de -20% sur tous les services de coloration ce mois-ci !",
      date: "Il y a 1 jour",
      isRead: true
    }
  ]);

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  const addFavorite = (favorite: Favorite) => {
    setFavorites((prev) => [...prev, favorite]);
    setUser((prev) =>
      prev ? { ...prev, favorites: prev.favorites + 1 } : null
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    setUser((prev) =>
      prev ? { ...prev, favorites: prev.favorites - 1 } : null
    );
  };

  const addReview = (review: Review) => {
    setReviews((prev) => [...prev, review]);
  };

  const addCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setReviews([]);
    setCards([]);
    setNotifications([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        favorites,
        reviews,
        cards,
        notifications,
        updateUser,
        addFavorite,
        removeFavorite,
        addReview,
        addCard,
        removeCard,
        addNotification,
        markNotificationAsRead,
        logout
      }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
export default { UserProvider, useUser };
