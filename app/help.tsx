/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";

export default function HelpScreen() {
  const router = useRouter();
  const { user } = useUser();

  const faqItems = [
    {
      question: "Comment prendre rendez-vous ?",
      answer:
        "Pour prendre rendez-vous, sélectionnez un service dans la liste, choisissez une date et une heure, puis confirmez votre rendez-vous."
    },
    {
      question: "Comment annuler un rendez-vous ?",
      answer:
        "Vous pouvez annuler un rendez-vous depuis la page 'Mes rendez-vous' en cliquant sur le rendez-vous concerné et en sélectionnant l'option d'annulation."
    },
    {
      question: "Comment modifier mes informations personnelles ?",
      answer:
        "Accédez à votre profil, cliquez sur le bouton de modification et mettez à jour vos informations."
    },
    {
      question: "Comment ajouter une carte de paiement ?",
      answer:
        "Dans la section 'Mes cartes', cliquez sur 'Ajouter une carte' et suivez les instructions pour enregistrer votre carte."
    }
  ];

  const contactItems = [
    {
      icon: "mail-outline",
      title: "Email",
      value: "support@coiffeuse.com",
      action: "mailto:support@coiffeuse.com"
    },
    {
      icon: "call-outline",
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      action: "tel:+33123456789"
    },
    {
      icon: "chatbubble-outline",
      title: "Chat en direct",
      value: "Disponible 24/7",
      action: () => router.push("/chat")
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Aide et support</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Questions fréquentes</Text>
        {faqItems.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nous contacter</Text>
        {contactItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactItem}
            onPress={() => {
              if (typeof item.action === "function") {
                item.action();
              } else {
                // Gérer les liens mailto et tel
                console.log(item.action);
              }
            }}>
            <View style={styles.contactItemLeft}>
              <Ionicons name={item.icon as any} size={24} color="#333" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{item.title}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ressources</Text>
        <TouchableOpacity style={styles.resourceItem}>
          <Ionicons name="document-text-outline" size={24} color="#333" />
          <Text style={styles.resourceText}>Guide d&apos;utilisation</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resourceItem}>
          <Ionicons name="videocam-outline" size={24} color="#333" />
          <Text style={styles.resourceText}>Tutoriels vidéo</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333"
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5
  },
  answer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  contactItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  contactInfo: {
    marginLeft: 15
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  contactValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 2
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  resourceText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15
  }
});
