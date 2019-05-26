
// the product model
export default (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true
      },
      author: {
        type: DataTypes.UUID
      },
      info: {
        type: DataTypes.TEXT
      },
      inCart: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );

  products.associate = (models) => {
    products.belongsTo(models.users, { foreignKey: 'author' });
  };

  return products;
};
