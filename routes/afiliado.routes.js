const express = require('express');
const router = express.Router();
const _afCntrl = require('../controllers/afiliados');
const auth = require('../middlewares/auth');

//[Controlador Afiliado]
router.get('/afiliados/listar', _afCntrl.listar);
router.post('/afiliados/agregar', _afCntrl.agregar);
router.post('/afiliados/agregar/token', auth.obtenerToken, _afCntrl.agregar);
router.put('/afiliados/actualizar/:id', _afCntrl.actualizar);

module.exports = router;