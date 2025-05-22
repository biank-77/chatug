import cors from 'cors';
import express, { Application } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import notificationRoutes from './routes/notifications.routes';
import userRoutes from './routes/user.routes';

const app: Application = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/notifications', notificationRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

export default app;