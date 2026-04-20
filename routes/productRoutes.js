const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

// Route: GET /api/products
router.get('/', getProducts);

// Route: POST /api/products
router.post('/', createProduct);

module.exports = router;