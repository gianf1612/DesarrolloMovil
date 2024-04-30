import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  appId: '', //change to own config
  projectId: '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const Component = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Students')
      .onSnapshot((snapshot) => {
        const studentsList = [];
        snapshot.forEach((doc) => {
          const { FirstName, LastName } = doc.data();
          studentsList.push({
            id: doc.id,
            FirstName,
            LastName,
          });
        });
        setStudents(studentsList);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`${item.FirstName} ${item.LastName}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
});

export default Component;
