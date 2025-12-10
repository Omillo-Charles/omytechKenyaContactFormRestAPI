import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './database/mongodb.js';
import contactRoutes from './routes/contact.js';
import corsMiddleware from './middleware/cors.js';
import errorHandler from './middleware/errorHandler.js';
import config from './config/env.js';

const app = express();

connectDB();

app.use(helmet());
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'OmyTech Kenya Contact Form API',
        version: '1.0.0'
    });
});

app.use('/api/contact', contactRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

const PORT = config.port;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
    });
}

export default app;
