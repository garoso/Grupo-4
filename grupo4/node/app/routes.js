const express = require('express');
const router = express.Router();

// Importar controladores
const ProductController = require('./controllers/ProductController');
const UserController = require('../app/controllers/UserController');

// Products
router.post('/create', ProductController.create);
router.get('/getByName/:name', ProductController.showByKeyWord);
router.get('productos/:id', ProductController.showById);
router.patch('productos/:id', ProductController.update);
router.delete('productos/:id', ProductController.delete);
// Users
router.post('/addUser', UserController.create);
router.post('/editClient', UserController.edit);

module.exports = router;
