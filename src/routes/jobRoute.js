import express from "express";
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/jobs:
 *  get:
 *      summary: Get all jobs
 *  post:
 *      summary: Create a new job application
 *      tags: [Jobs]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      companyName:
 *                          type: string
 *                      role:
 *                          type: string
 *                      applicationScore:
 *                          type: integer
 *                          minimum: 1
 *                          maximum: 5
 *      responses:
 *          201:
 *              description: Job created successfully
 */

router.use(protect);

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;