/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  const handleContact = () => {
    Linking.openURL("mailto:support@coiffeuse.com");
  };

  const handleWebsite = () => {
    Linking.openURL("https://coiffeuse.com");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>À propos</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Coiffeuse</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos de l'application</Text>
          <Text style={styles.description}>
            Coiffeuse est une application mobile qui vous permet de trouver et
            réserver facilement des services de coiffure à domicile. Notre
            mission est de simplifier l'accès aux services de beauté en les
            rendant plus accessibles et pratiques.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContact}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
            <Text style={styles.contactButtonText}>support@coiffeuse.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleWebsite}>
            <Ionicons name="globe-outline" size={20} color="#007AFF" />
            <Text style={styles.contactButtonText}>www.coiffeuse.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crédits</Text>
          <Text style={styles.credits}>
            Développé avec ❤️ par l'équipe Coiffeuse
          </Text>
          <Text style={styles.copyright}>
            © 2024 Coiffeuse. Tous droits réservés.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
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
    marginRight: 15,
    padding: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  content: {
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 30
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15
  },
  appName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  version: {
    fontSize: 16,
    color: "#666"
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10
  },
  contactButtonText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 10
  },
  credits: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10
  },
  copyright: {
    fontSize: 14,
    color: "#999",
    textAlign: "center"
  }
});
