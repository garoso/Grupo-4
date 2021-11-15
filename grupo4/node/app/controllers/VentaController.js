const {Products} = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    // CREATE /api/product/register
    create(req, res) {
        console.log('req', req.body);
        Products.create({
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),     
            name: req.body.nombre,
            descripcion: req.body.descripcion,
            valor: req.body.valor,
            stock: req.body.stock
        }).then(product => {
            res.redirect("http://localhost:3000/ventas/register");
            return;
        }).catch(function(err) {
            console.log(err);
        });
    },

    // UPDATE /api/product/update
    update(req, res) {
        Products.update({          
            name: req.body.nombre,
            descripcion: req.body.descripcion,
            valor: req.body.valor,
            stock: req.body.stock
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
        Products.findAll()
        .then(result => {
            res.json({products: result});
        }).catch(function(err) {
            console.log(err);
        });
    },

    // DELETE /api/ventas/:id
    delete(req, res) {
        Products.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    }
}
