/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
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
    isMe: true,
    avatar: "🧑"
  },
  {
    id: "3",
    sender: "Salon de beauté",
    content: "Avec plaisir ! N'hésitez pas si vous avez des questions.",
    time: "10:32",
    isMe: false,
    avatar: "💇‍♀️"
  }
];

export default function ConversationScreen() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();

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
      isMe: true,
      avatar: "🧑"
    };

    setMessages([message, ...messages]);
    setNewMessage("");
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
      {!item.isMe && item.avatar && (
        <View style={styles.avatarCircle}>
          <Text style={styles.avatar}>{item.avatar}</Text>
        </View>
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
      {item.isMe && (
        <View style={styles.avatarCircle}>
          <Text style={styles.avatar}>🧑</Text>
        </View>
      )}
    </View>
  );

  // Header personnalisé
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#FF6347" />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <View style={styles.headerAvatar}>
          <Text style={{ fontSize: 22 }}>💇‍♀️</Text>
        </View>
        <Text style={styles.headerTitle}>Client #{id}</Text>
      </View>
      <View style={{ width: 32 }} /> {/* Pour équilibrer le backButton */}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
        {renderHeader()}

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          inverted = {false} // Affiche les messages du plus récent en bas
          showsVerticalScrollIndicator={false}
        />
 
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { opacity: newMessage.trim() ? 1 : 0.5 }
            ]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}>
            <Ionicons
              name="send"
              size={24}
              color={newMessage.trim() ? "#FF6347" : "#888"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    elevation: 2
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
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
    justifyContent: "flex-end",
    alignSelf: "flex-end"
  },
  theirMessageContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2
  },
  avatar: {
    fontSize: 20
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 14,
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  myMessageBubble: {
    backgroundColor: "#FF6347",
    borderBottomRightRadius: 5
  },
  theirMessageBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#eee"
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
