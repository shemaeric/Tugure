import models from '../models';

const { products } = models;

/**
 * @description products Controller class
 */
class Product {
  /**
   * @param {Object} req
   * @param {Object} res The User Object
   * @returns {Object}  Response object having message and status for liking article
   */
  static async createProduct(req, res) {
    const { body, user } = req;
    console.log(body);
    const {
      title, price, info
    } = body;
    try {
      const findProduct = await products.findOne({
        where: { author: user.id, title: body.title }
      });
      if (findProduct) {
        return res.status(400).send({
          status: res.statusCode,
          error: ' The Book already exists'
        });
      }
      const createProduct = await products.create({
        title, img: req.file ? req.file.url : null, price, info, author: user.id
      });
      return res.status(200).send({
        status: res.statusCode,
        book: createProduct
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: res.statusCode,
        error: ' Something went Wrong'
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res The User Object
   * @returns {Object}  Response object having message and status for liking article
   */
  static async getProduct(req, res) {
    const { bookId } = req.params;

    try {
      const findProduct = await products.findOne({ where: { id: bookId } });
      if (!findProduct) {
        return res.status(400).send({
          status: res.statusCode,
          error: " The Book doesn't exists"
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        book: findProduct
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: ' Something went Wrong'
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res The User Object
   * @returns {Object}  Response object having message and status for liking article
   */
  static async getProducts(req, res) {
    try {
      const findProducts = await products.findAll();
      if (!findProducts) {
        return res.status(400).send({
          status: res.statusCode,
          error: ' No book found'
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        book: findProducts
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: ' Something went Wrong'
      });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res The User Object
   * @returns {Object}  Response object having message and status for liking article
   */
  static async updateProduct(req, res) {
    const { bookId } = req.params;
    const { user, body } = req;
    try {
      const findProducts = await products.findOne({
        where: { id: bookId, author: user.id }
      });
      if (!findProducts) {
        return res.status(400).send({
          status: res.statusCode,
          error: ' The book is not found'
        });
      }

      const updateBook = await products.update(
        { ...body },
        {
          where: { id: bookId, author: user.id },
          returning: true
        }
      );
      const upBook = updateBook[1][0].get();
      return res.status(200).send({
        status: res.statusCode,
        book: upBook
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: ' Something went Wrong'
      });
    }
  }
}

export default Product;
