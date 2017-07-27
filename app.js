var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Vacation   = require('./models/vacations.js');
var Comment    = require('./models/comments.js');

var app = express();

/*
// Have to set the username and password before connection to the server works
var username = '';
var password = '';
// Connecting to the database servers on MongoDB Atlas
mongoose.connect('mongodb://' + username + ':' + password + '@cluster0-shard-00-00-cmlex.mongodb.net:27017,cluster0-shard-00-01-cmlex.mongodb.net:27017,cluster0-shard-00-02-cmlex.mongodb.net:27017/mallorca?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
*/


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');




// =========
// Routes
// =========
app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/about', function(req, res){
  res.render('about.ejs');
});


app.listen(1337, function() {
  console.log('Server is now listening');
});
