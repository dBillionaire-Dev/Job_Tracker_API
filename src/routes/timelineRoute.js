import express from 'express';
import { createTimeline, getTimelinesByJob, getTimelineById, updateTimeline, deleteTimeline } from '../controllers/timelineController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Create timeline for a job
router.post('/:id', createTimeline);

// Get all timelines for a job
router.get('/:id', getTimelinesByJob);

// Single timeline operations
router.get('/id', getTimelineById);
router.put('/:id', updateTimeline);
router.delete('/:id', deleteTimeline);

export default router;
