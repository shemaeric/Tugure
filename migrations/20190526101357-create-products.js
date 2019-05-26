
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    title: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    author: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    info: {
      type: Sequelize.TEXT
    },
    inCart: {
      type: Sequelize.BOOLEAN
    },
    count: {
      type: Sequelize.INTEGER
    },
    total: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('products')
};
