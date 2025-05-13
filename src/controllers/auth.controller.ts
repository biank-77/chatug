import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import * as AuthServices from '../services/auth.service';

const secret = process.env.JWT_SECRET || 'super-secret-key';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const userInfo = await AuthServices.loginUser(email, password);
        if(!userInfo){
            res.status(404).json({error:"Not user found"})
        }
        else{
            const token = jwt.sign(userInfo, secret);
            res.json({token});
        }
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = await AuthServices.registerUser(req.body);
        if(!userInfo){
            res.status(400).json({error:"User not saved"})
        }
        else{
            res.json({userInfo});
        }
    } catch (error) {
        next(error);
    }
};