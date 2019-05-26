import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import models from '../models';

const { users } = models;

/**
 * @description User Controller class
 */
class Users {
  /**
   * Adds two numbers together.
   * @param {Object} req .
   * @param {Object} res The User Object.
   * @returns {Object} created user data
   */
  static async createUserLocal(req, res) {
    const { email, username, password: hash } = req.body;

    try {
      const userCreate = await users.create({
        email: email.trim(),
        username: username.trim(),
        hash
      });
      return res.status(201).json({
        status: 201,
        message: 'user created',
        user: {
          email: userCreate.email,
          username: userCreate.username
        }
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.errors[0].message
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns the user Object
   */
  static async login(req, res) {
    // get email and password from the body
    const { email, password } = req.body;

    // find if the user is in the db
    const user = await users.findOne({ where: { email } });
    if (user.activated === 'pending') {
      return res.status(400).send({
        error: 'You account is not activated yet'
      });
    }
    if (user.activated === 'invalid') {
      return res.status(400).send({
        error: 'You account is not valid'
      });
    }
    const {
      salt, hash, id, role, username
    } = user;
    const hashInputPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    // check for the password after being hashed and one in db
    if (hash !== hashInputPassword) {
      return res.status(400).send({
        status: 400,
        error: 'The password you have provided is not valid'
      });
    }

    // after both of the password matches then generate a token
    if (hash === hashInputPassword) {
      const token = jwt.sign(
        {
          id,
          role,
          email,
          username
        },
        process.env.SECRET,
        { expiresIn: 3600 }
      );

      // return the response of the user logged in and also the token
      return res.status(200).json({
        status: 200,
        user: {
          email: user.email,
          token,
          username: user.username,
          image: user.image
        }
      });
    }
  }
}

export default Users;
