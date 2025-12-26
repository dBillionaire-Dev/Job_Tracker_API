// import express from 'express';
// import Job from '../models/JobApplication.js';
//
// const job = async (req, res, next) => {
//     try {
//         const job = await Job.findById(req.params.jobId);
//         if (!job) {
//             return res.status(404).send('Job not found');
//         }
//         res.status(200).json(job);
//     } catch (e) {
//         next(e);
//         return;
//     }
// }