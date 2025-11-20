# 📦 Shipsy - Shipment Management System

> A modern Shipment Management System built to streamline shipment tracking, status monitoring, and reporting. Shipsy provides real-time visibility into shipments with a clean dashboard, interactive statistics, secure authentication, and full CRUD capabilities.

## 🌟 Live Demo

- **Frontend**: [https://shipsydev.vercel.app/](https://shipsydev.vercel.app/)
- **Backend API**: [https://shipsy-fouh.onrender.com/](https://shipsy-fouh.onrender.com/)
- **Postman Documentation**: [https://documenter.getpostman.com/view/32517231/2sB3BHkU9W](https://documenter.getpostman.com/view/32517231/2sB3BHkU9W)
## ✨ Features

- 🔐 **JWT-based Authentication** - Secure login/signup system
- 📊 **Interactive Dashboard** - Real-time statistics and shipment overview
- 📦 **Shipment CRUD** - Complete shipment lifecycle management
- 🔍 **Advanced Filtering** - Search, sort, and filter shipments
- 📄 **Pagination** - Efficient data loading with pagination
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔒 **Protected Routes** - Role-based access control
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **CORS**: Express CORS middleware

### DevOps & Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub

## 📋 Entity Schema

### Shipment Model
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Shipment title/description |
| `status` | Enum | ✅ | `NEW`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |
| `fragile` | Boolean | ✅ | Indicates if shipment is fragile |
| `weightKg` | Number | ✅ | Weight in kilograms |
| `distanceKm` | Number | ✅ | Distance in kilometers |
| `baseRate` | Number | ✅ | Base shipping rate |
| `cost` | Number | Auto | **Calculated**: `weightKg * baseRate + distanceKm * 0.5` |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

## 📁 Project Structure

```
shipsy/
├── apps/
│   ├── frontend/                 # React frontend application
│   │   ├── public/              # Static assets (logo, videos)
│   │   └── src/
│   │       ├── components/      # React components
│   │       │   ├── AllShipments.jsx
│   │       │   ├── MyShipments.jsx
│   │       │   ├── ShipmentTable.jsx
│   │       │   ├── CreateShipmentModal.jsx
│   │       │   ├── EditShipmentModal.jsx
│   │       │   ├── DeleteShipmentModal.jsx
│   │       │   ├── Dashboard.jsx
│   │       │   ├── Landing.jsx
│   │       │   ├── Pagination.jsx
│   │       │   └── ProtectedRoutes.jsx
│   │       ├── config/          # Configuration files
│   │       └── utils/           # Utility functions
│   │
│   └── backend/                 # Express backend application
│       ├── config/
│       │   └── db.js           # MongoDB connection
│       ├── middleware/
│       │   └── auth.js         # JWT authentication middleware
│       ├── models/
│       │   ├── User.js         # User schema
│       │   └── Shipment.js     # Shipment schema
│       ├── routes/
│       │   ├── Auth.js         # Authentication routes
│       │   └── shipment.js     # Shipment CRUD routes
│       └── index.js            # Server entry point
│
└── docs/                       # Documentation
    ├── architecture.md         # System architecture
    ├── commits.md             # Commit history
    └── ai-usage.md            # AI usage documentation
    └── Sipsy.postman_collection.json  # Postman API documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shipsy.git
cd shipsy
```

### 2. Backend Setup
```bash
cd apps/backend
npm install
```

Create `.env` file in `apps/backend/`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shipsy
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=3000
```

### 3. Frontend Setup
```bash
cd apps/frontend
npm install
```

Create `.env` file in `apps/frontend/`:
```env
VITE_SERVER_URL=http://localhost:3000
```

### 4. Run the Application

**Backend** (Terminal 1):
```bash
cd apps/backend
npm start
# Server runs on http://localhost:3000
```

**Frontend** (Terminal 2):
```bash
cd apps/frontend
npm run dev
# App runs on http://localhost:5173
```

## 📊 API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/` | GET | Home route | ❌ |
| `/auth/login` | POST | User login | ❌ |
| `/auth/signup` | POST | User registration | ❌ |
| `/auth/fetch` | GET | Get user data | ✅ |
| `/shipment/` | GET | Get all shipments | ✅ |
| `/shipment/my` | GET | Get user's shipments | ✅ |
| `/shipment/:id` | GET | Get specific shipment | ✅ |
| `/shipment/` | POST | Create new shipment | ✅ |
| `/shipment/:id` | PATCH | Update shipment | ✅ |
| `/shipment/:id` | DELETE | Delete shipment | ✅ |

## 🖼️ Screenshots

### Landing Page
![Landing Page]()

### Login
![Login/Signup](images/login.png)

### Shipment Dashboard
![Login/Signup](images/dashboard.png)

### My Shipment
![myshipment](images/myshipment.png)

### All Shipment
![allshipment](images/allshipment.png)

## 📖 Documentation

- 🏗️ **[System Architecture](docs/architecture.md)** - Detailed system design and data flow
- 📝 **[Commit History](docs/commits.md)** - Complete development timeline
- 🤖 **[AI Usage Documentation](docs/ai-usage.md)** - How AI assisted in development
- 📭 **[Postman API Documentation](docs/Sipsy.postman_collection.json)** - Postman Documentation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed
- Ensure all tests pass

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Frontend (.env)
```env
VITE_SERVER_URL=http://localhost:3000
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `VITE_SERVER_URL=https://your-backend-url.com`
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set all required environment variables
3. Deploy automatically on push to main branch

## 👨‍💻 Connect with Author

- GitHub: [@bhavyank89](https://github.com/bhavyank89)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/bhavyank89)

## 🙏 Acknowledgments

- Built as part of the Shipsy assignment
- AI assistance provided by Gemini CLI for development acceleration
- Icons and animations from Lucide React and Framer Motion
- Styling inspiration from modern dashboard designs

---

<div align="center">
  <p>⭐ Star this repository if it helped you!</p>
  <p>Built with ❤️ using React, Express.js, and MongoDB</p>
</div>
