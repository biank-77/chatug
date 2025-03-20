import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user){
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};