# Omytech Kenya Contact Form REST API

A robust Node.js REST API built with Express.js for handling contact form submissions. Features MongoDB integration, email notifications via Nodemailer, comprehensive validation, rate limiting, and security middleware.

## Architecture

This API follows a modular architecture with clear separation of concerns:

- **Controllers**: Business logic and request handling
- **Models**: MongoDB schema definitions using Mongoose
- **Routes**: API endpoint definitions and middleware integration
- **Middleware**: Custom validation, rate limiting, CORS, and error handling
- **Utils**: Reusable utilities including email service
- **Config**: Environment configuration management

## Features

- Contact form submission with validation
- MongoDB data persistence
- Email notifications for new submissions
- Rate limiting to prevent spam
- CORS configuration for frontend integration
- Comprehensive error handling
- Security headers with Helmet
- Request logging with Morgan
- ES6 modules support

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Email Service**: Nodemailer
- **Security**: Helmet, CORS, Express Rate Limit
- **Validation**: Custom middleware
- **Logging**: Morgan

## API Endpoints

### Contact Form Endpoints

| Method | Endpoint | Description | Middleware |
|--------|----------|-------------|------------|
| POST | `/api/contact/submit` | Submit contact form | Rate limiting, Validation |
| GET | `/api/contact/` | Get all contacts | Rate limiting |
| GET | `/api/contact/:id` | Get contact by ID | Rate limiting |
| PATCH | `/api/contact/:id/status` | Update contact status | Rate limiting |
| DELETE | `/api/contact/:id` | Delete contact | Rate limiting |

### Request/Response Examples

#### Submit Contact Form
```http
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254700000000",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a web development project."
}
```

#### Response
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254700000000",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a web development project.",
    "status": "new",
    "submittedAt": "2023-09-06T10:30:00.000Z",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- SMTP email service credentials

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd omytechKenyaContactFormRestAPI
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3001
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/contact_form_db
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient@gmail.com

CORS_ORIGIN=http://localhost:3000

JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
```

5. Start the development server
```bash
npm run dev
```

6. Start the production server
```bash
npm start
```

## Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/contact_form_db` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Use SSL/TLS | `false` |
| `SMTP_USER` | SMTP username | `user@gmail.com` |
| `SMTP_PASSWORD` | SMTP password | `app-password` |
| `EMAIL_FROM` | Sender email address | `noreply@company.com` |
| `EMAIL_TO` | Recipient email address | `admin@company.com` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |

## Database Schema

### Contact Model

```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (optional),
  subject: String (required),
  message: String (required),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  submittedAt: Date (default: Date.now),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Security Features

### Rate Limiting
- Contact form submissions: 5 requests per 15 minutes
- General API requests: 100 requests per 15 minutes

### Validation
- Required field validation
- Email format validation
- Message length validation (minimum 10 characters)
- Input sanitization and trimming

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Request size limits

## Error Handling

The API implements comprehensive error handling:

- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- MongoDB connection errors
- Email sending errors

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Development

### Project Structure
```
omytechKenyaContactFormRestAPI/
├── config/
│   └── env.js              # Environment configuration
├── controllers/
│   └── contact.js          # Contact form controllers
├── database/
│   └── mongodb.js          # Database connection
├── middleware/
│   ├── cors.js             # CORS configuration
│   ├── errorHandler.js     # Error handling middleware
│   ├── rateLimiter.js      # Rate limiting middleware
│   └── validator.js        # Validation middleware
├── models/
│   └── contact.js          # Contact schema
├── routes/
│   └── contact.js          # API routes
├── utils/
│   └── nodemailer.js       # Email service utility
├── app.js                  # Application entry point
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Deployment

### Production Considerations

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Configure MongoDB Atlas for cloud deployment
6. Set up monitoring and logging

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, contact: omytechkenya@gmail.com
