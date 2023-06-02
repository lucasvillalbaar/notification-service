/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('MESSAGE HANDLED IN BACKGROUND');
    console.log(remoteMessage.notification?.title);
    console.log(remoteMessage.notification?.body);
    // Do something with the data received
  });

AppRegistry.registerComponent(appName, () => App);
