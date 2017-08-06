var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Vacation   = require('./models/vacations.js');
var Comment    = require('./models/comments.js');

var app = express();


// Have to set the username and password before connection to the server works
var username = process.env.mongoUsername;
var password = process.env.mongoPass;
// Connecting to the database servers on MongoDB Atlas
mongoose.connect('mongodb://' + username + ':' + password + '@cluster0-shard-00-00-cmlex.mongodb.net:27017,cluster0-shard-00-01-cmlex.mongodb.net:27017,cluster0-shard-00-02-cmlex.mongodb.net:27017/mallorca?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

/*
// Code for seeding the database each time we start the server (will only be here during development)
var data = [
    {
        name: 'Cloud Rest 2',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Dope Rest 2',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Sick Rest 2',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    }
];


data.forEach(function(seed){
  Vacation.create(seed, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result.save();
      console.log('added in vacation')
    }
  });
});
*/




app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



// =========
// Routes
// =========
app.get('/', function(req, res){
  // We limit the query to 3 results since the first page displays only 3 results
  Vacation.find({}).limit(3).exec(function(err, allVacations) {
    if (err) {
      console.log(err);
    } else {
      res.render('landing.ejs', {vacations: allVacations});
    }
  });
});


app.get('/tours', function(req, res){
  Vacation.find({}, function(err, allVacations) {
    if (err) {
      console.log(err);
    } else {
      res.render('index.ejs', {vacations: allVacations});
    }
  });
});


app.get('/tours/:id', function(req, res){
  Vacation.findById(req.params.id, function(err, requestedPackage) {
    if (err) {
      console.log(err);
    } else {
      res.render('show.ejs', {package: requestedPackage});
    }
  });
});



// Setting up the ports to work wtih being deployed on Heroku
var port = process.env.PORT;

app.listen(port, function() {
  console.log('Server is now listening');
});
