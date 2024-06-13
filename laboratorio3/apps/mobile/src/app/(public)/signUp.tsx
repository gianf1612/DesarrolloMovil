import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  
  const onBackPress = async () => {
    router.back();
  }

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/index");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            placeholderTextColor="black"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            placeholderTextColor="black"
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="black"
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password..."
           placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onBackPress}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
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
  formContainer: {
    width: "80%",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
