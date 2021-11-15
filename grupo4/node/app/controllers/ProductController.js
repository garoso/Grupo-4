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
            res.redirect("http://localhost:3000/productos/register");
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
            res.redirect("http://localhost:3000/productos/modify");
            return;
        }).catch(function(err) {
            console.log(err);
        });
    },

    getProductos(req, res) {
        Products.findAll()
        .then(result => {
            res.json({products: result});
        }).catch(function(err) {
            console.log(err);
        });
    },

    // INDEX /api/productos
    showByKeyWord(req, res) {
        const name = req.params.name;
        Products.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        }).then(productos => {
            res.json(productos);
        });
    },

    // READ /api/productos/:id
    showById(req, res) {
        Products.findByPk(req.params.id).then(productos => {
            res.json(productos);
        });
    },

    // DELETE /api/productos/:id
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
