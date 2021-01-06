
const config = require('./configs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function () {
    const db = mongoose.connect(config.db, config.mongoDBOptions).then(
        () => console.log('MongoDB connected'),
        (err) => { console.log('MongoDB connection error', err) }
    );
    return db;
};
