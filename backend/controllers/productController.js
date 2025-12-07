import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image required" });
    }

    const product = await Product.create({
      vendor: req.user._id,
      name,
      description,
      price,
      stock,
      image: req.file.path
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.stock = req.body.stock ?? product.stock;

    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();
    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await product.deleteOne();
    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
