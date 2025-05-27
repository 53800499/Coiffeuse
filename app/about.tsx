/** @format */

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { fonts, fontSizes } from "./theme/fonts";

export default function AboutScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleContact = () => {
    Linking.openURL("mailto:support@coiffeuse.com");
  };

  const handleWebsite = () => {
    Linking.openURL("https://coiffeuse.com");
  };

  const handleSocialMedia = (platform: string) => {
    const urls = {
      facebook: "https://facebook.com/coiffeuse",
      instagram: "https://instagram.com/coiffeuse",
      twitter: "https://twitter.com/coiffeuse"
    };
    Linking.openURL(urls[platform as keyof typeof urls]);
  };

  const features = [
    {
      icon: "calendar-outline",
      title: "Réservation en ligne",
      description: "Réservez vos rendez-vous en quelques clics"
    },
    {
      icon: "location-outline",
      title: "Services à domicile",
      description: "Profitez de nos services chez vous"
    },
    {
      icon: "card-outline",
      title: "Paiement sécurisé",
      description: "Paiement en ligne sécurisé"
    },
    {
      icon: "star-outline",
      title: "Système de fidélité",
      description: "Gagnez des points à chaque rendez-vous"
    }
  ];

  const team = [
    {
      name: "Marie Dupont",
      role: "Fondatrice & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Sophie Martin",
      role: "Directrice Technique",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      name: "Julie Bernard",
      role: "Directrice Marketing",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
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
          À propos
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appName, { fontFamily: fonts.semiBold }]}>
            Coiffeuse
          </Text>
          <Text style={[styles.version, { fontFamily: fonts.regular }]}>
            Version 1.0.0
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color="#FF6347"
                />
              </View>
              <View style={styles.featureInfo}>
                <Text
                  style={[styles.featureTitle, { fontFamily: fonts.semiBold }]}>
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { fontFamily: fonts.regular }
                  ]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("about")}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
              À propos de l{"'"}application
            </Text>
            <Ionicons
              name={expandedSection === "about" ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </View>
          {expandedSection === "about" && (
            <Text style={[styles.description, { fontFamily: fonts.regular }]}>
              Coiffeuse est une application mobile qui révolutionne l{"'"}accès
              aux services de coiffure. Notre mission est de simplifier la vie
              de nos utilisateurs en leur offrant une expérience de réservation
              fluide et intuitive. Nous connectons les clients avec les
              meilleurs professionnels de la coiffure, tout en garantissant des
              services de qualité et une satisfaction optimale.
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("team")}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
              Notre équipe
            </Text>
            <Ionicons
              name={expandedSection === "team" ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </View>
          {expandedSection === "team" && (
            <View style={styles.teamContainer}>
              {team.map((member, index) => (
                <View key={index} style={styles.teamMember}>
                  <Image
                    source={{ uri: member.image }}
                    style={styles.teamMemberImage}
                  />
                  <Text
                    style={[
                      styles.teamMemberName,
                      { fontFamily: fonts.semiBold }
                    ]}>
                    {member.name}
                  </Text>
                  <Text
                    style={[
                      styles.teamMemberRole,
                      { fontFamily: fonts.regular }
                    ]}>
                    {member.role}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: fonts.semiBold }]}>
            Contact
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContact}>
            <View style={styles.contactIcon}>
              <Ionicons name="mail-outline" size={20} color="#FF6347" />
            </View>
            <Text
              style={[styles.contactButtonText, { fontFamily: fonts.medium }]}>
              support@coiffeuse.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleWebsite}>
            <View style={styles.contactIcon}>
              <Ionicons name="globe-outline" size={20} color="#FF6347" />
            </View>
            <Text
              style={[styles.contactButtonText, { fontFamily: fonts.medium }]}>
              www.coiffeuse.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialMedia("facebook")}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialMedia("instagram")}>
            <Ionicons name="logo-instagram" size={24} color="#E4405F" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialMedia("twitter")}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.credits, { fontFamily: fonts.medium }]}>
            Développé avec ❤️ par Eskay_dev
          </Text>
          <Text style={[styles.copyright, { fontFamily: fonts.regular }]}>
            © 2025 Coiffeuse. Tous droits réservés.
          </Text>
        </View>
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
    marginRight: 15,
    padding: 4
  },
  title: {
    fontSize: fontSizes.xl,
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
    fontSize: fontSizes.xl,
    color: "#333",
    marginBottom: 5
  },
  version: {
    fontSize: fontSizes.base,
    color: "#666"
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20
  },
  featureItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
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
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  featureInfo: {
    flex: 1
  },
  featureTitle: {
    fontSize: fontSizes.base,
    color: "#333",
    marginBottom: 5
  },
  featureDescription: {
    fontSize: fontSizes.sm,
    color: "#666",
    lineHeight: 18
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    color: "#333",
    marginBottom: 15
  },
  description: {
    fontSize: fontSizes.base,
    color: "#666",
    lineHeight: 24
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  teamMember: {
    alignItems: "center",
    width: "30%"
  },
  teamMemberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  teamMemberName: {
    fontSize: fontSizes.sm,
    color: "#333",
    textAlign: "center",
    marginBottom: 2
  },
  teamMemberRole: {
    fontSize: fontSizes.xs,
    color: "#666",
    textAlign: "center"
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10
  },
  contactIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center"
  },
  contactButtonText: {
    fontSize: fontSizes.base,
    color: "#FF6347",
    marginLeft: 10
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
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
  footer: {
    alignItems: "center",
    marginTop: 20
  },
  credits: {
    fontSize: fontSizes.base,
    color: "#666",
    textAlign: "center",
    marginBottom: 10
  },
  copyright: {
    fontSize: fontSizes.sm,
    color: "#999",
    textAlign: "center"
  }
});
