import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

async function saveTokenToDatabase(token:string) {
  // TODO: Save token into the database
  console.log('TOKEN SAVED');
}

type AppProps = {
  title: string;
  setNotificationTitle: (title: string) => void;
  body: string;
  setNotificationBody: (body: string) => void;
};

export default function App({
  title,
  setNotificationTitle,
  body,
  setNotificationBody,
}: AppProps) {
  
  // Handle foreground messages
  useEffect(() =>{
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('MESSAGE HANDLED IN FOREGROUND');
      console.log(remoteMessage.notification?.title);
      console.log(remoteMessage.notification?.body);
      
      const remoteTitle = remoteMessage.notification?.title ?? 'Title';
      const remoteBody = remoteMessage.notification?.body ?? 'Body';
      setNotificationTitle(remoteTitle);
      setNotificationBody(remoteBody);
    });

    return unsubscribe;
  }, []);
  
  // Get Firebase token and save it
  useEffect(() => {
    //Get the token from Firebase and display it in the console (for development purposes only)
    messaging()
    .getToken()
    .then((token) => {
      console.log('TOKEN:', token);
      return saveTokenToDatabase(token);
    })
    .catch((error) => {
      console.log('ERROR: Error al obtener el token de Firebase:', error);
    });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
      });
  },[]);

  // Request notification permissions from the user
  useEffect(() => {
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
            console.log('Notification permissions granted');
          } else {
            console.log('Notification permissions denied');
          }
        } catch (error) {
          console.error('Error requesting notification permissions:', error);
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
