# Interactive Learning Path Builder
- [Video link(drive)](https://drive.google.com/file/d/1N-Xz4xw2OCyxGD_ArwL4w2AHTDeWv3zz/view?usp=sharing)


## Description

The Interactive Learning Path Builder is a web application designed to allow users to create, share, and track their progress in learning paths. The platform supports different user roles, including Learners, Creators, and Admins, with features for creating and following learning paths, tracking progress, and earning certificates.

## Features

- **User Authentication**: Secure sign-up/login system with JWT-based authentication.
- **Learning Path Creation**: Creators can create learning paths by adding resources such as videos, articles, and quizzes.
- **Progress Tracking**: Learners can track their progress through a timeline or progress bar.
- **PDF Certificate Generation**: Certificates are generated and available for download when a learner completes a path.
- **Public & Private Paths**: Users can create public or private paths and share them with others.
- **Responsive UI/UX**: A user-friendly and responsive interface for seamless interaction.

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
git clone https://github.com/aswini/Interactive-Learning-Path-Builder.git
cd Interactive-Learning-Path-Builder
```
### 2. Set up the Backend:

   - Navigate to the backend folder:
        cd server
   - Install backend dependencies:
        npm install
   - Set up environment variables:
        DB_HOST=your-database-host
        DB_USER=your-database-user
        DB_PASSWORD=your-database-password
        DB_NAME=your-database-name
        JWT_SECRET=your-jwt-secret-key
   - Run the backend server:
        node server.js

### 3. Set up the Frontend
    Navigate to the client folder:
        cd client
    Install frontend dependencies:
        npm install
    Run the frontend server:
        npm start
The application should now be running at http://localhost:3000.


### 4. Deployment
 - **You can deploy the project to services like Netlify or Vercel for the frontend and Heroku for the backend. Follow the documentation provided by each service for detailed deployment steps.**

- **Frontend (Deployed on Netlify):**
  - [Live Demo (Netlify)](https://ilp-builder.netlify.app/)

- **Backend (Deployed on Render):**
  - [API (Render)](https://ilp-backend.onrender.com/)

 - ** Deployment on Netlify (Frontend):
    Build the frontend:
        npm run build
    Deploy the client/build folder on Netlify.


## License
 - This project is not licensed and is for personal use only. Please do not distribute or use this code in any form.

## Contributing
 - Feel free to fork the project and submit pull requests. If you want to report a bug or request a feature, open an issue in the repository.