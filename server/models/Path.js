const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Path = sequelize.define('Path', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  is_public: { type: DataTypes.BOOLEAN, defaultValue: true },
});

User.hasMany(Path, { foreignKey: 'creator_id' });
Path.belongsTo(User, { foreignKey: 'creator_id' });

module.exports = Path;
