import express from 'express';
const router = express.Router();
import { subscribe, getMySubscription, getAllSubscriptions } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/roleMiddleware.js';
import { validate, subscriptionSchema } from '../middleware/validator.js';

router.post('/create-subscription', protect, validate(subscriptionSchema), subscribe);
router.get('/user-subscription', protect, getMySubscription);
router.get('/all-subscriptions', protect, admin, getAllSubscriptions);

export default router;
