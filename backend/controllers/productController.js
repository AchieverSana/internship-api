const Product = require('../models/Product');

// @desc  Get all products
// @route GET /api/v1/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Get single product
// @route GET /api/v1/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Create a product
// @route POST /api/v1/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: 'Name, description, price, and category are required' });
    }

    const product = await Product.create({
      name, description, price, category, stock,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Update a product
// @route PUT /api/v1/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Delete a product (Admin only)
// @route DELETE /api/v1/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
