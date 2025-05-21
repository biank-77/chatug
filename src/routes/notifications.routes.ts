import { Router } from 'express';
import { getNotifications, saveNotification } from '../controllers/notifications.controller';
const router = Router();

router.get('/', getNotifications);
router.post('/', saveNotification);

export default router;