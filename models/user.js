// the user model

import crypto from 'crypto';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
        validate: {
          isEmail: true
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      activated: {
        type: DataTypes.STRING
      },
      salt: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      hash: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      provider: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: [['user', 'admin']]
        }
      }
    },
    {
      hooks: {
        // hash the password before creating a user
        beforeCreate(user) {
          if (user.hash) {
            user.salt = crypto.randomBytes(16).toString('hex');
            user.hash = crypto
              .pbkdf2Sync(user.hash, user.salt, 1000, 64, 'sha512')
              .toString('hex');
          }
        }
      }
    }
  );

  return User;
};
