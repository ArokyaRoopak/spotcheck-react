# My App

## Overview

This project is a web application built using React for the frontend and Node.js with Express for the backend. It utilizes TypeScript for type safety and MongoDB for data storage. The application is designed to provide a user-friendly interface for managing purchases and user authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (for local development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/my-app.git
   cd my-app
   ```

2. Install the backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install the frontend dependencies:

   ```bash
   cd webapp
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory and add the following variables:


### Running the Application

1. **Start the MongoDB server** (if not already running):

   Make sure you have MongoDB installed and running on your local machine. You can start it using:

   ```bash
   mongod
   ```

2. **Start the backend server**:

   Open a terminal, navigate to the `server` directory, and run:

   ```bash
   cd server
   npm run dev
   ```

   This will start the backend server in development mode using nodemon, which automatically restarts the server on file changes.

3. **Start the frontend application**:

   Open another terminal, navigate to the `webapp` directory, and run:

   ```bash
   cd webapp
   npm start
   ```

   This will start the frontend application in development mode. 

4. **Access the application**:

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
