import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import React, { useState } from 'react';

const AppWrapper = () => {
  const [title, setNotificationTitle] = useState('Title');
  const [body, setNotificationBody] = useState('Body');

  // Handle background messages
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('MESSAGE HANDLED IN BACKGROUND');
    console.log(remoteMessage.notification?.title);
    console.log(remoteMessage.notification?.body);
    // Do something with the data received
    const remoteTitle = remoteMessage.notification?.title ?? 'Title';
    const remoteBody = remoteMessage.notification?.body ?? 'Body';
    setNotificationTitle(remoteTitle);
    setNotificationBody(remoteBody);
  });

  return (
    <App
      title={title} // Pass the 'title' state as a prop to App component
      setNotificationTitle={setNotificationTitle} // Pass the 'setNotificationTitle' function as a prop to App component
      body={body} // Pass the 'body' state as a prop to App component
      setNotificationBody={setNotificationBody} // Pass the 'setNotificationBody' function as a prop to App component
    />
  );
};

// Register the AppWrapper component instead of the App component
AppRegistry.registerComponent(appName, () => AppWrapper);
