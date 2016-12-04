var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var userInfo = require('./modules/userInfo');
var mongoConnection = require('./modules/mongo-connection');
var privateData = require('./routes/private-data');
var users = require('./routes/users');

var portDecision = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/app/index.html'))
});

mongoConnection.connect();

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
app.use(decoder.token);
app.use(userInfo);

/* Whatever you do below this is protected by your authentication. */

app.use('/users', users)

// This is the route for your secretData. The request gets here after it has been authenticated.
app.use("/privateData", privateData);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
