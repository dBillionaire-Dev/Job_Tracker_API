import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
        jobId: {type: String, default: null},
        jobDescription: {type: String, required: true},
        team: {type: String, required: true},
        recruiter: {type: String, required: true},
        interviewDate: {type: Date, default: Date.now},
        interviewer: [{
            name: {type: String, required: true},
            role: {type: String, default: "HR"},
            email: {type: String},
            linkedIn: {type: String}
        }],
        platform: {
            type: String,
            required: true,
            enum: ['In-person', 'Zoom', 'Meet', 'Teams', 'Other'],
            default: 'In-person'
        },
        otherTimeline: {type: String, default: null}, //Text Field for Technical Interview Date, Final Interview Date, Offer Date, Decision Deadline
        resume: {type: String, required: true},
        coverLetter: {type: String},
        portfolio: {type: String},
        createdAt: {type: Date, default: Date.now},
}, { timestamps: true }
);

export default mongoose.model("Timeline", timelineSchema);