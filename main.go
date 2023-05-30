package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"google.golang.org/api/option"
)

// Notification represents the structure of the push notification.
type Notification struct {
	UserFirebaseToken string `json:"user_firebase_token"`
	Title             string `json:"title"`
	Body              string `json:"body"`
}

func main() {
	// Initialize Firebase app
	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("Failed to initialize Firebase app: %v", err)
	}

	// Initialize Firebase messaging client
	client, err := app.Messaging(context.Background())
	if err != nil {
		log.Fatalf("Failed to initialize Firebase messaging client: %v", err)
	}

	// Define the HTTP endpoint for sending push notifications
	http.HandleFunc("/send", func(w http.ResponseWriter, r *http.Request) {
		// Parse the request body into a Notification struct
		var notification Notification
		if err := json.NewDecoder(r.Body).Decode(&notification); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Create a new message with the notification data
		message := &messaging.Message{
			Token: notification.UserFirebaseToken,
			Notification: &messaging.Notification{
				Title: notification.Title,
				Body:  notification.Body,
			},
		}

		// Send the message
		response, err := client.Send(context.Background(), message)
		if err != nil {
			log.Printf("Failed to send message: %v", err)
			http.Error(w, "Failed to send push notification", http.StatusInternalServerError)
			return
		}

		// Print the message ID upon successful sending
		log.Printf("Successfully sent message: %v", response)
		fmt.Fprint(w, "Push notification sent successfully")
	})

	// Start the HTTP server
	log.Fatal(http.ListenAndServe(":8080", nil))
}
