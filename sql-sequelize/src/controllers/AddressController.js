const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found.'});
        }

        if (!user.addresses) {
            return res.status(400).json({ error: 'No addresses found for the user.'});
        }

        return res.status(200).json(user.addresses);
    },

    async show(req, res) {
        const { address_id } = req.params;

        const address = await Address.findByPk(address_id, {
            include: { association: 'user'}
        });

        if (!address) {
            return res.status(400).json({ error: 'Address not found'});
        }

        return res.status(200).json(address);
    },
    
    async store(req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        });
        console.log(`Address with id ${address.id} correctly created.`);
        return res.status(200).json(address);
    },
    
    async delete(req, res) {
        const { address_id, user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses'}
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        let owner = false;

        user.addresses.map(address => {
            if (address.id == address_id)
                owner = true;
        });

        if (!owner)
            return res.status(400).json({ error: 'The address doesn´t belong to the user.'});

        await Address.destroy({
            where: { id: address_id }
        });

        console.log(`Address with id ${updatedAddress.id} correctly removed.`);
        return res.status(200).json({message: `Address succesfully deleted`});
    },

    async update(req, res) {
        const { address_id, user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses'}
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }

        let owner = false;

        user.addresses.map(address => {
            if (address.id == address_id)
                owner = true;
        });

        if (!owner)
            return res.status(400).json({ error: 'The address doesn´t belong to the user.'});

        const [ updated ] = await Address.update({ 
            zipcode,
            street,
            number, 
        },
        {
            where: { id: address_id}
        });

        if (!updated) {
            return res.status(502).json({ error: 'Error updating the address.'});
        }
        const updatedAddress = await Address.findOne({ where: { id: address_id } });
        console.log(`Address with id ${updatedAddress.id} correctly updated.`);
        return res.status(200).json(updatedAddress);


    }
}