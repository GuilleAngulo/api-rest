const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        // Find all users with email ending with @gmail.com
        //Of them find users living in the street Rua Fradique Coutinho
        //Of them find users using techs starting with React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: { 
                email: {
                    [Op.iLike]: '%@gmail.com'
                }
             },
             include: [
                 { 
                     association: 'addresses', 
                     where: { 
                        street: 'Rua Fradique Coutinho'
                    } 
                }, 
                { 
                    association: 'techs', 
                    require: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        } 
                     }
                },
             ]
        })

        return res.json(users);
    }
}