import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/users', userRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

export default app;