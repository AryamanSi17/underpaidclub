import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'uNdErEsTiMaTe_SeCrEt');
            
            if (decoded.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Not authorized as an admin' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};
