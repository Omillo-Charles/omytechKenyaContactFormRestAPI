import cors from 'cors';
import config from '../config/env.js';

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            config.cors.origin,
            'https://omytech.co.ke',
            'https://www.omytech.co.ke'
        ];

        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

export default cors(corsOptions);
