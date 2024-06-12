import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from './authProvider';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
