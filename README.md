# Push Notification Service
This is a microservice built in Go that allows you to send push notifications via Firebase Cloud Messaging (FCM). It provides an HTTP endpoint to send push notifications with a title and body.

## Prerequisites
Before running the microservice, make sure you have the following prerequisites:

Go 1.20 or higher installed on your system
A Firebase project with FCM enabled
A Firebase service account key JSON file

## Getting Started
### Clone the repository:
```
git clone git@github.com:lucasvillalbaar/notification-service.git
```

### Navigate to the project directory:

```
cd notification-service
```

Place your ```serviceAccountKey.json``` file in the project directory.

### Firebase service account key JSON file Example

```
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account-email@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project-id.iam.gserviceaccount.com"
}

```

## Build and run the Docker image:

```
docker build -t notification-service .
docker run -p 8080:8080 -v $(pwd)/serviceAccountKey.json:/app/serviceAccountKey.json notification-service
```

⚠️ Make sure to replace ```$(pwd)/serviceAccountKey.json``` with the actual path to your ```serviceAccountKey.json``` file.

The microservice will be running on http://localhost:8080/send. You can send a POST request to this endpoint to send push notifications.

## Sending Push Notifications
To send a push notification, make a POST request to http://localhost:8080/send with the following JSON payload:

```
{
  "user_firebase_token": "dnuwJmafQme64wAevCp99r:APA91bGD7S8to_Q5UyFIbRITyD7Tt8jpK0Lcvv05VXXinbgzNzIlOlL7ZZqpPD1RtiTt_jcObO2f3mcDCi3S_g40VtDqeFtSDNIhrxrUlF4caP1p0Vlv8IxfMM9zjQzyxTPy3yysdskjh",
  "title": "Hello, I'm a title",
  "body": "I'm the body of the notification"
}
```

Ensure that you provide a valid Firebase token, title, and body in the request.

## Customization
You can customize the microservice according to your needs. Some possible customizations include:

- Adding authentication and authorization to the HTTP endpoint
- Implementing additional error handling and logging
- Enhancing the notification payload with additional data fields

***

I hope this helps! Let me know if you have any further questions.
