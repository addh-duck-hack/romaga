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

router.get('/promotion', async (req, res) => {
  try {
    const { target } = req.query;

    if (!target || typeof target !== 'string' || !target.trim()) {
      return sendError(res, 400, 'MOVIL_PROMOTION_TARGET_REQUIRED', 'El parámetro "target" es requerido.');
    }

    const promotionData = await Movil.findOne({ key: 'promotion', target: target.trim() }).lean();
    if (!promotionData) {
      return sendError(
        res,
        404,
        'MOVIL_PROMOTION_NOT_FOUND',
        'No se pudo encontrar la promoción solicitada, favor de intentar más tarde'
      );
    }

    return res.json({
      status: 'success',
      data: promotionData.data,
    });
  } catch (error) {
    console.error('Error obteniendo móvil promotion:', error);
    return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Error interno al obtener datos de la promoción móvil.');
  }
});

module.exports = router;
