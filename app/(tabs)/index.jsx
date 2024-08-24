import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const coverImage =
  "https://c4.wallpaperflare.com/wallpaper/284/337/215/clouds-forest-landscape-mist-wallpaper-preview.jpg";

const Index = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("signin");

  const handleSignup = () => {
    router.push("/LoginScreen");
    setActiveButton("signin");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>
          Welcome to
          <Text style={styles.highlight}> Loombus</Text>
        </Text>
        <Text style={styles.subtitle}>
          Find clean and hygienic public washrooms near you
        </Text>

        <View style={{ marginTop: 20 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                activeButton === "signup" && styles.activeButton,
              ]}
              onPress={() => setActiveButton("signup")}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeButton === "signup" && styles.activeButtonText,
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                activeButton === "signin" && styles.activeButton,
              ]}
              onPress={handleSignup}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeButton === "signin" && styles.activeButtonText,
                ]}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  highlight: {
    color: "#FF6666",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    // borderWidth: 1,
    borderColor: "#ccc",
    width: "50%",
    height: 50,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#050049",
  },
  activeButtonText: {
    color: "white",
  },
});

export default Index;
