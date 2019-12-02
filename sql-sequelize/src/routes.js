const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.delete('/users/:user_id', UserController.delete);
routes.put('/users/:user_id', UserController.update);

routes.get('/addresses/:address_id', AddressController.show);
routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);
routes.delete('/users/:user_id/addresses/:address_id', AddressController.delete);
routes.put('/users/:user_id/addresses/:address_id', AddressController.update);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.get('/techs/:tech_id', TechController.show);
routes.delete('/users/:user_id/techs', TechController.delete);
routes.put('/techs/:tech_id', TechController.update);

routes.get('/report', ReportController.show);

module.exports = routes;