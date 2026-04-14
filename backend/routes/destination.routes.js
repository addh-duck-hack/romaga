const express = require("express");
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { sendError } = require("../utils/httpResponses");

// Endpoint para buscar destinos
router.get('/search', verifyToken, (req, res) => {
  const { search } = req.query;

  // Validar que el texto de búsqueda se reciba
  if (!search || search.trim() === '') {
    return sendError(res, 400, 'MISSING_SEARCH_TEXT', 'El texto de búsqueda es requerido');
  }

  // Aquí iría la lógica de búsqueda en la base de datos
  // Por ejemplo, buscar en un modelo de Destination
  // const results = await Destination.find({ name: { $regex: search, $options: 'i' } });

  // Placeholder: devolver el texto de búsqueda
  res.json({
    ok: true,
    message: 'Búsqueda realizada exitosamente',
    search: search.trim(),
    // results: results // cuando se implemente
  });
});

module.exports = router;