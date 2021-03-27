const express = require('express');
const routes = express.Router();

//request, response
server.get('/', (req, res) => {
     return res.sendFile(__dirname + "/views/index.html");
});

module.exports = routes;