const { Conexiones, Usuarios } = require('../models/index');
const Sequelize = require('sequelize');

module.exports = {
    async create(req, res) {
        console.log('req', req);

        try {
            var response = ''
            var response_role = ''
            response = await Conexiones.findAll({
                where: { email: req.body.email }
            });

            if (response.length === 0) {
                let userCreated = await Conexiones.create(
                    {
                        firstName: req.body.name,
                        lastName: req.body.lastname,
                        email: req.body.email
                    }
                );
                res.json(userCreated);
                return;
            }
            console.log('El usuario ya existe.', response[0].dataValues);

            response_role = await Usuarios.findAll({
                where: { email: req.body.email }
            });

            if (response_role.length === 0) {
                res.json({user: response[0].dataValues, role: null});
                return;
            }

            res.json({user: response[0].dataValues, role: response_role[0].dataValues.role});           

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Ha ocurrido un error.'});
        }
    },

    async update(req, res) {
        console.log('req', req.body);

        var response = ''
        response = await Usuarios.findAll({
            where: { email: req.body.email }
        });

        if (response.length === 0) {
            Usuarios.create({
                nombre: req.body.name,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                role: req.body.role
            }).then(user => {
                res.json(user);
            });
        } else {
            Usuarios.update({
                role: req.body.role
            }, {
                where: {
                    email: req.body.email
                }
            }).then(result => {
                res.json(result);
            });
        }        
    }
}