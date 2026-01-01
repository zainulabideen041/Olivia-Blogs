# Olivia Blogs

A full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). This application invites users to read, like, and comment on blogs, while offering a comprehensive dashboard for authors to create and manage their content.

## 🚀 Features

- **User Interface**: Modern, responsive design for reading blogs.
- **Interaction**: Users can like and comment on blog posts.
- **Author Dashboard**: dedicated area for authors to manage their posts.
- **CRUD Operations**: Complete Create, Read, Update, and Delete functionality for blogs.
- **Authentication**: Secure login and registration for users and authors.
- **Image Uploads**: Support for uploading blog cover images.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router, Axios, Bootstrap/React-Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## 📦 Installation

To get this project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or a MongoDB Atlas connection string.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/olivia-blogs.git
cd olivia-blogs
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
