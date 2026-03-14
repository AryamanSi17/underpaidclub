import mongoose from 'mongoose';

const approvedUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    linkedin: {
        type: String,
        required: [true, 'Please add a LinkedIn URL']
    },
    message: {
        type: String
    },
    approvedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ApprovedUser', approvedUserSchema);
