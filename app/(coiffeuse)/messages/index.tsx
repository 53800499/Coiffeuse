/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const initialConversations = [
  {
    id: "1",
    name: "Awa Coiffeuse",
    avatar: "💇‍♀️",
    lastMessage: "Votre rendez-vous est confirmé !",
    time: "09:30",
    unread: true
  },
  {
    id: "2",
    name: "Fatou Salon",
    avatar: "✂️",
    lastMessage: "Merci pour votre visite 😊",
    time: "Hier",
    unread: false
  }
  // Ajoute d'autres clients ici
];

export default function MessagesListScreen() {
  const router = useRouter();
  const [conversations, setConversations] = useState(initialConversations);

  const handlePress = (id: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, unread: false } : conv
      )
    );
    router.push(`/(coiffeuse)/messages/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages clients</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.id)}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatar}>{item.avatar}</Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, item.unread && styles.unreadText]}>
                {item.name}
              </Text>
              <Text
                style={[styles.lastMessage, item.unread && styles.unreadText]}
                numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#bbb"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60 },
  header: { fontSize: 24, fontWeight: "bold", margin: 20, color: "#333" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginHorizontal: 16
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    elevation: 2
  },
  avatar: { fontSize: 22 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#222" },
  lastMessage: { color: "#666", marginTop: 2 },
  time: { color: "#aaa", fontSize: 12, marginLeft: 8 },
  separator: { height: 12 },
  unreadDot: {
    position: "absolute",
    top: 1,
    right: 1,
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: "#FF6347"
  },
  unreadText: {
    fontWeight: "bold",
    color: "#222"
  }
});
