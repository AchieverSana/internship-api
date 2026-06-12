const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, getProducts);             // Any logged-in user
router.get('/:id', protect, getProduct);           // Any logged-in user
router.post('/', protect, createProduct);          // Any logged-in user
router.put('/:id', protect, updateProduct);        // Any logged-in user
router.delete('/:id', protect, adminOnly, deleteProduct); // Admin only

module.exports = router;
