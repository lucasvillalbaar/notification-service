import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [title, setNotificationTitle] = useState('Title');
  const [body, setNotificationBody] = useState('Body');
  
  //Get the token from Firebase and display it in the console (for development purposes only)
  messaging()
  .getToken()
  .then((token) => {
    console.log('TOKEN:', token);
    // TODO: Send token to the backend
  })
  .catch((error) => {
    console.log('ERROR: Error al obtener el token de Firebase:', error);
  });

  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('MESSAGE HANDLED IN BACKGROUND');
    console.log(remoteMessage.notification?.title);
    console.log(remoteMessage.notification?.body);
  });

  // Handle foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('MESSAGE HANDLED IN FOREGROUND');
    console.log(remoteMessage.notification?.title);
    console.log(remoteMessage.notification?.body);

    const remoteTitle = remoteMessage.notification?.title ?? 'Title';
    const remoteBody = remoteMessage.notification?.body ?? 'Body';
    setNotificationTitle(remoteTitle);
    setNotificationBody(remoteBody);
  });

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
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
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
