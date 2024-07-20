## Introduction

This project is built using the MERN stack, which integrates MongoDB, Express.js, React.js, and Node.js to create a comprehensive web application.

## ------------Frontend Application for User Signup and Authentication----------

This frontend application provides a multi-step user signup and authentication process. It includes features for image upload, Google OAuth, and QR code generation for profile access.

## Table of Contents

Features
Installation
Usage
Folder Structure
Technologies Used

1. Features

---

Interactive Image Component: Displays a rotating set of images with mouse movement effects.

OAuth Integration:
Allows users to sign in using Google OAuth.

Multi-Step Signup Form:
A multi-step form for user registration, including personal details, email, and password setup.

Image Upload:
Users can upload profile and cover photos.

QR Code Generation:
Generates a unique QR code for user profiles.

2. Installation

---

Clone the repository:
Install dependencies:
Configure Firebase:
Set up Firebase by creating a Firebase project and configuring your authentication and storage settings.
Add your Firebase configuration to the firebase.js file.
Usage

Start the development server:
Open your browser and navigate to http://localhost:3000 to view the application.

## Folder Structure

src/
├── assets/ # Static assets like images
├── components/ # React components
│ ├── OAuth.js # Google OAuth button component
│ ├── InteractiveImage.js # Interactive image moving component
│ ├── Step0.js # Initial signup step
│ ├── Step1.js # Personal details step
│ ├── Step2.js # Email and password step
│ ├── Step3.js # Phone number and additional details step
├── hooks/ # Custom hooks
│ └── useUserData.js # Custom hook for fetching user data
├── pages/ # Page components
│ ├── ConfirmQR.js # Page displaying QR code for profile
│ └── Login.js # Login page
│ └── Signup.js # Signup page
├── firebase.js # Firebase configuration
├── App.js # Main application component
└── index.js # Entry point

## Technologies Used :

React: JavaScript library for building user interfaces.
Firebase: Backend platform for authentication and storage.
React Router: For navigation and routing.
React Icons: For using icons in the application.
React QR Code: For generating QR codes.

## -----------------Backend for User Signup and Authentication--------

## Features :

User Signup:
Register new users with hashed passwords and store additional user information.

User Signin:
Authenticate users and generate a profile URL and QR code if not already generated.

Google Authentication:
Sign in users with Google and handle user data based on Google profile information.

User Data Retrieval:
Fetch user data based on user ID.

Firebase Authentication:
Verify Firebase ID tokens to secure API routes.

## Technologies Used

Node.js:
JavaScript runtime for server-side scripting.

Express.js:
Web framework for building the RESTful API.

MongoDB:
NoSQL database for storing user data.

Mongoose:
ODM library for MongoDB and Node.js.

Firebase:
Authentication service for secure sign-in options.

bcryptjs:
Library for hashing passwords

## Installation

Clone the repository
Install dependencies
Set up environment variables

Create a .env file in the root directory and add the following variables:

env
CONNECTION_STRING=<your-mongodb-connection-string>
PORT=<your-desired-port>

Additionally, place your Firebase service account JSON file in the root directory and name it serviceAccount.json.

Start the server
The server will start on the specified port, defaulting to port 3000.

## API Endpoints

Test API :
GET /test (testing)

1. User Signup : POST /api/signup
   Request Body:
   {
   "username": "string",
   "email": "string",
   "password": "string",
   "coverPhoto": "string",
   "profilePicture": "string",
   "gender": "string",
   "educationLevel": "string",
   "phoneNumber": "string"
   }

Response:
{
"user": {
"username": "string",
"email": "string",
"coverPhoto": "string",
"profilePicture": "string",
"gender": "string",
"educationLevel": "string",
"phoneNumber": "string"
}
}

2. User Signin : POST /api/signin

Headers:
Authorization: Bearer <firebase-id-token>

Response:
{
"success": true,
"user": {
"username": "string",
"email": "string",
"coverPhoto": "string",
"profilePicture": "string",
"gender": "string",
"educationLevel": "string",
"phoneNumber": "string",
"profileUrl": "string",
"qrCodeGenerated": true
}
}

3. Google Authentication POST /api/googleauth

Headers:
Authorization: Bearer <firebase-id-token>

Response:
{
"username": "string",
"email": "string",
"profilePicture": "string"
}

4. Get User Data GET /api/user/:\_id

Response:
{
"username": "string",
"email": "string",
"coverPhoto": "string",
"profilePicture": "string",
"gender": "string",
"educationLevel": "string",
"phoneNumber": "string",
"profileUrl": "string",
"qrCodeGenerated": true
}

## Middleware

Firebase Token Verification :
The verifyFirebaseToken middleware verifies Firebase ID tokens to ensure that API requests are authenticated.

## Error Handling :

The server includes error handling for internal server errors and sends appropriate responses with status codes and messages.
