import * as adminService from './admin.service.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await adminService.loginAdmin(email, password);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export const getSubmissions = async (req, res) => {
    try {
        const submissions = await adminService.getAllSubmissions();
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getApprovedSubmissions = async (req, res) => {
    try {
        const submissions = await adminService.getApprovedSubmissions();
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const approveUser = async (req, res) => {
    try {
        const { id } = req.params;
        const approvedUser = await adminService.approveUser(id);
        res.status(200).json({ success: true, message: 'User approved successfully', data: approvedUser });
    } catch (error) {
        if (error.message === 'User not found in waitlist' || error.message === 'User already approved') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
