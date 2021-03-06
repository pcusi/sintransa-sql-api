const { conn } = require('../server/database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function agregar(req, res) {
    try {

        const pool = await conn;

        const { usuario, clave, idafiliado, rol } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(clave, salt);

        await pool.request()
                .input('Operacion', 1)
                .input('Usuario', usuario)
                .input('Clave', hash)
                .input('Rol', rol)
                .input('AfiliadosId', idafiliado)
                .execute("sp_agregar_usuario_afiliado");
        
        return res.status(200).send({mensaje:'El usuario ha sido creado'});

    } catch (e) {
        return res.status(500).send({mensaje:`Ha pasado algo => ${e}`})
    }
}

async function actualizar(req, res) {
    try {

        const pool = await conn;

        const id = req.params.id;

        const { usuario, clave, idafiliado } = req.body;

        const hash = await bcrypt.hash(clave, 10);

        await pool.request()
                .input('Operacion', 2)
                .input('Usuario', usuario)
                .input('Clave', hash)
                .input('AfiliadosId', idafiliado)
                .input('Id', id)
                .execute("sp_agregar_usuario_afiliado");
        
        return res.status(200).send({mensaje:'El usuario ha sido editado'});

    } catch (e) {
        return res.status(500).send({mensaje:`Ha pasado algo => ${e}`});
    }
}

async function acceder(req, res) {
    try {
        
        const pool = await conn;

        const { usuario, clave } = req.body;

        const result = await pool.query`SELECT Clave, Id, AfiliadosId FROM Usuarios where Usuario = ${usuario}`;

        if (result.recordset.length == 0) {

            return res.status(400).send({mensaje:'Este usuario no está registrado en la base de datos.'});
    
        } else {

            await generarToken(clave, result.recordset[0].Clave, result.recordset[0].Id, result.recordset[0].AfiliadosId, res);

        }
        
    } catch (e) {

        if (e.errorType == undefined) {
            return res.status(400).send({mensaje:`${e}`});
        }

        return res.status(500).send({mensaje:`Ha pasado algo => ${e}`});
    }
}

async function generarToken(clave, hash, id, afiId, res) {
    const verify = await bcrypt.compare(clave, hash);

    try {

        if (verify) {

            const pool = await conn;

            const result = await pool.request()
                                     .input('AfiliadosId', afiId)
                                     .input('Operacion', 4)
                                     .execute('sp_agregar_usuario_afiliado')

            let payload = { 
                sub: id
            };
    
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:process.env.TOKEN_EXPIRES});
    
            return res.status(200).send({token, afiliado: result.recordset});
    
        } else {
    
            return res.status(400).send({mensaje:'Las contraseñas no coinciden.'});
    
        }

    } catch (e) {

        return res.status(400).send({mensaje:`${e}`});

    }
}

module.exports = {
    agregar,
    actualizar,
    acceder
}