This project is a backend service for a basic social media application, built to understand core backend concepts such as authentication, REST APIs, and real-time communication.

Currently, the project supports:

User authentication using JWT

Creating and reading posts

Real-time broadcast chat using Socket.IO

The project is designed to be used by both:

React.js web frontend

React Native  mobile frontend.

Tech Stack:

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Tokens)

Socket.IO.

Authentication
Description:

Authentication is implemented using JWT to secure API endpoints.

Flow

User logs in with email and password

Server validates credentials

JWT token is generated

Client sends token in Authorization header.

Posts Module (Create Only)
Description:

Authenticated users can create posts.

Behavior:

Post is associated with the logged-in user

Post is stored in MongoDB.

Chat Module (Broadcast Chat)
Description:

Implements real-time broadcast messaging using Socket.IO.

Features

Messages are sent to all connected users

No private or one-to-one chat.