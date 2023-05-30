# Start from the official Go image
FROM golang:1.20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download the Go dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN go build -o app

# Start a new stage
FROM alpine:latest

# Install the necessary system packages
RUN apk --no-cache add ca-certificates

# Set the working directory in the container
WORKDIR /app

# Copy the built Go binary from the previous stage
COPY --from=build /app/app .

# Copy the service account key JSON file
COPY serviceAccountKey.json .

# Expose the port that the microservice listens on
EXPOSE 8080

# Run the Go application
CMD ["./app"]
