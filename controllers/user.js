const User = require('../models/user');
const Quiz = require('../models/quiz');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { name, email, location } = req.body;
        let user = await User.findOne({ where: { emailId: email } });

        if (!user) {
            user = await User.create({ name, emailId: email, location, attemptCount: 1 });
            const token = generateToken(user.emailId);
            return res.status(201).json({ message: 'Successfully registered new user', token });
        }

        if (user.attemptCount < 2) {
            user.attemptCount += 1;
            await user.save();
            const token = generateToken(user.emailId);
            return res.status(201).json({ message: 'Second attempt', token });
        }

        return res.status(403).send('You cannot take this quiz anymore.');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const questions = await Quiz.findAll({ limit: 10 });
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const userAnswers = req.body;
        const questions = await Quiz.findAll({ limit: 10 });

        let score = 0;
        questions.forEach((question, index) => {
            const correct = question.correctOption;
            const selectedValue = userAnswers[index];

            if (selectedValue && selectedValue === correct) {
                score++;
            }
        });

        const user = await User.findOne({ where: { emailId: req.email } });
        user.score = score;
        await user.save();

        res.status(200).json({ score });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to calculate score" });
    }
};

const generateToken = (email) => {
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    console.log("token: ", token);
    return token;
};














