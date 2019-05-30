export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },

    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING
    },
    activated: {
      type: Sequelize.STRING,
      defaultValue: 'activated'
    },
    salt: {
      type: Sequelize.STRING(1024)
    },
    hash: {
      type: Sequelize.STRING(1024)
    },
    provider: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }
  })),
  down: queryInterface => queryInterface.dropTable('users')
};
