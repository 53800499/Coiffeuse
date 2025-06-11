/** @format */

import { useRouter } from "expo-router"; // Importer useRouter
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { authService } from "../services/authService";

// Vous devrez probablement réutiliser la même image de fond ou une version légèrement différente (plus floue) ici
const backgroundImage = require("../assets/salon-background.jpg"); // Assurez-vous que le chemin est correct

const AuthScreen = () => {
  const router = useRouter(); // Obtenir l'instance du router
  const [isLoginView, setIsLoginView] = useState(true); // État pour basculer entre Login et Sign-up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Fonctions pour basculer la vue
  const switchToSignup = () => {
    setIsLoginView(false);
    setError("");
  };
  const switchToLogin = () => {
    setIsLoginView(true);
    setError("");
  };

  const handleLogin = async () => {
    try {
      setError("");
      const response = await authService.login(email, password);
      if (response.user.role === "coiffeuse") {
        router.replace("/(coiffeuse)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      setError("Identifiants invalides. Veuillez réessayer.");
    }
  };

  const handleSignup = () => {
    setError("L'inscription n'est pas disponible pour le moment.");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Boutons pour basculer entre Login et Sign-up en haut */}
          <View style={styles.switchButtonContainer}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                isLoginView && styles.activeSwitchButton
              ]}
              onPress={switchToLogin}>
              <Text
                style={[
                  styles.switchButtonText,
                  isLoginView && styles.activeSwitchButtonText
                ]}>
                Se connecter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchButton,
                !isLoginView && styles.activeSwitchButton
              ]}
              onPress={switchToSignup}>
              <Text
                style={[
                  styles.switchButtonText,
                  !isLoginView && styles.activeSwitchButtonText
                ]}>
                S{"'"}inscrire
              </Text>
            </TouchableOpacity>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Contenu du formulaire (Login ou Sign-up) */}
          {isLoginView ? (
            // Formulaire de connexion (Login)
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Se connecter</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Lien Forgot Password? */}
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié
                </Text>
              </TouchableOpacity>

              {/* Bouton Login */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Formulaire d'inscription (Sign-up)
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>S{"'"}inscrire</Text>
              <Text style={styles.disabledMessage}>
                L{"'"}inscription n{"'"}est pas disponible pour le moment.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)" // Augmenter l'opacité pour un effet plus flou/sombre comme sur l'image
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 50 // Ajoute un peu d'espace en haut et en bas si le contenu dépasse l'écran
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%" // Assurer que le conteneur prend toute la largeur pour centrer le formulaire,
  },
  switchButtonContainer: {
    flexDirection: "row",
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.8)", // Fond semi-transparent pour les boutons switch
    borderRadius: 25,
    padding: 5,
    width: "80%", // Ajuster la largeur des boutons switch
    alignSelf: "center" // Centrer les boutons switch
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center"
  },
  activeSwitchButton: {
    backgroundColor: "#FF6347" // Couleur active
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6347" // Couleur inactive
  },
  activeSwitchButtonText: {
    color: "white" // Couleur active
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333"
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9"
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6347",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  forgotPasswordText: {
    color: "#FF6347",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 14
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%"
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 14
  },
  disabledMessage: {
    color: "#666",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20
  }
});

export default AuthScreen;
