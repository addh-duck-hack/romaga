const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { sendError } = require('../utils/httpResponses');

// GET /api/ds/products?category=cat_01
// Endpoint de prueba: regresa el listado de productos. Si se envía el
// query param "category" (id de categoría, ej. "cat_01"), filtra solo los
// productos de esa categoría; si no se envía, regresa todos los productos.
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category !== undefined) {
      const categoryId = typeof category === 'string' ? category.trim() : '';
      if (!categoryId) {
        return sendError(res, 400, 'PRODUCTS_CATEGORY_INVALID', 'El parámetro "category" no puede estar vacío.');
      }
      filter.category_id = categoryId;
    }

    const products = await Product.find(filter).sort({ category_id: 1, name: 1 }).lean();

    return res.json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    console.error('Error obteniendo listado de productos:', error);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Error interno al obtener el listado de productos.');
  }
});

module.exports = router;
