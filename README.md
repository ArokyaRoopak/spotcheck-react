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

```
MONGO_URI=mongodb://localhost:27017/spotcheck
JWT_SECRET=your_jwt_secret
```

### User Credentials

You can use the following credentials to log in to the application:

- **Email**: `test@sp.com`
- **Password**: `123456`

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

### Seed 

To create sample purchases and users in the database, you can use the `seed.js` script. Follow these steps:

1. Navigate to the root of your project:

   ```bash
   cd webapp
   ```

2. Run the seed script:

   ```bash
   node seed.js
   ```

   This will generate 100 random purchase entries in the `purchases` collection and 1 user in the `users`  collection of your MongoDB database.

### Available Scripts

In the `webapp` directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the configuration (use with caution).

In the `server` directory, you can run:

- `npm run dev`: Starts the server in development mode with nodemon.
- `npm run build`: Compiles TypeScript files.
- `npm start`: Starts the server in production mode.

## Features

- User authentication with JWT
- CRUD operations for purchases
- Responsive design using Tailwind CSS
- Real-time data visualization with Recharts

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
