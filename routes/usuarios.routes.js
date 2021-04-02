const express = require('express');
const router = express.Router();
const _usuCntrl = require('../controllers/usuarios');

//[Controlador Usuario]
router.post('/usuarios/agregar', _usuCntrl.agregar);
router.post('/usuarios/acceder', _usuCntrl.acceder);
router.put('/usuarios/actualizar/:id', _usuCntrl.actualizar);

module.exports = router;