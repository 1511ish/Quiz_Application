const User = require('../models/user');
const Admin = require('../models/admin'); 
const Quiz = require('../models/quiz'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {

    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    console.log(admin);

    if (!admin) {
        return res.status(401).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(isMatch);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    
    const token = jwt.sign({ email: admin.email }, process.env.SECRET_KEY);
    console.log("token: ", token);
    return res.status(200).json({ success: true, token: token });
};

exports.addQuiz = async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, correctOption } = req.body;

        if (!question || !optionA || !optionB || !optionC || !optionD || !correctOption) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await Quiz.create({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctOption
        });

        res.status(201).json({
            "success": true,
            "message": "Quiz saved successfully."
        });
    } catch (err) {
        console.error('Error adding quiz:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'emailId', 'attemptCount', 'score']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
};

exports.resetUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Reset attempt count and delete quiz results if necessary
        user.attemptCount = 0;
        user.score = 0;
        await user.save();

        res.json({ message: 'User attempts reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to reset user' });
    }
}