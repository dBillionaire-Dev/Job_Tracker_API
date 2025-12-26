import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
        internalContact: [{
            name: {type: String, required: true},
            role: {type: String, default: "HR"},
            email: {type: String},
            linkedIn: {type: String},
            notes: {type: String} //Connected through LinkedIn, Senior Dev etc.
        }],
}, { timestamps: true }
);

export default mongoose.model('Contact', ContactSchema);