import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from './authProvider';

const SignUp = () => {
  const { signUp } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Sign Up" onPress={signUp} />
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

export default SignUp;
