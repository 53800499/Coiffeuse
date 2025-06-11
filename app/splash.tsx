/** @format */

import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const SplashScreen = () => {
  const router = useRouter();
  const backgroundImage = require("../assets/salon-background.jpg");

  const handleLetsStart = () => {
    router.push("/auth");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenu dans notre salon de coiffure</Text>
        <Text style={styles.subtitle}>
          Faitez-vous belle et beau avec nos services de coiffure
          professionnels. Réservez votre rendez-vous dès maintenant !
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLetsStart}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    alignSelf: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 40
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  }
});

export default SplashScreen;
