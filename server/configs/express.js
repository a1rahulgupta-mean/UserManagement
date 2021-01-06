const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); //For cross domain error
const path = require('path');

module.exports = function () {
    const app = express();
    // create a write stream (in append mode)
  

    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    // Middleware
    app.use(express.json())
    // Enable All CORS Requests
    app.use(cors());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    require('../app/routes/UserRoutes')(app, express);


    return app;
};
