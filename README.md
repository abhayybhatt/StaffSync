# StaffSync - Employee Management System

A modern, full-stack Employee Management System built with the MERN stack. Manage your employees efficiently with features like user CRUD operations, real-time search, pagination, and status tracking.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)

## 🌟 Features

- **User Management**: Create, read, update, and delete employee records
- **Real-time Search**: Search employees by name, email, phone, or status
- **Pagination**: Efficient data display with customizable page sizes (5, 10, 25, 50)
- **Status Tracking**: Track active and inactive employees
- **Dashboard Statistics**: View total users, active users, and inactive users at a glance
- **Modern UI**: Beautiful dark-themed interface built with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Clean and structured backend API
- **Data Validation**: Server-side validation for email uniqueness and required fields

## 🚀 Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **Lucide React** 0.562.0 - Beautiful icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.2.1 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 9.1.1 - MongoDB object modeling
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.3 - Environment variable management

## 📁 Project Structure

```bash
StaffSync/
├── client/ # Frontend React application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── api/ # API service functions
│ │ │ └── userApi.js
│ │ ├── components/ # React components
│ │ │ ├── SearchBar.jsx
│ │ │ ├── StatsCard.jsx
│ │ │ ├── UserModel.jsx
│ │ │ └── UserTable.jsx
│ │ ├── App.jsx # Main application component
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Global styles
│ ├── package.json
│ └── vite.config.js
│
└── server/ # Backend Express application
├── controllers/ # Request handlers
│ └── userController.js
├── models/ # Mongoose schemas
│ └── userModel.js
├── routes/ # API routes
│ └── userRoutes.js
├── app.js # Express app configuration
├── server.js # Server entry point
└── package.json
```

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
  ```bash
   git clone <your-repo-url>
   
   cd StaffSync
```
   
2. **Install server dependencies**
```bash
   cd server
   
   npm install
```
3. **Install client dependencies**
```bash
   cd ../client
   
   npm install
```
## ⚙️ Environment Variables

### Server (.env)

Create a `.env` file in the `server` directory:
```bash
PORT=5001
MONGO_URI=mongodb+srv://<username>:<DB_PASSWORD>@cluster.mongodb.net/?appName=Cluster0
DATABASE_PASSWORD=your_mongodb_password
CLIENT_URL=http://localhost:5173
```
**For Production (Render):**
```bash
PORT=5001
MONGO_URI=mongodb+srv://<username>:<DB_PASSWORD>@cluster.mongodb.net/?appName=Cluster0
DATABASE_PASSWORD=your_mongodb_password
CLIENT_URL=https://staff-sync-amber.vercel.app
```
### Client (.env)

Create a `.env` file in the `client` directory:

```bash
VITE_API_URL=http://localhost:5001/api/v1
```
**For Production (Vercel):**
```bash
VITE_API_URL=https://staffsync-server.onrender.com/api/v1 ## 🏃 Running the Application
```

### Development Mode

1. **Start the backend server**
```bash
   cd server
   npm run dev
```
  - Server will run on `http://localhost:5001`

2. **Start the frontend development server**
 ```bash
   cd client
   npm run dev
```
  - Frontend will run on `http://localhost:5173`

3. **Open your browser**
  - Navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend**
  ```bash
   cd client
   npm run build
```
2. **Preview the production build**
  ```bash
   npm run preview
```

## 📡 API Endpoints

Base URL: `/api/v1/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all users (with pagination) |
| GET | `/:id` | Get user by ID |
| GET | `/status` | Get user statistics (total, active, inactive) |
| GET | `/search/:query` | Search users by name, email, phone, or status |
| POST | `/` | Create a new user |
| PUT | `/:id` | Update a user |
| DELETE | `/:id` | Delete a user |

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Example Requests
```bash
// Get all users (paginated)
GET /api/v1/users?page=1&limit=5

// Search users
GET /api/v1/users/search/john?page=1&limit=10

// Create user
POST /api/v1/users
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "status": "Active"
}
```
## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your project on Vercel
3. Set the root directory to `client`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api/v1`
5. Deploy

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the root directory to `server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables:
   - `PORT` = `5001` (or let Render assign)
   - `MONGO_URI` = Your MongoDB connection string
   - `DATABASE_PASSWORD` = Your MongoDB password
   - `CLIENT_URL` = Your Vercel frontend URL
7. Deploy

### MongoDB Atlas Setup

1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
4. Get your connection string
5. Replace `<DB_PASSWORD>` in the connection string with your actual password

## 🎨 Features in Detail

### User Management
- Add new employees with name, email, phone, and status
- Edit existing employee information
- Delete employees with confirmation
- View all employees in a clean table format

### Search Functionality
- Real-time search across name, email, phone, and status fields
- Case-insensitive search
- Instant results as you type

### Pagination
- Navigate through pages easily
- Customizable items per page (5, 10, 25, 50)
- Shows current page and total pages
- Efficient data loading

### Dashboard Statistics
- Total Users count
- Active Users count
- Inactive Users count
- Real-time updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Abhay Bhatt

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the robust database solution
- Vercel and Render for hosting services

---

Made with ❤️ by Abhay