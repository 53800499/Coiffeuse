/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useUser } from "./context/UserContext";
import { fonts, fontSizes } from "./theme/fonts";

export default function HelpScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Comment prendre rendez-vous ?",
      answer:
        "Pour prendre rendez-vous, sélectionnez un service dans la liste, choisissez une date et une heure, puis confirmez votre rendez-vous. Vous recevrez une confirmation par email et SMS."
    },
    {
      question: "Comment annuler un rendez-vous ?",
      answer:
        "Vous pouvez annuler un rendez-vous depuis la page 'Mes rendez-vous' en cliquant sur le rendez-vous concerné et en sélectionnant l'option d'annulation. Les annulations sont gratuites jusqu'à 24h avant le rendez-vous."
    },
    {
      question: "Comment modifier mes informations personnelles ?",
      answer:
        "Accédez à votre profil, cliquez sur le bouton de modification et mettez à jour vos informations. N'oubliez pas de sauvegarder vos modifications."
    },
    {
      question: "Comment ajouter une carte de paiement ?",
      answer:
        "Dans la section 'Mes cartes', cliquez sur 'Ajouter une carte' et suivez les instructions pour enregistrer votre carte. Vos informations de paiement sont sécurisées et cryptées."
    },
    {
      question: "Comment fonctionne le système de fidélité ?",
      answer:
        "À chaque rendez-vous, vous gagnez des points de fidélité. Ces points peuvent être échangés contre des réductions ou des services gratuits. Consultez votre solde dans la section 'Fidélité'."
    }
  ];

  const contactItems = [
    {
      icon: "mail-outline",
      title: "Email",
      value: "support@coiffeuse.com",
      action: "mailto:support@coiffeuse.com",
      color: "#FF6347"
    },
    {
      icon: "call-outline",
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      action: "tel:+33123456789",
      color: "#4CAF50"
    },
    {
      icon: "chatbubble-outline",
      title: "Chat en direct",
      value: "Disponible 24/7",
      action: () => router.push("/chat"),
      color: "#2196F3"
    }
  ];

  const resources = [
    {
      icon: "document-text-outline",
      title: "Guide d'utilisation",
      description: "Tout ce que vous devez savoir sur l'application",
      action: () => router.push("/about"),
      color: "#9C27B0"
    },
    {
      icon: "videocam-outline",
      title: "Tutoriels vidéo",
      description: "Apprenez à utiliser toutes les fonctionnalités",
      action: () => router.push("/about"),
      color: "#FF9800"
    },
    {
      icon: "help-circle-outline",
      title: "Centre d'aide",
      description: "Trouvez des réponses à vos questions",
      action: () => router.push("/about"),
      color: "#00BCD4"
    }
  ];

  const handleContactPress = (action: string | (() => void)) => {
    if (typeof action === "string") {
      Linking.openURL(action);
    } else {
      action();
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fonts.semiBold }]}>
          Aide et support
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={[styles.searchText, { fontFamily: fonts.regular }]}>
            Rechercher une question...
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
          Questions fréquentes
        </Text>
        {faqItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.faqItem,
              expandedFaq === index && styles.faqItemExpanded
            ]}
            onPress={() => toggleFaq(index)}>
            <View style={styles.faqHeader}>
              <Text
                style={[
                  styles.question,
                  { fontFamily: fonts.semiBold },
                  expandedFaq === index && styles.questionExpanded
                ]}>
                {item.question}
              </Text>
              <Ionicons
                name={expandedFaq === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </View>
            {expandedFaq === index && (
              <Text style={[styles.answer, { fontFamily: fonts.regular }]}>
                {item.answer}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
          Nous contacter
        </Text>
        {contactItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.contactItem, { borderLeftColor: item.color }]}
            onPress={() => handleContactPress(item.action)}>
            <View style={styles.contactItemLeft}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: `${item.color}15` }
                ]}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text
                  style={[styles.contactTitle, { fontFamily: fonts.semiBold }]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.contactValue, { fontFamily: fonts.regular }]}>
                  {item.value}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
          Ressources
        </Text>
        {resources.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.resourceItem, { borderLeftColor: item.color }]}
            onPress={item.action}>
            <View style={styles.resourceItemLeft}>
              <View
                style={[
                  styles.resourceIcon,
                  { backgroundColor: `${item.color}15` }
                ]}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
              <View style={styles.resourceInfo}>
                <Text
                  style={[
                    styles.resourceTitle,
                    { fontFamily: fonts.semiBold }
                  ]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.resourceDescription,
                    { fontFamily: fonts.regular }
                  ]}>
                  {item.description}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { fontFamily: fonts.regular }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 3
      }
    })
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: fontSizes.xl,
    color: "#333"
  },
  searchContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12
  },
  searchText: {
    marginLeft: 10,
    fontSize: fontSizes.base,
    color: "#999"
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    color: "#333",
    marginBottom: 15
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6347",
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
  faqItemExpanded: {
    borderLeftColor: "#4CAF50"
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15
  },
  question: {
    flex: 1,
    fontSize: fontSizes.base,
    color: "#333",
    marginRight: 10
  },
  questionExpanded: {
    color: "#4CAF50"
  },
  answer: {
    fontSize: fontSizes.sm,
    color: "#666",
    lineHeight: 20,
    padding: 15,
    paddingTop: 0
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
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
  contactItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  contactInfo: {
    marginLeft: 15,
    flex: 1
  },
  contactTitle: {
    fontSize: fontSizes.base,
    color: "#333"
  },
  contactValue: {
    fontSize: fontSizes.sm,
    color: "#666",
    marginTop: 2
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
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
  resourceItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  resourceInfo: {
    marginLeft: 15,
    flex: 1
  },
  resourceTitle: {
    fontSize: fontSizes.base,
    color: "#333"
  },
  resourceDescription: {
    fontSize: fontSizes.sm,
    color: "#666",
    marginTop: 2
  },
  footer: {
    padding: 20,
    alignItems: "center"
  },
  footerText: {
    fontSize: fontSizes.sm,
    color: "#999"
  }
});
