import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from './authProvider';

const Navigation = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <View style={styles.container}>
      {isAuthenticated && (
        <Button title="Sign Out" onPress={signOut} />
      )}
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

export default Navigation;
