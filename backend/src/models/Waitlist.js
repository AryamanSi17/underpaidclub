import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            'Please use a valid email address'
        ]
    },
    linkedin: {
        type: String,
        required: [true, 'Please add a LinkedIn URL'],
        trim: true,
        match: [
            /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
            'Please use a valid LinkedIn Profile URL'
        ]
    },
    message: {
        type: String,
        maxlength: [500, 'Message cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Waitlist', waitlistSchema);
