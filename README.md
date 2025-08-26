# Cloud Storage Project

A modern file sharing and storage application built with React, Node.js, and Azure Blob Storage.

## Features

- File upload and download
- User authentication and authorization
- File sharing with short URLs
- QR code generation for files
- Guest file upload
- Real-time file preview
- Responsive design

## Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Azure Blob Storage
- JWT Authentication
- Multer for file uploads

## Deployment on Render

### Prerequisites
- Render account
- MongoDB database (MongoDB Atlas recommended)
- Azure Blob Storage account

### Environment Variables

You'll need to set up the following environment variables in your Render dashboard:

#### Backend Environment Variables:
- `NODE_ENV`: production
- `PORT`: 10000
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `BASE_URL`: https://your-backend-service-name.onrender.com
- `AZURE_STORAGE_CONNECTION_STRING`: Your Azure storage connection string
- `AZURE_CONTAINER_NAME`: Your Azure container name
- `EMAIL_USER`: Email for notifications (optional)
- `EMAIL_PASS`: Email password (optional)

#### Frontend Environment Variables:
- `VITE_API_URL`: https://your-backend-service-name.onrender.com/api

### Deployment Steps

1. **Fork or clone this repository**

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" and select "Blueprint"
   - Connect your GitHub repository

3. **Deploy using render.yaml**
   - Render will automatically detect the `render.yaml` file
   - It will create both backend and frontend services
   - Set up the environment variables as listed above

4. **Alternative Manual Deployment**

   **Backend Service:**
   - Create a new Web Service
   - Connect your repository
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm run start:prod`
   - Set environment variables

   **Frontend Service:**
   - Create a new Static Site
   - Connect your repository
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`
   - Set environment variables

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Cloud_Storage_project
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` file in the server directory
   - Add the required environment variables

4. **Run the application**
   ```bash
   # Start backend (from server directory)
   npm start

   # Start frontend (from client directory)
   npm run dev
   ```

## Project Structure

```
Cloud_Storage_project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── redux/         # Redux store and slices
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middlewares
│   │   └── config/        # Configuration files
│   └── package.json
└── render.yaml            # Render deployment configuration
```

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/files/upload` - File upload
- `GET /api/files` - Get user files
- `GET /api/files/:id` - Get specific file
- `DELETE /api/files/:id` - Delete file
- `GET /f/:shortCode` - Download file with short URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 