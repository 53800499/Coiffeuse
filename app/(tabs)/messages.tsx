/** @format */

import { Header } from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
  avatar?: string;
}

const dummyMessages: Message[] = [
  {
    id: "1",
    sender: "Salon de beauté",
    content: "Bonjour ! Votre rendez-vous est confirmé pour demain à 14h30.",
    time: "10:30",
    isMe: false,
    avatar: "💇‍♀️"
  },
  {
    id: "2",
    sender: "Moi",
    content: "Merci pour la confirmation !",
    time: "10:31",
    isMe: true
  },
  {
    id: "3",
    sender: "Salon de beauté",
    content: "Avec plaisir ! N'hésitez pas si vous avez des questions.",
    time: "10:32",
    isMe: false,
    avatar: "💇‍♀️"
  },
  {
    id: "4",
    sender: "Coiffeur Pro",
    content: "Merci pour votre visite aujourd'hui !",
    time: "Hier",
    isMe: false,
    avatar: "✂️"
  }
];

export default function MessagesScreen() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "Moi",
      content: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
      {!item.isMe && item.avatar && (
        <Text style={styles.avatar}>{item.avatar}</Text>
      )}
      <View
        style={[
          styles.messageBubble,
          item.isMe ? styles.myMessageBubble : styles.theirMessageBubble
        ]}>
        {!item.isMe && <Text style={styles.senderName}>{item.sender}</Text>}
        <Text
          style={[
            styles.messageText,
            item.isMe ? styles.myMessageText : styles.theirMessageText
          ]}>
          {item.content}
        </Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
      {/* Header */}
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons
            name="send"
            size={24}
            color={newMessage.trim() ? "#FF6347" : "#888"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  searchButton: {
    padding: 5
  },
  messagesList: {
    padding: 15,
    paddingBottom: 20
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end"
  },
  myMessageContainer: {
    justifyContent: "flex-end"
  },
  theirMessageContainer: {
    justifyContent: "flex-start"
  },
  avatar: {
    fontSize: 24,
    marginRight: 8
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 5
  },
  myMessageBubble: {
    backgroundColor: "#FF6347",
    borderBottomRightRadius: 5
  },
  theirMessageBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 5
  },
  senderName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20
  },
  myMessageText: {
    color: "white"
  },
  theirMessageText: {
    color: "#333"
  },
  messageTime: {
    fontSize: 10,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 4
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center"
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16
  },
  sendButton: {
    padding: 8
  }
});
