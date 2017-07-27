var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Vacation   = require('./models/vacations.js');
var Comment    = require('./models/comments.js');

var app = express();


// Have to set the username and password before connection to the server works
var username = '';
var password = '';
// Connecting to the database servers on MongoDB Atlas
mongoose.connect('mongodb://' + username + ':' + password + '@cluster0-shard-00-00-cmlex.mongodb.net:27017,cluster0-shard-00-01-cmlex.mongodb.net:27017,cluster0-shard-00-02-cmlex.mongodb.net:27017/mallorca?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


// Code for seeding the database each time we start the server (will only be here during development)
var data = [
    {
        name: 'Cloud Rest',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Dope Rest',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Sick Rest',
        image: '/img/placeholder.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    }
];


Vacation.remove({}, function(err) {
  if (err) {
    console.log('deleted all vacations');
  } else {
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
  }
});






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
      res.render('index.ejs', {vacations: allVacations});
    }
  });
});


app.get('/about', function(req, res){
  res.render('about.ejs');
});


app.listen(1337, function() {
  console.log('Server is now listening');
});
