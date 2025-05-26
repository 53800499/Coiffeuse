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

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Politique de confidentialité</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Collecte des informations</Text>
          <Text style={styles.text}>
            Nous collectons les informations suivantes :{"\n\n"}• Informations
            personnelles (nom, email, numéro de téléphone)
            {"\n"}• Informations de localisation
            {"\n"}• Informations de paiement
            {"\n"}• Historique des rendez-vous
            {"\n"}• Préférences de services
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. Utilisation des informations
          </Text>
          <Text style={styles.text}>
            Les informations collectées sont utilisées pour :{"\n\n"}• Fournir
            et améliorer nos services
            {"\n"}• Gérer votre compte et vos rendez-vous
            {"\n"}• Communiquer avec vous
            {"\n"}• Personnaliser votre expérience
            {"\n"}• Assurer la sécurité de nos services
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Protection des informations
          </Text>
          <Text style={styles.text}>
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos informations personnelles contre tout accès,
            modification, divulgation ou destruction non autorisés.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Partage des informations</Text>
          <Text style={styles.text}>
            Nous ne vendons pas vos informations personnelles. Nous pouvons
            partager vos informations avec :{"\n\n"}• Les coiffeurs pour la
            prestation des services
            {"\n"}• Nos prestataires de services
            {"\n"}• Les autorités légales si requis par la loi
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Vos droits</Text>
          <Text style={styles.text}>
            Vous avez le droit de :{"\n\n"}• Accéder à vos données personnelles
            {"\n"}• Corriger vos données
            {"\n"}• Supprimer vos données
            {"\n"}• Vous opposer au traitement
            {"\n"}• Limiter le traitement
            {"\n"}• La portabilité des données
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. Cookies et technologies similaires
          </Text>
          <Text style={styles.text}>
            Nous utilisons des cookies et des technologies similaires pour
            améliorer votre expérience, analyser l{"'"}utilisation de l{"'"}
            application et personnaliser le contenu.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            7. Modifications de la politique
          </Text>
          <Text style={styles.text}>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps à autre. Nous vous informerons de tout changement important en
            publiant la nouvelle politique dans l{"'"}application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact</Text>
          <Text style={styles.text}>
            Pour toute question concernant cette politique de confidentialité,
            veuillez nous contacter à privacy@coiffeuse.com
          </Text>
        </View>

        <Text style={styles.lastUpdated}>
          Dernière mise à jour : 26 mai 2025
        </Text>
      </View>
    </ScrollView>
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
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24
  },
  lastUpdated: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30
  }
});
