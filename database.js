const promise = require('bluebird');
const sqlite = require('sqlite');
const dbCon = sqlite.open('app.db', { promise });

const getProducts = async () => {
  try {
    const db = await dbCon;
    const products = await db.all('SELECT name, description, price, id FROM products');
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

const getProduct = async (id) => {
  try {
    const sqlQuery = 'SELECT name, description, price, id FROM products where id = ?';
    const db = await dbCon;
    return await db.get(sqlQuery, id);
  } catch (error) {
    throw new Error(error);
  }
};

const saveProduct = async (body) => {
  try {
    const sqlQuery = 'INSERT INTO products(name, description, price) VALUES (?,?,?)';
    const db = await dbCon;
    return await db.run(sqlQuery, body.name, body.description, body.price);
  } catch (error) {
    throw new Error(error);
  }
};

const saveUser = async (body) => {
  try {
    const sqlQuery = 'INSERT INTO users (email, firstname, lastname, password) VALUES (?,?,?,?)';
    const db = await dbCon;
    return await db.run(sqlQuery, body.email, body.firstname, body.lastname, body.password);
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (body) => {
  try {
    const sqlQuery = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
    const db = await dbCon;
    return await db.run(sqlQuery, body.name, body.description, body.price, body.id);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const sqlQuery = 'DELETE FROM products WHERE id = ?';
    const db = await dbCon;
    return await db.run(sqlQuery, id);
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async () => {
  try {
    const db = await dbCon;
    const users = await db.all('SELECT email, firstname, lastname, password, id FROM users');
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (id) => {
  try {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    const db = await dbCon;
    return await db.get(sqlQuery, id);
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (email) => {
  try {
    const sqlQuery = 'SELECT email, firstname, lastname, password, id FROM users WHERE email = ?';
    const db = await dbCon;
    return await db.get(sqlQuery, email);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct,
  getUsers: getUsers,
  getUser: getUser,
  saveProduct: saveProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  saveUser: saveUser,
  loginUser: loginUser,
};
