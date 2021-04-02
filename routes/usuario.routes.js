const express = require('express');
const router = express.Router();
const _usuCntrl = require('../controllers/usuarios');

//[Controlador Usuario]
router.post('/usuario/agregar', _usuCntrl.agregar);
router.post('/usuario/acceder', _usuCntrl.acceder);
router.put('/usuario/actualizar/:id', _usuCntrl.actualizar);

module.exports = router;