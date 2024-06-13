import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      console.log("User logged in with session ID:");
      //router.push("/index");
    } catch (err: any) {
      console.log("ups");
      console.log(err);
    }
  };

  const onSignUpPress = () => {
    router.push("/signUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          placeholderTextColor="black"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password..."
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    width: "80%",
    marginBottom: 10, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
