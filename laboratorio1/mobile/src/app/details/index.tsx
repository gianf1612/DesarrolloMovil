import React from 'react';
import { Text, View } from 'react-native';
import { ESTUDIANTES } from '../mock';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    id: string;
};

export default function DetailsScreen() {
    const route = useRoute();
    const { id } = route.params as RouteParams; // Especificamos el tipo de route.params
    const student = ESTUDIANTES.find((estudiante) => estudiante.id === parseInt(id, 10));

    if (!student) {
        return <Text>Estudiante no encontrado</Text>;
    }

    return (
        <View>
            <Text>ID: {student.id}</Text>
            <Text>Nombre: {student.nombre}</Text>
            <Text>Activo: {student.activo ? 'Sí' : 'No'}</Text>
            {student.asistencia && <Text>Asistencia: {student.asistencia}</Text>}
        </View>
    );
}
