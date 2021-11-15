const { Conexiones, Usuarios } = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async create(req, res) {
        console.log('req', req);

        try {
            const response = await Conexiones.findAll({
                where: { email: req.body.email }
            });

            console.log(response);

            if (response.length === 0) {
                let userCreated = await Conexiones.create(
                    {
                        firstName: req.body.name,
                        lastName: req.body.lastname,
                        email: req.body.email,
                        role: 0
                    }
                );
                res.json(userCreated);
                return;
            }
            
            console.log('El usuario ya existe.', response[0].dataValues);

            const response_role = await Usuarios.findAll({
                where: { email: req.body.email }
            });

            res.json({user: response[0].dataValues, role: response_role[0].dataValues.role});  
            return;         

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Ha ocurrido un error.'});
        }
    },

    async edit(req, res) {
        console.log("EDITT");
        console.log(req.body)

        const response = await Usuarios.findAll({
            where: { email: req.body.email }
        });

        const info = {
            nombre: req.body.name,
            apellido: req.body.lastname,
            email: req.body.email,
            telefono: req.body.phoneNumber,
            role: parseInt(req.body.role)
        };

        if (response.length === 0) {
            Usuarios.create(info).then(user => {
                res.redirect("http://localhost:3000/admin");
            });
        } else {
            Conexiones.update({
                role: req.body.role
            }, {
                where: {
                    email: req.body.email
                }
            }).then(result => {
                console.log('Conexión updated.');
            });
            Usuarios.update(info, {
                where: {
                    email: req.body.email
                }
            }).then(result => {
                console.log('Usuario updated.');
                res.redirect("http://localhost:3000/admin");
            });
        }        
    },

    async getUsers(req, res) {

        try {
            var users = await Conexiones.findAll();

            if (users.length === 0) {
                return null;
            }

            console.log('Los usuarios son:', users);

            res.json({users: users});           

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Ha ocurrido un error.'});
        }
    },

    async getVendedores(req, res) {

        try {
            var users = await Usuarios.findAll({
                where: {
                    role: 1
                }
            });

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