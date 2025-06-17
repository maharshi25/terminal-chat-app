# Terminal Chat App

-----

## 🚀 Overview

Welcome to the **Terminal Chat App**\! This project is a real-time, command-line interface (CLI) chat application. It lets users sign up, sign in, create public chat rooms, join existing rooms, and chat with others directly from their terminal. It's a great example of a full-stack application using **Node.js** for both the client and server, with real-time communication powered by **WebSockets**.

-----

## ✨ Features

  * **User Authentication:** Sign up for new accounts and sign in with existing credentials.
  * **Chat Room Management:** Create new public rooms or join existing ones.
  * **Real-time Messaging:** Send and receive messages instantly within chat rooms.
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

To run this project, you'll need both the **client** (this repository) and a compatible **server**.

### Prerequisites

  * **Node.js**: Ensure you have Node.js (v14+) and npm installed.
  * **MongoDB Instance**: A running MongoDB database (local or cloud like [MongoDB Atlas Free Tier](https://www.google.com/search?q=https://www.mongodb.com/cloud/atlas/lp/try4)).

### 1\. Set Up the Server (Hypothetical/Companion Project)

You'll need a separate server project that includes the backend logic.

1.  **Clone/Set up your server repository.**
2.  **Install server dependencies** (e.g., `npm install`).
3.  **Configure a `.env` file** in your server's root with:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=YOUR_SUPER_STRONG_RANDOM_SECRET_KEY
    ```
4.  **Start the server** (e.g., `npm start` or `npm run dev`).

### 2\. Set Up the Client (This Repository)

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/maharshi25/terminal-chat-app.git
    cd terminal-chat-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in this project's root:
    ```env
    BASE_URL=http://localhost:3000 # Must match your server's address and port
    ```
4.  **Run the Client Application:**
    ```bash
    npm start
    ```
