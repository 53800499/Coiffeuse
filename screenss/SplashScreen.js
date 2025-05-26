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
  const backgroundImage = require("../assets/salon-background.jpg"); // Assuming the image is in an 'assets' folder

  const handleLetsStart = () => {
    // Naviguer vers la page d'authentification (login/signup)
    router.push("/auth");
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Look Awesome &amp; Save Some</Text>
        <Text style={styles.subtitle}>
          Step into a world of personalized services that enhance your beauty
          and well-being.
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
    resizeMode: "cover",
    justifyContent: "center"
  },
  overlay: {
    // Optional: Add an overlay if the background image needs to be darker
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)" // Adjust opacity as needed
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align content to the bottom
    alignItems: "center",
    paddingBottom: 50, // Add some padding at the bottom
    paddingHorizontal: 20
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white", // Assuming white text based on the image
    textAlign: "center",
    marginBottom: 20
  },
  subtitle: {
    fontSize: 16,
    color: "white", // Assuming white text based on the image
    textAlign: "center",
    marginBottom: 40
  },
  button: {
    backgroundColor: "#FF6347", // A shade of red, adjust to match the image precisely
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  }
});

export default SplashScreen;
