import express from 'express';
const router = express.Router();
import { getPlans } from '../controllers/planController.js';

router.get('/get-plans', getPlans);

export default router;
