import cron from 'node-cron';
import Job from '../models/JobApplication.js';
import { sendEmail } from '../utils/emailService.js';

cron.schedule('0 9 * * *', async () => {
    console.log('Running follow-up job...');

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const jobs = await Job.find({
        stage: { $in: ['Applying', 'Interviewing'] },
        updatedAt: { $lte: sevenDaysAgo },
        'followUp.enabled': true,
    }).populate('user');

    for (const job of jobs) {
        await sendEmail({
            to: job.user.email,
            subject: `Follow up: ${job.companyName}`,
            text: `Reminder to follow up on your ${job.role} application at ${job.companyName}.`,
        });

        job.followUp.lastFollowUpSent = new Date();
        await job.save();
    }
});
