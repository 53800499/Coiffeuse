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

export default function TermsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Conditions d{"'"}utilisation</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptation des conditions</Text>
          <Text style={styles.text}>
            En utilisant l{"'"}application Coiffeuse, vous acceptez d{"'"}être
            lié par les présentes conditions d{"'"}utilisation. Si vous n{"'"}
            acceptez pas ces conditions, veuillez ne pas utiliser l{"'"}
            application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description du service</Text>
          <Text style={styles.text}>
            Coiffeuse est une plateforme qui met en relation des clients avec
            des professionnels de la coiffure à domicile. L{"'"}application
            facilite la réservation de services de coiffure et la gestion des
            rendez-vous.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Compte utilisateur</Text>
          <Text style={styles.text}>
            Pour utiliser certaines fonctionnalités de l{"'"}application, vous
            devez créer un compte. Vous êtes responsable de maintenir la
            confidentialité de vos informations de connexion et de toutes les
            activités qui se produisent sous votre compte.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Réservations et paiements</Text>
          <Text style={styles.text}>
            Les réservations sont soumises à disponibilité. Les paiements sont
            traités de manière sécurisée via notre plateforme. Les prix sont
            indiqués en euros et incluent toutes les taxes applicables.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. Annulations et remboursements
          </Text>
          <Text style={styles.text}>
            Les annulations doivent être effectuées au moins 24 heures avant le
            rendez-vous. Les remboursements sont soumis à notre politique de
            remboursement standard.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Propriété intellectuelle</Text>
          <Text style={styles.text}>
            Tous les droits de propriété intellectuelle relatifs à l{"'"}
            application et à son contenu appartiennent à Coiffeuse ou à ses
            concédants de licence.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            7. Limitation de responsabilité
          </Text>
          <Text style={styles.text}>
            Coiffeuse n{"'"}est pas responsable des dommages indirects,
            accessoires, spéciaux ou consécutifs résultant de l{"'"}utilisation
            ou de l{"'"}impossibilité d{"'"}utiliser l{"'"}application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            8. Modifications des conditions
          </Text>
          <Text style={styles.text}>
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Les modifications entrent en vigueur dès leur publication
            dans l{"'"}application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Contact</Text>
          <Text style={styles.text}>
            Pour toute question concernant ces conditions, veuillez nous
            contacter à support@coiffeuse.com
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
    paddingTop: 40,
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
