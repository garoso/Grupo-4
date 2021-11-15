const {Ventas} = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    // CREATE /api/product/register
    create(req, res) {
        console.log('req', req.body);
        Ventas.create({
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),   
            total: req.body.cantidad*req.body.valor_producto,
            fecha: req.body.fecha,
            cantidad: req.body.cantidad,
            id_producto: req.body.id_producto,
            valor_producto: req.body.valor_producto,
            descripcion_producto: req.body.descripcion_producto,
            cedula_cliente: req.body.cedula_cliente,
            nombre_cliente: req.body.nombre_cliente,
            email_vendedor: req.body.email_vendedor,
            estado: 0
        }).then(product => {
            res.redirect("http://localhost:3000/ventas/register");
            return;
        }).catch(function(err) {
            console.log(err);
        });
    },

    // UPDATE /api/product/update
    update(req, res) {
        Ventas.update({             
            total: req.body.cantidad*req.body.valor_producto,
            fecha: req.body.fecha,
            cantidad: req.body.cantidad,
            cedula_cliente: req.body.cedula_cliente,
            nombre_cliente: req.body.nombre_cliente,
            email_vendedor: req.body.email_vendedor,
            estado: req.body.estado
        }, {
            where: {
                id: req.body.uuid
            }
        }).then(result => {
            res.redirect("http://localhost:3000/ventas/modify");
            return;
        }).catch(function(err) {
            console.log(err);
        });
    },

    getVentas(req, res) {
        Ventas.findAll()
        .then(result => {
            res.json({ventas: result});
        }).catch(function(err) {
            console.log(err);
        });
    },

    // DELETE /api/ventas/:id
    delete(req, res) {
        Ventas.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    }
}
