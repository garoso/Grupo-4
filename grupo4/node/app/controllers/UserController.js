const { Conexiones, Usuarios } = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async create(req, res) {
        console.log('req', req);

        try {
            var response = ''
            var response_role = ''
            response = await Conexiones.findAll({
                where: { email: req.body.email }
            });

            console.log(response);

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

    async edit(req, res) {
        console.log("EDITT");
        console.log(req.body)

        var response = ''
        response = await Usuarios.findAll({
            where: { email: req.body.email }
        });

        if (response.length === 0) {
            Usuarios.create({
                nombre: req.body.name,
                apellido: req.body.lastname,
                email: req.body.email,
                telefono: req.body.phoneNumber,
                direccion: req.body.address,
                ciudad: req.body.city,
                role: parseInt(req.body.role)
            }).then(user => {
                res.redirect("http://localhost:3000/admin");
            });
        } else {
            Usuarios.update({
                nombre: req.body.name,
                apellido: req.body.lastname,
                telefono: req.body.phoneNumber,
                direccion: req.body.address,
                ciudad: req.body.city,
                role: parseInt(req.body.role)
            }, {
                where: {
                    email: req.body.email
                }
            }).then(result => {
                res.redirect("http://localhost:3000/admin");
            });
        }        
    },

    async getUsers(req, res) {

        try {
            var users = ''

            users = await Conexiones.findAll();

            if (users.length === 0) {
                return null;
            }

            console.log('Los usuarios son:', users);

            res.json({users: users});           

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Ha ocurrido un error.'});
        }
    }
}