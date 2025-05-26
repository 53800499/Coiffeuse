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

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSave = () => {
    updateUser({
      ...user,
      name,
      email,
      phone
    });
    router.back();
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
        <Text style={styles.title}>Modifier le profil</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!name.trim() || !email.trim()}>
          <Text
            style={[
              styles.saveButtonText,
              (!name.trim() || !email.trim()) && styles.saveButtonTextDisabled
            ]}>
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0) || "U"}</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Changer la photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Votre nom"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Votre email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Votre numéro de téléphone"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  backButton: {
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  saveButton: {
    padding: 8
  },
  saveButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600"
  },
  saveButtonTextDisabled: {
    color: "#999"
  },
  content: {
    flex: 1
  },
  avatarContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#fff"
  },
  changePhotoButton: {
    padding: 8
  },
  changePhotoText: {
    fontSize: 16,
    color: "#007AFF"
  },
  form: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333"
  }
});
