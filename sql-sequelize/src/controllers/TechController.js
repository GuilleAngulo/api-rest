const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;
        //To make response cleaner, it only displays name (by attributes) and
        //does not send user_tech table entry (by passing through as empty atributes)
        const user = await User.findByPk(user_id, {
            include: { 
                association: 'techs', 
                attributes: ['name'],
                through: { 
                    attributes: [] } 
            }
        });

        return res.json(user.techs);
    },
    async show(req, res) {
        const { tech_id } = req.params;

        const tech = await Tech.findByPk(tech_id);

        if (!tech) {
            return res.status(400).json({ error: 'Tech not found'});
        }

        return res.json(tech);
    },
    
    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        //Sequelize creates this new methods as get, set ...
        await user.addTech(tech);

        console.log(`${tech.name} technology correctly attached to ${user.name}.`);
        return res.status(200).json(tech);
    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id, {
            include: {association: 'techs'}, 
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        let techAttached = false;
        
        user.techs.map(tech => {
            if (tech.name == name){
                techAttached = true;
            }
        });

        if (techAttached == false) {
            return res.status(400).json({ error: 'The tech is not attached to the user.'});
        }

        const tech = await Tech.findOne({ where: { name } });

        await user.removeTech(tech);

        console.log(`${tech.name} deleted for user ${user.name}`);
        return res.status(200).json({message: `Tech succesfully deleted`});
    },

    async update(req, res) {
        const { tech_id } = req.params;
        const { name } = req.body;

        const tech = await Tech.findByPk(tech_id);

        if (!tech) {
            return res.status(400).json({ error: 'Tech not found'});
        }

        await tech.update({
            name
        });

        console.log(`${tech.name} updated`);
        return res.json(tech);
    }
}