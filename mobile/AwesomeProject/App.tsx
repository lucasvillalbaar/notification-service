import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {PermissionsAndroid} from 'react-native';

export default function App() {
  useEffect(() => {
    // Request notification permissions from the user
    const requestNotificationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Permisos de notificación',
            message: 'La aplicación necesita acceder a las notificaciones para recibir notificaciones push.',
            buttonPositive: 'Aceptar',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permisos de notificación concedidos');
        } else {
          console.log('Permisos de notificación denegados');
        }
      } catch (error) {
        console.error('Error al solicitar permisos de notificación:', error);
      }
    };

    // Request notification permissions from the user when loading the application
    requestNotificationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.body}>Body</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  body: {
    fontSize: 14,
    color: '#000000',
  },
});
