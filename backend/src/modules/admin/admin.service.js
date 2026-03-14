import Waitlist from '../../models/Waitlist.js';
import ApprovedUser from '../../models/ApprovedUser.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (email, password) => {
    // Hardcoded credentials for now as requested
    const ADMIN_EMAIL = 'admin@tuc.in';
    const ADMIN_PASSWORD = 'admintuc@123';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'uNdErEsTiMaTe_SeCrEt', {
            expiresIn: '30d'
        });
        return { token };
    }
    
    throw new Error('Invalid email or password');
};

export const getAllSubmissions = async () => {
    return await Waitlist.find({}).sort({ createdAt: -1 });
};

export const getApprovedSubmissions = async () => {
    return await ApprovedUser.find({}).sort({ approvedAt: -1 });
};

export const approveUser = async (id) => {
    const waitlistUser = await Waitlist.findById(id);
    if (!waitlistUser) {
        throw new Error('User not found in waitlist');
    }

    const existingApproved = await ApprovedUser.findOne({ email: waitlistUser.email });
    if (existingApproved) {
        throw new Error('User already approved');
    }

    const approvedUser = await ApprovedUser.create({
        name: waitlistUser.name,
        email: waitlistUser.email,
        linkedin: waitlistUser.linkedin,
        message: waitlistUser.message
    });

    await Waitlist.findByIdAndDelete(id);

    return approvedUser;
};
