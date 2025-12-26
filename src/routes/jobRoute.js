import express from "express";

const router = express.Router();

/**
 * @openapi
 * /api/jobs:
 * post:
 * summary: Create a new job application
 * tags: [Jobs]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * companyName:
 * type: string
 * role:
 * type: string
 * applicationScore:
 * type: integer
 * minimum: 1
 * maximum: 5
 * responses:
 * 201:
 * description: Job created successfully
 */
router.post('/', createJob);