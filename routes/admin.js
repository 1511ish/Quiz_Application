const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin');
const adminAuthentication = require('../middleware/auth');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'admin-login.html'));
});

router.post('/login', adminController.adminLogin);

router.post('/add-quiz', adminAuthentication.authenticateAdmin, adminController.addQuiz);

router.get('/users', adminAuthentication.authenticateAdmin, adminController.getUsers);

router.patch('/reset-user/:userId', adminAuthentication.authenticateAdmin, adminController.resetUser);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'admin.html'));
});


module.exports = router;
