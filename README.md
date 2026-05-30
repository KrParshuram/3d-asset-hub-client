# 3D Asset Hub

A full-stack 3D asset management platform that enables users to upload, manage, visualize, and share interactive 3D models. Built using React, Three.js, Node.js, MongoDB, and AWS S3.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Dashboard Routes

### Model Management

* Upload GLB Models
* Delete Models
* Public / Private Visibility Control
* Personal Dashboard

### Interactive 3D Viewer

* Rotate Models
* Zoom In / Out
* Pan Controls
* Fullscreen Mode
* Camera State Persistence

### Public Gallery

* Browse Public Models
* View Public 3D Assets
* Responsive Gallery Layout

### Cloud Storage

* AWS S3 Integration
* Secure File Uploads
* File Deletion Support

### Statistics Dashboard

* Total Models
* Public Models
* Private Models
* Storage Metrics

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* React Three Fiber
* Drei
* Three.js

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Multer

### Cloud Services

* AWS S3
* AWS IAM

## Architecture

Frontend (React + Three.js)
--->
Backend (Node.js + Express)
--->
MongoDB Atlas
---->
AWS S3 (3D Asset Storage)

## Screenshots

### Public Gallery

(Add Screenshot)

### Dashboard

(Add Screenshot)

### 3D Viewer

(Add Screenshot)

### Login Page

(Add Screenshot)

## Demo Credentials

Use the following account to explore dashboard features:

Email: [demo@gmail.com](mailto:demo@gmail.com)

Password: demo12345

## Local Setup

### Clone Repository

git clone <repository-url>

### Backend

cd server

npm install

Create a .env file:

PORT=5000
MONGO_URI=
JWT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

Start server:

npm run dev

### Frontend

cd client

npm install

Create a .env file:

VITE_API_URL=http://localhost:5000/api

Start frontend:

npm run dev

## Future Improvements

* Thumbnail Generation
* Model Search & Filters
* Model Likes & Favorites
* Comments & Reviews
* User Profiles
* Model Versioning
* Drag & Drop Uploads
* AR/VR Support

## Deployment

Frontend: Vercel
    |
Backend: AWS EC2
    |
Database: MongoDB Atlas
    |
Storage: AWS S3
  
## Author

Parshuram Kumar

LinkedIn:
https://www.linkedin.com/in/krparshu/

GitHub:
https://github.com/KrParshuram
