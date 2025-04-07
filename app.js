const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/database');

const User = require('./models/user');
const Quiz = require('./models/quiz');
const Admin = require('./models/admin');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Server started on port 3000'))
    })
    .catch(err => console.error('Error syncing DB:', err));
