const express = require('express');
const router = express.Router();

// Importar controladores
const ProductController = require('./controllers/ProductController');
const UserController = require('../app/controllers/UserController');
const VentaController = require('../app/controllers/VentaController');

// Products
router.post('/product/register', ProductController.create);
router.post('/product/update', ProductController.update);
router.get('/productos/get', ProductController.getProductos);
// Ventas
router.post('/ventas/register', VentaController.create);
router.post('/ventas/update', VentaController.update);
router.get('/ventas/get', VentaController.getVentas);
// Users
router.post('/addUser', UserController.create);
router.post('/editClient', UserController.edit);
router.get('/pendientes', UserController.getUsers);
router.get('/users/vendedores', UserController.getVendedores);

module.exports = router;
