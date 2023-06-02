# Push Notifications Test App
This is a simple React Native application built to demonstrate the implementation of push notifications on Android. The app utilizes the @react-native-firebase/messaging library to handle push notifications.

## Prerequisites
Before running the app, make sure you have the following installed:

- Node.js
- React Native CLI
- Android SDK
- Android device or emulator

## Getting Started
Clone this repository:
```
git clone https://github.com/lucasvillalbaar/notification-service.git
```

Navigate to the project directory:
```
cd notification-service/mobile/AwesomeProject
```

Install the dependencies:
```
npm install
```

Connect your Android device or start an Android emulator.

Run the app:

```
npx react-native run-android
```

## How it Works
The app consists of two main files: index.js and App.tsx.

### index.js
This file is the entry point of the application. It registers the AppWrapper component as the root component using AppRegistry. The AppWrapper component wraps the actual App component and handles the state for the notification title and body.

### App.tsx
- This file contains the main App component, which is responsible for rendering the UI and handling push notifications. It uses the useState and useEffect hooks from React to manage the state and lifecycle of the component.

- The useEffect hook is used to handle foreground messages. It subscribes to the onMessage event of the messaging object and updates the notification title and body state when a message is received.

- Another useEffect hook is used to get the Firebase token and save it to the database. It retrieves the token using the getToken method of the messaging object and calls the saveTokenToDatabase function to save the token.

- The third useEffect hook is responsible for requesting notification permissions from the user. It uses the PermissionsAndroid API to request the necessary permissions and displays a prompt to the user.

- The saveTokenToDatabase function is a placeholder that should be replaced with the actual implementation to save the token into the database.

### Firebase setup
In the commit history, you will be able to see the changes I made to the AwesomeProject template project to configure Firebase.

Remember to copy the ```google-services.json``` file to the /android/app/ folder. For security reasons, that file is not included in this repository, but you can download it from the Firebase console.

# Conclusion
This app provides a starting point for implementing push notifications in a React Native app targeting Android devices. You can build upon this codebase and customize it according to your specific requirements.

For more information on React Native and push notifications, refer to the official documentation:

[React Native Firebase Messaging Documentation](https://rnfirebase.io/messaging/usage)
