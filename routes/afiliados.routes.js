const express = require('express');
const router = express.Router();
const _afCntrl = require('../controllers/afiliados');
const auth = require('../middlewares/auth');

//[Controlador Afiliado]
router.get('/afiliados/listar', _afCntrl.listar);
router.post('/afiliados/agregar', auth.obtenerToken, _afCntrl.agregar);
router.put('/afiliados/actualizar/:id', auth.obtenerToken, _afCntrl.actualizar);
router.put('/afiliados/activar/:id', auth.obtenerToken, _afCntrl.activar);

module.exports = router;