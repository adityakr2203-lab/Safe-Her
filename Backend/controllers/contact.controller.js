const Contact = require('../models/contact.model');

module.exports.addContact = async (req, res) => {

    try {

        const { name, relation, phone } = req.body;

        const contact = await Contact.create({
            user: req.user._id,
            name,
            relation,
            phone
        });

        res.status(201).json(contact);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



module.exports.getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find({
            user: req.user._id
        });

        res.status(200).json(contacts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



module.exports.deleteContact = async (req, res) => {

    try {

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Contact deleted'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};