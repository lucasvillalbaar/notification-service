# Push Notification Service
This is a microservice built in Go that allows you to send push notifications via Firebase Cloud Messaging (FCM). It provides an HTTP endpoint to send push notifications with a title and body.

## Prerequisites
Before running the microservice, make sure you have the following prerequisites:

Go 1.16 or higher installed on your system
A Firebase project with FCM enabled
A Firebase service account key JSON file

## Getting Started
### Clone the repository:
```
git clone https://github.com/your-username/push-notification-service.git
```

### Navigate to the project directory:

```
cd push-notification-service
```

Place your serviceAccountKey.json file in the project directory.

## Build and run the Docker image:

```
docker build -t push-notification-service .
docker run -p 8080:8080 -v $(pwd)/serviceAccountKey.json:/app/serviceAccountKey.json push-notification-service
```

Make sure to replace ```$(pwd)/serviceAccountKey.json``` with the actual path to your ```serviceAccountKey.json``` file.

The microservice will be running on http://localhost:8080/send. You can send a POST request to this endpoint to send push notifications.

## Sending Push Notifications
To send a push notification, make a POST request to http://localhost:8080/send with the following JSON payload:

```
{
  "user_firebase_token": "3782yubeuidsknsdljslndlskdls",
  "title": "Hello, I'm a title",
  "body": "I'm the body of the notification"
}
```

Ensure that you provide a valid Firebase token, title, and body in the request.

I hope this helps! Let me know if you have any further questions.
