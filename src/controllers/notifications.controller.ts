import { NextFunction, Request, Response } from 'express';
import * as NotificationServices from '../services/notifications.service';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationServices.getNotifications()
        res.json(notifications);
    } catch (error) {
        next(error);
    }
};


export const saveNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationData = req.body;
        const notification = await NotificationServices.saveNotification(notificationData)
        res.json(notification);
    } catch (error) {
        next(error);
    }
};