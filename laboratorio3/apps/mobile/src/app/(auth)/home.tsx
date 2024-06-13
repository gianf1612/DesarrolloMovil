import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button 
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const Home = () => {
  const students = api.ucr.studentsDrizzle.useQuery();

  return (
    <View style={styles.container}>
      <FlatList 
        data={students.data}
        renderItem={({ item }) => <Text>{item.firstName}{item.lastName}</Text>}
      />
      <SignOut />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
})