const exp = require("express");
const config = require("./configs/configs")
const express = require("./configs/express");
const mongoose = require("./configs/mongoose");
const path = require("path");
const port  = config.serverPort;

global.appRoot = path.resolve(__dirname);

db =mongoose();
const app = express();

app.get("/",(req,res) => {res.send("api is working")});

app.use('/',exp.static(__dirname + "/"));




app.listen(port,() => console.log(`server running at ${port}`));

