import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Essential Information
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    link: String,
    locationType: { type: String, enum: ['Remote', 'Hybrid', 'In-Person (On-site)'] },
    interestScore: { type: Number, min: 1, max: 5 }, // 5 = dream job
    applicationScore: { type: Number, min: 1, max: 5 }, // 5 = very good application submitted
    notes: String, // For "Actionable items"

    // Application Tracking
    stage: {
        type: String,
        enum: ['Tagged (Not Yet)', 'Applying', 'Interviewing', 'Offer', 'Accepted', 'Withdrawn', 'Rejected', 'Ghosting'],
        default: 'Tagged (Not Yet)'
    },
    applyDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, default: Date.now },

    // Strategic Analysis Features
    compensation: {
        base: Number,
        bonus: Number,
        currency: { type: String, default: 'USD' },
        benefits: { type: String, default: "HMO" },
        notes: { type: String, default: "Needing visa sponsorship" },
    },

    //Tracking Timeline
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);