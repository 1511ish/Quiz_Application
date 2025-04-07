const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    optionA: {
        type: Sequelize.STRING,
        allowNull: false
    },
    optionB: {
        type: Sequelize.STRING,
        allowNull: false
    },
    optionC: {
        type: Sequelize.STRING,
        allowNull: false
    },
    optionD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correctOption: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Quiz;
