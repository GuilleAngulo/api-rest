const mongoose = require('mongoose');
const { username, password, host, port, database } = require('../config/database'); 

mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});


mongoose.Promise = global.Promise;

module.exports = mongoose;