//TEMPORARY JOB MODEL
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Essential Information
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    link: String,
    locationType: { type: String, enum: ['Remote', 'Hybrid', 'In-Person'] },
    applicationScore: { type: Number, min: 1, max: 5 }, // 5 = dream job

    // Application Tracking
    stage: {
        type: String,
        enum: ['Tagged', 'Applying', 'Interviewing', 'Offer', 'Accepted', 'Withdrawn', 'No Go', 'Ghosting'],
        default: 'Applying'
    },
    applyDate: { type: Date, default: Date.now },

    // Strategic Analysis Features
    salary: {
        base: Number,
        bonus: Number,
        currency: { type: String, default: 'USD' }
    },
    contacts: [{
        name: String,
        role: String,
        email: String
    }],
    notes: String // For "Actionable items"
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);