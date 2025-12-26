import Job from '../models/Job.js';

/**
 * @desc Create job
 * @route POST /api/jobs
 */
export const createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json(job);
    } catch (err) {
        next(err);
    }
};

/**
 * @desc Get jobs with filtering & pagination
 * @route GET /api/jobs
 */
export const getJobs = async (req, res, next) => {
    try {
        const { stage, interestScore, page = 1, limit = 10 } = req.query;

        const query = {
            user: req.user._id,
            isArchived: false,
        };

        if (stage) query.stage = stage;
        if (interestScore) query.interestScore = Number(interestScore);

        const jobs = await Job.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Job.countDocuments(query);

        res.json({
            data: jobs,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc Update job
 * @route PUT /api/jobs/:id
 */
export const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (err) {
        next(err);
    }
};

/**
 * @desc Soft delete job
 * @route DELETE /api/jobs/:id
 */
export const archiveJob = async (req, res, next) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { isArchived: true },
            { new: true }
        );

        res.json({ message: 'Job archived', job });
    } catch (err) {
        next(err);
    }
};
