/** @format */

import { Ionicons } from "@expo/vector-icons"; // Pour l'icône de checkbox (optionnel)
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

// Vous devrez probablement réutiliser la même image de fond ou une version légèrement différente (plus floue) ici
const backgroundImage = require("../assets/salon-background.jpg"); // Assurez-vous que le chemin est correct

const AuthScreen = () => {
  const router = useRouter(); // Obtenir l'instance du router
  const [isLoginView, setIsLoginView] = useState(true); // État pour basculer entre Login et Sign-up

  // États pour les champs de formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Fonctions pour basculer la vue
  const switchToSignup = () => setIsLoginView(false);
  const switchToLogin = () => setIsLoginView(true);

  // TODO: Implémenter la logique de connexion et d'inscription
  const handleLogin = () => {
    console.log("Login attempted with:", { email, password });
    // TODO: Appeler votre service de connexion ici
    // Si la connexion est réussie :
    router.replace("/(tabs)"); // Rediriger vers la page d'accueil (mise en page des onglets)
  };

  const handleSignup = () => {
    console.log("Signup attempted with:", {
      name,
      email,
      password,
      confirmPassword,
      rememberMe
    });
    // TODO: Appeler votre service d'inscription ici
    // Si l'inscription est réussie, vous pourriez rediriger l'utilisateur (par exemple, vers l'écran de connexion ou directement vers l'accueil si votre flow le permet)
    // router.replace('/auth'); // Exemple: rediriger vers l'écran de connexion après inscription
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
                Login
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
                Sign-up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenu du formulaire (Login ou Sign-up) */}
          {isLoginView ? (
            // Formulaire de connexion (Login)
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Login</Text>

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
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Lien Forgot Password? */}
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Bouton Login */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Formulaire d'inscription (Sign-up)
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Sign-up</Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
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
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {/* Checkbox Remember Me? */}
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}>
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkedCheckbox
                  ]}>
                  {rememberMe && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </View>
                <Text style={styles.rememberMeText}>Remember Me?</Text>
              </TouchableOpacity>

              {/* Bouton Sign-up */}
              <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign-up</Text>
              </TouchableOpacity>
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
    width: "100%", // Assurer que le conteneur prend toute la largeur pour centrer le formulaire,
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
    backgroundColor: "white", // Fond blanc pour le formulaire
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000", // Ajouter une ombre pour la profondeur
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333" // Couleur du titre du formulaire
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16
  },
  forgotPasswordText: {
    color: "#FF6347",
    marginBottom: 20,
    textDecorationLine: "underline"
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    width: "100%", // Bouton pleine largeur
    alignItems: "center",
    marginTop: 10 // Espace au-dessus du bouton
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  checkedCheckbox: {
    backgroundColor: "#FF6347",
    borderColor: "#FF6347"
  },
  rememberMeText: {
    fontSize: 16,
    color: "#333"
  }
});

export default AuthScreen;
