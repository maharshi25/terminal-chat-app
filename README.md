# Terminal Chat App

-----

## 🚀 Overview

Welcome to the **Terminal Chat App**\! This project is a real-time, command-line interface (CLI) chat application. It lets users sign up, sign in, create public chat rooms, join existing rooms, and chat with others directly from their terminal. It's a great example of a full-stack application using **Node.js** for both the client and server, with real-time communication powered by **WebSockets**.

-----

## ✨ Features

  * **User Authentication:** Sign up for new accounts and sign in with existing credentials.
  * **Chat Room Management:** Create new public rooms or join existing ones.
  * **Real-time Messaging:** Send and receive messages instantly within chat rooms.
  * **Message Rate Limiting:** Each authenticated user can send up to 5 messages per rolling 10-second window.
  * **Interactive CLI:** User-friendly menus and prompts, with colorful output for clarity.
  * **Persistent Data:** All user accounts, rooms, and messages are saved in a database.

-----

## 🛠️ Tech Stack

This app is built entirely with **JavaScript** and relies on a few key technologies:

### Client-Side (Terminal Application)

  * **Node.js**: The runtime environment.
  * **Axios**: For making HTTP requests to the server.
  * **Inquirer.js**: Powers the interactive command-line menus.
  * **Socket.IO Client**: Enables real-time chat functionality.
  * **Chalk**: Adds color to the terminal output.
  * **Dotenv**: Manages environment variables like the server's URL.

### Server-Side (Backend API & WebSocket Server - *Companion Project*)

  * **Node.js & Express.js**: The core server framework.
  * **Socket.IO**: Handles real-time WebSocket connections and message broadcasting.
  * **MongoDB & Mongoose**: The database and its ODM for data storage (users, rooms, messages).
  * **JSON Web Tokens (JWT)**: For secure user authentication.
  * **Bcrypt.js**: Used for secure password hashing.

-----

## 🚀 Getting Started

The repository contains both the server and the terminal client. Start the server first, then run the client in a second terminal.

### Prerequisites

  * **Node.js**: Ensure you have Node.js (v14+) and npm installed.
    * **MongoDB**: A running MongoDB instance.
    * **Redis**: A running Redis instance.

### 1\. Set Up and Run the Server

From the repository root:

```bash
cd server
npm install
```

Create `server/.env` with:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
REDIS_URL=redis://your-redis-host:6379
SECRET_KEY=YOUR_SUPER_STRONG_RANDOM_SECRET_KEY
```

Start the server:

```bash
npm start
```

### 2\. Set Up and Run the Client

Open a second terminal at the repository root:

```bash
cd client
npm install
```

Create `client/.env`:
```env
BASE_URL=http://localhost:8080
```

Run the client:

```bash
node commander.js start
```

For production, set `BASE_URL` to the public server URL and provide the server environment variables through the deployment platform's secret configuration. Do not commit either `.env` file.
