const { conn } = require('../server/database/connection');

async function agregar(req, res) {
    try {

        const pool = await conn;

        const { nombre, descripcion, enlace, fecha } = req.body;

        await pool.request()
                  .input('Operacion', 1)
                  .input('Nombre', nombre)
                  .input('Descripcion', descripcion)
                  .input('Enlace', enlace)
                  .input('Fecha', fecha)  
                  .input('UsuariosId', req.usuario)
                  .execute('sp_agregar_evento')
                  
        return res.status(200).send({mensaje:'El evento ha sido agregado.'});          

    } catch(e) {

        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`});

    }
}

async function actualizar(req, res) {
    try {

        const pool = await conn;

        const id = req.params.id;

        const { nombre, descripcion, enlace, fecha } = req.body;

        await pool.request()
                  .input('Operacion', 2)
                  .input('Nombre', nombre)
                  .input('Descripcion', descripcion)
                  .input('Enlace', enlace)
                  .input('Fecha', fecha)  
                  .input('UsuariosId', req.usuario)
                  .input('Id', id)
                  .execute('sp_agregar_evento')
                  
        return res.status(200).send({mensaje:'El evento ha sido actualizado.'});          

    } catch(e) {

        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`});

    }
}

async function listar(req, res) {

    try {

        const pool = await conn;

        const result = await pool.request()
                  .input('Operacion', 3)
                  .execute('sp_agregar_evento')
                  
        return res.status(200).send({eventos: result.recordset});

    } catch(e) {

        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`});

    }

}

async function activar(req, res) {
    try {

        const id = req.params.id;

        const pool = await conn;

        const request = await pool.query`SELECT Activo FROM EVENTOS where Id = ${id}`;

        request.recordset[0].Activo == 1 ? pool.request()
                                            .input('Activo', 0)
                                            .input('Operacion', 4)
                                            .input('Id', id)
                                            .execute('sp_agregar_evento') 
                                            
                                           :

                                           pool.request()
                                               .input('Activo', 1)
                                               .input('Operacion', 4)
                                               .input('Id', id)
                                               .execute('sp_agregar_evento')

        return res.status(200).send({mensaje: request.recordset[0].Activo == 1 ? `El evento ha sido desactivado.` : `El evento ha sido activado.`})
    } catch(e) {

        return res.status(500).send({mensaje:`Ha sucedido esto => ${e}`});

    }
}

module.exports = {
    agregar,
    actualizar,
    activar,
    listar
}