/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: "support",
      timestamp: new Date()
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simuler une réponse du support
      setTimeout(() => {
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Je suis en train de traiter votre demande. Un instant s'il vous plaît...",
          sender: "support",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, supportMessage]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Support en direct</Text>
          <Text style={styles.subtitle}>En ligne</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === "user" ? styles.userMessage : styles.supportMessage
            ]}>
            <View
              style={[
                styles.messageBubble,
                msg.sender === "user" ? styles.userBubble : styles.supportBubble
              ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.messageTime}>
                {formatTime(msg.timestamp)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Écrivez votre message..."
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled
          ]}
          onPress={sendMessage}
          disabled={!message.trim()}>
          <Ionicons
            name="send"
            size={24}
            color={message.trim() ? "#fff" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40 // Pour éviter que le contenu soit caché sous la barre de statut
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  backButton: {
    marginRight: 15
  },
  headerInfo: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  subtitle: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 2
  },
  messagesContainer: {
    flex: 1,
    padding: 15
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: "80%"
  },
  userMessage: {
    alignSelf: "flex-end"
  },
  supportMessage: {
    alignSelf: "flex-start"
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20
  },
  userBubble: {
    backgroundColor: "#007AFF"
  },
  supportBubble: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee"
  },
  messageText: {
    fontSize: 16,
    color: "#fff"
  },
  messageTime: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
    alignSelf: "flex-end"
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center"
  },
  sendButtonDisabled: {
    backgroundColor: "#f5f5f5"
  }
});
