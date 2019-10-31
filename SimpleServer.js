/**
 * Simple web server based on
 * http://expressjs.com/en/starter/hello-world.html
 *
 * Prerequisites:
 *  - Node
 *  - Express (npm install express)
 *
 * To use, save as a file (e.g. SimpleServer.js) and run with:
 *  node SimpleServer.js /PATH/TO/WWW/
 */
const sitePath = process.argv[2] || ".";
const port = 4242;

// Libraries
const express = require('express');
const app = express();

// Request logging
app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));
app.listen(port, function() {
    console.log("Server running at: http://localhost:" + port)
});