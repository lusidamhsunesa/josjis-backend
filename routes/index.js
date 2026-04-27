const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const tableController = require('../controllers/tableController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');

const authController = require('../controllers/authController');

// Route Auth
router.post('/login', authController.login);

// --- ROUTES ---
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

router.patch('/products/:id/stock', productController.toggleStock);

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/tables', tableController.getTables);
router.post('/tables', tableController.createTable);

// --- ROUTES ORDERS ---
router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);
// Perhatikan URL di bawah ini: ada kata "/status" di ujungnya
router.patch('/orders/:id/status', orderController.updateOrderStatus); 

// Pastikan tulisannya begini:
const paymentController = require('../controllers/paymentController');
router.post('/payments', paymentController.createPayment);

module.exports = router;