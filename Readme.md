# React Workflow Project

You can access this webapp [here](https://reactflow-assignment-frontend.vercel.app/)

This React Workflow Project combines a React frontend with a Node.js and Express backend. It's crafted to handle file management and process workflows, with JWT for authentication and MongoDB for data persistence.

## Technologies Used

### Backend

- **Node.js and Express**: Core server technologies.
- **Multer**: Handles `multipart/form-data` for file uploads.
- **Axios**: Makes HTTP requests to external services like requestcatcher.
- **Nodemon**: Monitors changes and restarts the server automatically.
- **MongoDB**: Stores user and workflow data.
- **JWT (JSON Web Tokens)**: Secures information transmission.
- **CSV Parser**: Converts CSV files into usable data.

### Frontend

- **React**: Library for building user interfaces.
- **TankStackQuery**: Assumed typo, potentially a state management tool like React Query.
- **React Toastify**: Adds notifications to the application.
- **React Dropzone**: Implements drag-and-drop file uploads.
- **React Router**: Manages navigation based on the URL.
- **React Flow**: Creates node-based editors.
- **UUID**: Generates unique identifiers.
- **Axios**: Performs HTTP requests.

## How It Works

1. **Registration**: Start on the registration page to enter credentials.
2. **Authentication**: Post-registration, redirect to the home page.
3. **Workflow Creation**: Create and manage workflows from the home page.
4. **Workflow Triggering**: Trigger workflows as required.
