
# Real-Time Notifications App

This is a real-time notifications application built using React (Vite), Node.js (Express), and Socket.IO. Users can send and receive live notifications, providing a seamless communication experience.




## Tech Stack

### Frontend
- React (Vite)
- Socket.IO-client
- Material UI (MUI)
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO

---
## Installation and Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/pallavibandarkar/Real-Time-Notification.git
cd Real-Time-Notification
```
### 2. Start the Backend
```bash
cd BACKEND
npm install
node app.js
```
### 3. Start the Frontend
```bash
cd FRONTEND
npm install
npm run dev
```
## Socket Events

- `send_notification`: Client - Sends message data to the server.
- `receive_notification`: Server - Broadcasts the message to all connected clients.
- `success_notification`: Server - Sends confirmation to the message sender.
- `error_notification`: Server - Sends validation failure to the sender.

## Usage
- Open your browser and navigate to http://localhost:5173 to access the application.
- Enter a message in the input field and click "Send" to send a notification.
- Notifications will appear in real-time as they are sent.

## Features

- Real-time notifications using Socket.IO
- Live feedback on success and errors
- Input validation to prevent empty messages
- Clean UI built with Material UI (MUI)
## Screenshots

![App Screenshot]((./screenshots/img.png))

