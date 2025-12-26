// import Job from '../models/Job.js';
//
// export const jobAnalytics = async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//
//         const totalJobs = await Job.countDocuments({ user: userId });
//
//         const ghostingRate =
//             (await Job.countDocuments({ user: userId, stage: 'Ghosting' })) /
//             totalJobs;
//
//         const offersPerMonth = await Job.aggregate([
//             { $match: { user: userId, stage: 'Offer' } },
//             {
//                 $group: {
//                     _id: { $month: '$createdAt' },
//                     count: { $sum: 1 },
//                 },
//             },
//         ]);
//
//         res.json({
//             totalJobs,
//             ghostingRate: ghostingRate || 0,
//             offersPerMonth,
//         });
//     } catch (err) {
//         next(err);
//     }
// };
//
import Job from '../models/Job.js';

export const jobStats = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const stats = await Job.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: '$stage',
                    count: { $sum: 1 },
                },
            },
        ]);

        res.json(stats);
    } catch (err) {
        next(err);
    }
};

export const ghostingRate = async (req, res, next) => {
    try {
        const total = await Job.countDocuments({ user: req.user._id });
        const ghosted = await Job.countDocuments({
            user: req.user._id,
            stage: 'Ghosting',
        });

        res.json({
            ghostingRate: total ? (ghosted / total) * 100 : 0,
        });
    } catch (err) {
        next(err);
    }
};
