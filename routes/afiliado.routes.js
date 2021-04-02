const express = require('express');
const router = express.Router();
const _afCntrl = require('../controllers/afiliados');

//[Controlador Afiliado]
router.get('/afiliado/listar', _afCntrl.listar);
router.post('/afiliado/agregar', _afCntrl.agregar);
router.put('/afiliado/actualizar/:id', _afCntrl.actualizar);

module.exports = router;