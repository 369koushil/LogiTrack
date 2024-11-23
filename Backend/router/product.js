const express = require("express");
const app = express();
const Product = require('../controller/product');


// Add Product
app.post("/add", Product.addProduct);

// Get All Products
app.get("/get/:userId", Product.getAllProducts);

// Delete Selected Product Item
app.get("/delete/:id", Product.deleteSelectedProduct);

// Update Selected Product
app.post("/update", Product.updateSelectedProduct);

// Search Product
app.get("/search", Product.searchProduct);

// http://localhost:4000/api/Product/search?searchTerm=fa

module.exports = app;
