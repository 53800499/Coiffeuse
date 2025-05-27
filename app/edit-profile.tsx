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
import { fonts, fontSizes } from "./theme/fonts";

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
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Modifier le profil
        </Text>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!name.trim() || !email.trim()) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!name.trim() || !email.trim()}>
          <Text
            style={[
              styles.saveButtonText,
              { fontFamily: fonts.medium },
              (!name.trim() || !email.trim()) && styles.saveButtonTextDisabled
            ]}>
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarText, { fontFamily: fonts.semiBold }]}>
              {name.charAt(0) || "U"}
            </Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Ionicons name="camera" size={20} color="#FF6347" />
            <Text
              style={[styles.changePhotoText, { fontFamily: fonts.medium }]}>
              Changer la photo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontFamily: fonts.medium }]}>
              Nom complet
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { fontFamily: fonts.regular }]}
                value={name}
                onChangeText={setName}
                placeholder="Votre nom"
                placeholderTextColor="#999"
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontFamily: fonts.medium }]}>
              Email
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { fontFamily: fonts.regular }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Votre email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontFamily: fonts.medium }]}>
              Téléphone
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { fontFamily: fonts.regular }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Votre numéro de téléphone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  backButton: {
    padding: 8
  },
  title: {
    fontSize: fontSizes.xl,
    color: "#333"
  },
  saveButton: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },
  saveButtonDisabled: {
    backgroundColor: "#FFB6B6"
  },
  saveButtonText: {
    fontSize: fontSizes.base,
    color: "#FFFFFF"
  },
  saveButtonTextDisabled: {
    color: "#FFFFFF"
  },
  content: {
    flex: 1
  },
  avatarContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  avatarText: {
    fontSize: 48,
    color: "#fff"
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  changePhotoText: {
    fontSize: fontSizes.base,
    color: "#FF6347",
    marginLeft: 5
  },
  form: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: fontSizes.base,
    color: "#333",
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee"
  },
  inputIcon: {
    padding: 12
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: fontSizes.base,
    color: "#333"
  }
});
