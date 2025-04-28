# Interactive Learning Path Builder
- [Video link(drive)](https://drive.google.com/file/d/1RazLDbbWUu0Ng259YEUPfyVlbkLxOj04/view?usp=sharing)


## Description

The Interactive Learning Path Builder is a web application designed to allow users to create, share, and track their progress in learning paths. The platform supports different user roles, including Learners, Creators, and Admins, with features for creating and following learning paths, tracking progress, and earning certificates.

## Features

- **User Authentication**: Secure sign-up/login system with JWT-based authentication for learners. After signing up, all users are logged in as Learners by default.    
- **Role Management**:Only Admins have the ability to change user roles, including upgrading a Learner to a Creator. Learners cannot modify their roles.
- **Learning Path Creation**: Creators and Admins can create learning paths by adding resources such as videos, articles, and quizzes.
- **Progress Tracking**: Learners can track their progress through a timeline or progress bar.
- **PDF Certificate Generation**: Certificates are generated and available for download when a learner completes a path.
- **Public & Private Paths**: Creators can create public or private paths.


## Tech Stack

- **Frontend**: React.js, React Router, Axios, and more.
- **Backend**: Node.js, Express, PostgreSQL.
- **Authentication**: JWT (JSON Web Tokens).
- **Database**: PostgreSQL for managing user data and learning paths.
- **PDF Generation**: PDFKit for generating certificates.

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Getting Started

#### 1. Clone the repository:

```bash
git clone https://github.com/aswini-14/Interactive-Learning-Path-Builder.git
cd Interactive-Learning-Path-Builder
```
### 2. Set up the Backend:

   - Navigate to the backend folder:
        ```bash
        cd server
        ```
   - Install backend dependencies:
        ```bash
        npm install
        ```
   - Set up environment variables:
        ```bash
        DB_HOST=localhost
        DB_USER=your-database-user
        DB_PASS=your-database-password
        DB_NAME=your-database-name
        JWT_SECRET=your-jwt-secret-key
        DATABASE_URL=postgresql://your_database_user:your_database_password@localhost:5432/your_database_name
        ```

   - Run the backend server:
        ```bash
        node server.js
        ```

### 3. Set up the Frontend
   - Navigate to the client folder:
        ```bash
        cd client
        ```
   - Install frontend dependencies:
        ```bash
        npm install
        ```
   - Set up environment variables:
        ```bash
        REACT_APP_API_URL=http://localhost:5000/api
        ```
   - Run the frontend server:
        ```bash
        npm start
        ```
The application should now be running at http://localhost:3000.

### 4. Running with Docker
    To run the application with Docker, use the following steps:
   - Set up environment variables:
        ```bash
        DB_HOST=db
        DB_USER=your-database-user
        DB_PASS=your-database-password
        DB_NAME=your-database-name
        JWT_SECRET=your-jwt-secret-key
        DATABASE_URL=postgresql://your_database_user:db@db:5432/your_database_name
        ```
    
   - Build the Docker images for both the frontend and backend:
        ```bash
        docker-compose build
        ```
   - Start the application with Docker:
        ```bash
        docker-compose up
        ```
   This will start both the frontend and backend services. Access the frontend at http://localhost:3000.


### 5. Deployment 

- **Frontend (Deployed on Netlify):**
  - [Live Demo (Netlify)](https://ilp-builder.netlify.app/)

- **Backend (Deployed on Render):**
  - [API (Render)](https://ilp-backend.onrender.com/)

 - **Deployment on Netlify (Frontend)**:
    - Build the frontend:
        ```bash
        npm run build
        ```
    Deploy the client/build folder on Netlify.
 - **Deployment on Render(Backend)**:
    - Set up a Render account and follow the deployment guide for Node.js applications.

## License
 - This project is not licensed and is for personal use only. 

## Contributing
 - "Feel free to reach out for feedback or suggestions on improvements."
