const User = require('../models/User');

module.exports = {
    
    async index(req, res) {
        const users = await User.findAll();

        return res.status(200).json(users);
    },
    async show (req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        return res.status(200).json(user);
    },
    async store(req, res) {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        console.log(`New user ${user.name}, with id ${user.id} has been created.`);

        return res.status(200).json(user);
    },

    async delete(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        await User.destroy({
            where: { id: user_id }
        });

        console.log(`User ${user.name}, with id ${user.id} has been removed.`);

        return res.status(200).json({message: `User succesfully deleted`});

    },
    async update(req, res) {
        const { user_id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(user_id);
        
        if (!user) {
            return res.status(400).json({ error: 'User not found.'});
        }

        const [ updated ] = await User.update({ name, email },
        {
            where: { id: user_id}
        });

        if (!updated) {
            return res.status(502).json({ error: 'Error updating the user.'});
        }

        const updatedUser = await User.findOne({ where: { id: user_id } });
        console.log(`User ${updatedUser.name}, with id ${updatedUser.id} correctly updated.`);
        return res.status(200).json(updatedUser);
    }
}