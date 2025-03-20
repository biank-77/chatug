import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
};

export default errorMiddleware;