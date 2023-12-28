
# Express Application with Mongoose, TypeScript, Zod, Error Handling.

This is an Express application where you can create courses, categories, and reviews And can get data by filtering. The user has to register and log in to access data. Also, user can change his password. (Can't enter the previous 2 old passwords)

## Live-Link 

https://user-auth-practice.vercel.app/


## End-Points:

- /api/auth/register(POST) [register by username, email, password, role]
- /api/auth/login(POST) [login by username and password]
- /api/auth/change-password(POST) [login by username and password]
- /api/course(POST) [Create a course]
- /api/courses(GET) [Get all courses] [?page=2, ?limit=10, ?sortBy=price, ?language=English etc]
- /api/courses/:courseId(PUT) [Can update a course]
- /api/categories(POST) [Create a category]
- /api/categories(GET) [Get all categories]
- /api/reviews(POST) [Create a review]
- /api/courses/:courseId/reviews(GET) [Get a course with the reviews]
- /api/course/best(GET) [Get the best course depending on rating and reviews]


## Credentials:

   # User Login:
      * Username : nahid
      * password : 12345678
   # Admin Login:
      * Username : zahid
      * Password : 123456789


## Prerequisites

Ensure you have the following installed before running the application:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure the MongoDB server is running)

## Installation

1. Clone the repository:

2. Navigate to the project directory:

   ```bash
   cd your-express-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and specify the required environment variables:

   ```env
   PORT=5000
   DB_URL=your_mongodb_uri
   SALTROUND = 16 (example)
   JWT_ACCESS_SEC = Password (example)
   ```

## Running the Application

To run the Express application in development mode:

```bash
npm run dev
```

The server will start at `http://localhost:5000` by default.

## Available Scripts

- `npm run lint:fix`: Fix errors
- `npm run lint`: Find the errors if any.
- `npm run build`: For build


This README.md file provides instructions for installation, running the application, available scripts, project structure, contributing guidelines, and licensing information. Adjust it according to your project's specific setup and requirements.
