import Timeline from '../models/Timeline.js';
import Job from '../models/Job.js';

/**
 * @desc    Create timeline entry for a job
 * @route   POST /api/timelines/:jobId
 * @access  Private
 */
export const createTimeline = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Ensure job exists and belongs to user
        const job = await Job.findOne({ _id: jobId, user: req.user.id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const timeline = await Timeline.create({
            jobId,
            ...req.body,
        });

        res.status(201).json(timeline);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all timelines for a job
 * @route   GET /api/timelines/:jobId
 * @access  Private
 */
export const getTimelinesByJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const timelines = await Timeline.find({ jobId }).sort({
            interviewDate: 1,
        });

        res.status(200).json(timelines);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single timeline
 * @route   GET /api/timelines/single/:id
 * @access  Private
 */
export const getTimelineById = async (req, res, next) => {
    try {
        const timeline = await Timeline.findById(req.params.id);

        if (!timeline) {
            return res.status(404).json({ message: 'Timeline not found' });
        }

        res.status(200).json(timeline);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update timeline
 * @route   PUT /api/timelines/:id
 * @access  Private
 */
export const updateTimeline = async (req, res, next) => {
    try {
        const timeline = await Timeline.findById(req.params.id);

        if (!timeline) {
            return res.status(404).json({ message: 'Timeline not found' });
        }

        const updatedTimeline = await Timeline.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedTimeline);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete timeline
 * @route   DELETE /api/timelines/:id
 * @access  Private
 */
export const deleteTimeline = async (req, res, next) => {
    try {
        const timeline = await Timeline.findById(req.params.id);

        if (!timeline) {
            return res.status(404).json({ message: 'Timeline not found' });
        }

        await timeline.deleteOne();

        res.status(200).json({ message: 'Timeline deleted successfully' });
    } catch (error) {
        next(error);
    }
};
