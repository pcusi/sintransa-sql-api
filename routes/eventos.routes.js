
const express = require('express');
const router = express.Router();
const _eveCntrl = require('../controllers/eventos');
const auth = require('../middlewares/auth');

//[Controlador Eventos]
router.post('/eventos/agregar', auth.obtenerToken, _eveCntrl.agregar);
router.put('/eventos/actualizar/:id', auth.obtenerToken, _eveCntrl.actualizar);
router.get('/eventos/listar', auth.obtenerToken, _eveCntrl.listar);
router.put('/eventos/activar/:id', auth.obtenerToken, _eveCntrl.activar);

module.exports = router;