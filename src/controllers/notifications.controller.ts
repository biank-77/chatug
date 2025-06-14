import { NextFunction, Request, Response } from 'express';
import * as NotificationServices from '../services/notifications.service';
import { NotificationType } from '../types/notifications';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const type = req.query.type as NotificationType
        const notifications = await NotificationServices.getNotifications(type)
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