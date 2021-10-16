const { Usuarios } = require('../models/index');
const Sequelize = require('sequelize');

module.exports = {
    async getUsers(req, res) {
        console.log('req', req);

        try {
            var users = ''

            users = await Usuarios.findAll();

            if (response.length === 0) {
                return null;
            }

            console.log('El usuario ya existe.', users);

            res.json({users: users});           

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Ha ocurrido un error.'});
        }
    }
}