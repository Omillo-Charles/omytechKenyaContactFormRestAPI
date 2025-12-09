import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',

    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/contact_form_db'
    },

    smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    },

    email: {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO
    },

    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
};
