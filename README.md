# AthletixHub 

AthletixHub is a web application designed to manage sports events, participants, and user authentication. It provides comprehensive functionalities for creating, updating, and deleting events, managing participants, and handling secure user authentication with JWT.

## 🚀 Features

- User authentication with JSON Web Tokens (JWT)
- Full CRUD (Create, Read, Update, Delete) operations for sports events
- Participant management system
- Secure file uploads to AWS S3
- Robust backend architecture using NestJS

## 🛠️ Tech Stack

- **Backend Framework**: NestJS (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Testing**: 
  - Unit Testing: Jest
  - E2E Testing: Supertest

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- AWS Account with S3 access

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Echaftech23/AthletixHub .git
cd AthletixHub 
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in the `.env` file with your specific configuration:
   - Database connection URL
   - JWT secret and expiration
   - AWS S3 credentials
   - Other necessary environment-specific settings

### 4. Run the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Build
```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate and login user

### Events
- `GET /api/events`: Retrieve all events
- `POST /api/events`: Create a new event
- `GET /api/events/:id`: Fetch a specific event
- `PUT /api/events/:id`: Update an existing event
- `DELETE /api/events/:id`: Remove an event

### Participants
- `GET /api/participants`: List all participants
- `POST /api/participants`: Add a new participant
- `GET /api/participants/:id`: Get participant details
- `PUT /api/participants/:id`: Update participant information
- `DELETE /api/participants/:id`: Remove a participant

### File Uploads
- `POST /api/uploads`: Upload files to AWS S3

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/AthletixHub ` |
| `PORT` | Application running port | `3001` |
| `JWT_SECRET` | Secret key for token generation | `your-secret-key` |
| `JWT_EXPIRATION_TIME` | Token validity duration | `3600s` |
| `AWS_ACCESS_KEY_ID` | AWS S3 access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS S3 secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS S3 region | `us-east-1` |
| `AWS_PUBLIC_BUCKET_NAME` | S3 bucket name | `AthletixHub -uploads` |
| `AWS_CLOUDFRONT_URL` | CloudFront distribution URL | `https://d111111abcdef8.cloudfront.net` |

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t AthletixHub -back .
```

### Run Docker Container
```bash
docker run -d -p 3001:3001 --name AthletixHub -back-container \
  -e DATABASE_URL=your_database_url \
  -e JWT_SECRET=your_jwt_secret \
  AthletixHub -back
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### End-to-End Tests
```bash
npm run test:e2e
```

## 🚧 Future Roadmap

- [ ] Implement advanced user roles and permissions
- [ ] Add real-time event notifications
- [ ] Expand file upload support
- [ ] Improve test coverage
- [ ] Performance optimization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Specify your project's license here (e.g., MIT, Apache 2.0)

---

**Happy Coding! 🚀**
