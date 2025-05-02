✨ Description
This is a basic backend setup using Node.js and MySQL, providing essential user authentication and settings management functionality. The API includes features such as user registration, login, password reset, OTP verification, and settings retrieval, all secured with JWT authentication.

The project uses key technologies like:
🔄 nodemon for real-time server reload during development.
📧 nodemailer to send OTP emails for password reset functionality.
🔒 bcrypt to securely hash user passwords.
📜 swagger-ui-express to provide interactive API documentation.


⚙️ Setup & Configuration
📥 Clone the Repository
Clone the repository to your local machine:

bash
Copy
git clone https://github.com/yourusername/nodejs+mysql-basic-backend-setup.git
cd nodejs+mysql-basic-backend-setup

🐱 Install Dependencies
Install all the required dependencies using npm:
npm install

🔑 Set Up Environment Variables
Create a .env file in the root directory and add the following configuration:
JWT_SECRET=your_jwt_secret_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password

🚀 Running the Project Locally
To start the backend server with nodemon (for automatic restarts during development), use the following command:

bash
Copy
npm start
The server will automatically reload on code changes!

📂 Project Structure
bash
Copy
nodejs+mysql-basic-backend-setup/
│
├── config/                    # Database and environment configuration
│   ├── database.js            # DB connection setup
│   └── db.config.js           # Configuration for DB
│
├── controller/                # Controller logic for API routes
│   ├── authController.js      # Logic for user registration, login, etc.
│   ├── settingsController.js  # Logic for settings management
│   └── userController.js      # Logic for user-related operations
│
├── middleware/                # Middleware for authentication
│   └── verifyToken.js         # Middleware for JWT token verification
│
├── node_modules/              # Dependencies
│
├── routes/                    # API route definitions
│   ├── authRoutes.js          # Routes for user authentication
│   ├── settingsRoutes.js      # Routes for user settings
│   └── userRoutes.js          # Routes for user operations
│
├── utils/                     # Utility functions
│   └── email.js               # Utility for sending OTP emails
│
├── .env                       # Environment variables
├── index.js                   # Main entry point for the backend API
└── package.json               # Project dependencies and scripts
└── swagger.json               # Swagger API documentation definition

💻 Swagger UI Documentation
You can view and test the API directly using Swagger UI by visiting:
http://localhost:3000/api-docs
