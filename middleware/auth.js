const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const User = require('../models/user');
require('dotenv').config();

exports.authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const admin = await Admin.findOne({ where: { email: decoded.email } });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        req.email = admin.email;
        next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};


exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization'); 

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ where: { emailId: decoded.email } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.email = user.emailId;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
