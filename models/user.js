const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attemptCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }

});

module.exports = User;
