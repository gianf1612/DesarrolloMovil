import React, { useState } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ESTUDIANTES } from './mock';

export default function Page() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleStudentPress = (id: number) => {
        setSelectedId(id);
        router.push(`/details?id=${id}`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ESTUDIANTES}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.buttonContainer}>
                        <Button title={item.nombre} onPress={() => handleStudentPress(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});
