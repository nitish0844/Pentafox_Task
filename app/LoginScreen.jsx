import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  IconMapPinFilled,
  IconEyeClosed,
  IconEye,
} from "@tabler/icons-react-native";
import { useRouter } from "expo-router";

const googleIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png";

const LoginScreen = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passWordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const [forgetPasswordError, setForgetPasswordError] = useState("");

  const validateEmail = (text) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(text)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
    setEmail(text);
  };

  const validatePassword = (text) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (passwordRegex.test(text)) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (emailError) {
      Alert.alert("Error", emailError);
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    Alert.alert("Success", "Login successful!");
  };

  const forgetPassWord = () => {
    setModalVisible(true);
  };

  const onForgetPasswordSubmit = (text) => {
    if (text === "") {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    if (emailError) {
      Alert.alert("Error", emailError);
      return;
    }

    setModalVisible(text);
    setModalVisible(false);
  };

  const forgetEmailText = (text) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(text)) {
      setEmailError("");
    } else {
      setForgetPasswordError("Please enter a valid email address.");
    }

    setForgetPasswordEmail(text);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={Styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: 20, gap: 10 }}>
            <IconMapPinFilled
              size={150}
              color="red"
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                alignSelf: "center",
                color: "#050049",
              }}
            >
              Let's sign you in
            </Text>
          </View>

          <View style={Styles.inputContainer}>
            <Text style={Styles.title}>Email</Text>
            <TextInput
              type="email"
              placeholder="Enter Email"
              style={[Styles.input, emailError ? { borderColor: "red" } : {}]}
              value={email}
              onChangeText={validateEmail}
            />
            {emailError ? <Text style={Styles.error}>{emailError}</Text> : null}
          </View>

          <View style={[Styles.inputContainer]}>
            <Text style={Styles.title}>Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Enter Password"
                style={Styles.input}
                value={password}
                secureTextEntry={!passWordVisible}
                onChangeText={(text) => setPassword(text)}
              />
              {passWordVisible ? (
                <IconEye
                  size={30}
                  color="#050049"
                  onPress={() => setPasswordVisible(!passWordVisible)}
                  style={Styles.icon}
                />
              ) : (
                <IconEyeClosed
                  size={30}
                  color="gray"
                  onPress={() => setPasswordVisible(!passWordVisible)}
                  style={Styles.icon}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: "flex-end" }}
            onPress={forgetPassWord}
          >
            <Text style={{ color: "#050049", fontWeight: "600" }}>
              Forget Password?
            </Text>
          </TouchableOpacity>

          <View style={Styles.buttonContainer}>
            <TouchableOpacity style={Styles.button} onPress={handleLogin}>
              <Text style={Styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Styles.button,
                {
                  backgroundColor: "#fff",
                  borderColor: "#050049",
                  borderWidth: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                },
              ]}
            >
              <Image
                source={{ uri: googleIcon }}
                style={{ width: 20, height: 20 }}
              />
              <Text style={[Styles.buttonText, { color: "#000" }]}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              marginTop: 20,
            }}
          >
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/index")}>
              <Text style={{ color: "#050049", fontWeight: "600" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            style={Styles.modal}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={Styles.modalContent}>
              <View style={Styles.modalView}>
                <Text>Forget Password</Text>

                <View style={Styles.inputContainerModal}>
                  <TextInput
                    placeholder="Enter Email"
                    style={Styles.input}
                    value={forgetPasswordEmail}
                    onChangeText={forgetEmailText}
                    autoCapitalize="none"
                  />

                  {forgetPasswordError && (
                    <Text style={Styles.error}>{forgetPasswordError}</Text>
                  )}

                  <TouchableOpacity
                    style={Styles.button}
                    onPress={onForgetPasswordSubmit}
                  >
                    <Text style={Styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "95%",
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  icon: {
    alignSelf: "center",
    position: "absolute",
    right: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    padding: 2,
    color: "gray",
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#050049",
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "40%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
    top: 20,
  },
  inputContainerModal: {
    width: "100%",
    top: 20,
    alignItems: "center",
    gap: 10,
  },
});

export default LoginScreen;
