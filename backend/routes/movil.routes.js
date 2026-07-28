const express = require('express');
const router = express.Router();
const Movil = require('../models/movil.model');
const { sendError } = require('../utils/httpResponses');

router.get('/home', async (req, res) => {
  try {
    const homeData = await Movil.findOne({ key: 'home' }).lean();
    if (!homeData) {
      return sendError(res, 404, 'MOVIL_HOME_NOT_FOUND', 'No se encontró contenido para la pantalla móvil de inicio.');
    }

    return res.json({
      status: 'success',
      data: homeData.data,
    });
  } catch (error) {
    console.error('Error obteniendo móvil home:', error);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Error interno al obtener datos de la pantalla móvil de inicio.');
  }
});

module.exports = router;
