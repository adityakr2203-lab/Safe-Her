const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const contactController = require('../controllers/contact.controller');



router.post(
    '/add',
    authMiddleware.authUser,
    contactController.addContact
);



router.get(
    '/',
    authMiddleware.authUser,
    contactController.getContacts
);



router.delete(
    '/:id',
    authMiddleware.authUser,
    contactController.deleteContact
);

module.exports = router;