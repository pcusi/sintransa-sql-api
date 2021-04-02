const { conn } = require('../server/database/connection');
const moment = require('moment');

async function agregar(req, res) {
    try {

        const { nombres, apellidos, dni, telefono, cargo, area } = req.body;

        const pool = await conn;

        if (!req.usuario) {

            return res.status(401).send({mensaje:'El usuario no tiene permisos suficientes.'});

        } else {

            await pool.request()
            .input('Operacion', 1)
            .input('Nombres', nombres)
            .input('Dni', dni)
            .input('Apellidos', apellidos)
            .input('Cargo', cargo)
            .input('Area', area)
            .input('Telefono', telefono)
            .execute("sp_agregar_afiliado")
            
            return res.status(200).send({mensaje:'El afiliado ha sido agregado'});

        }

    } catch (e) {
    
        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`})

    }
}

async function actualizar(req, res) {
    try {

        const id = req.params.id;

        const { nombres, apellidos, dni, telefono, cargo, area } = req.body;

        const pool = await conn;

        await pool.request()
        .input('Id', id)
        .input('Operacion', 2)
        .input('Nombres', nombres)
        .input('Apellidos', apellidos)
        .input('Dni', dni)
        .input('Telefono', telefono)
        .input('Cargo', cargo)
        .input('Area', area)
        .execute("sp_agregar_afiliado")

        return res.status(200).send({mensaje:'El afiliado ha sido actualizado'});

    } catch (e) {
    
        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`})

    }
}

async function listar(req, res) {
    try {

        const pool = await conn;

        const resultado = await pool.request()
                                    .input('Operacion', 3)
                                    .execute("sp_agregar_afiliado")

        return res.status(200).send({ afiliados: resultado.recordset });

    } catch (e) {
    
        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`})

    }
}

module.exports = {
    agregar,
    actualizar,
    listar
}