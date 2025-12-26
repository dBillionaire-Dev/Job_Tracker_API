import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { jobStats, ghostingRate } from '../controllers/analyticsController.js';

const router = express.Router();

router.use(protect);

router.get('/stats', authorize('admin'), jobStats);
router.get('/ghosting-rate', authorize('admin'), ghostingRate);

export default router;
