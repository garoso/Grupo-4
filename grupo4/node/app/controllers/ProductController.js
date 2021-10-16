const {Products} = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    // CREATEcl
    create(req, res) {
        console.log('req', req.body);
        Product.create(
            req.body
        ).then(product => {
            res.json(product);
        });
    },

    // INDEX /api/productos
    showByKeyWord(req, res) {
        const name = req.params.name;
        Product.findAll({
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
        Product.findByPk(req.params.id).then(productos => {
            res.json(productos);
        });
    },

    // UPDATE /api/productos/:id
    update(req, res) {
        Product.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    },

    // DELETE /api/productos/:id
    delete(req, res) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    }
}
