const express = require('express');
const path = require('path');

const router = express.Router();

const userController = require('../controllers/user');
const adminAuthentication = require('../middleware/auth');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'register.html'));
});

router.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'result.html'));
});

router.get('/quiz-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'quiz.html'));
});


router.post('/register', userController.register);

router.post('/quiz/submit', adminAuthentication.authenticateUser, userController.submitQuiz);

router.get('/quiz', adminAuthentication.authenticateUser, userController.getQuiz);

module.exports = router;