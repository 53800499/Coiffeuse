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

  // You will need to replace 'path/to/your/background-image.jpg' with the actual path to your image file
  const backgroundImage = require("../assets/salon-background.jpg"); // Assurez-vous que le chemin est correct

  const handleLetsStart = () => {
    router.push("/auth");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Look Awesome &amp; Save Some</Text>
        <Text style={styles.subtitle}>
          Step into a world of personalized\n services that enhance your
          beauty\n and well-being.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLetsStart}>
          <Text style={styles.buttonText}>Let&apos;s Start</Text>
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
