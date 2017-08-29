var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Vacation   = require('./models/vacations.js');
var Comment    = require('./models/comments.js');

var app = express();


// Setting up the ports. Using short circuiting to first check if there is a port stored in the environment variable (for Heroku), else it defaults to a localhost port on 1337
var port = process.env.PORT || 1337;


// Username and password variables to connect to the MongoDB Atlas database
// They are currently stored as Heroku environment variables, hence being references to process.env
username = process.env.mongoUsername;
password = process.env.mongoPass;

// Connecting to the database servers on MongoDB Atlas
mongoose.connect('mongodb://' + username + ':' + password + '@cluster0-shard-00-00-cmlex.mongodb.net:27017,cluster0-shard-00-01-cmlex.mongodb.net:27017,cluster0-shard-00-02-cmlex.mongodb.net:27017/mallorca?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


/*
// Code for seeding the database should we ever need to erase saved data and re-seed the database
var data = [
    {   name: 'Port de Sóller',
        image: '/img/tourImages/portDeSoller.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'

    },
    {
        name: 'Coves del Drac',
        image: '/img/tourImages/covesDelDrach.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Porto Cristo',
        image: '/img/tourImages/portoCristo.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    },
    {
        name: 'Església de Sant Bartomeu',
        image: '/img/tourImages/sollerCathedral.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod dolor quis metus mollis ultricies. Pellentesque porta, mauris sit amet ullamcorper tincidunt, lorem diam elementum libero, tempus rhoncus orci libero in ex. Etiam luctus ultrices neque eu consequat. Nullam condimentum vehicula sodales. Integer ullamcorper neque sed turpis mattis, eu porta lorem maximus. Vestibulum augue mauris, vehicula nec nisi nec, porta bibendum nibh.'
    }
];

Vacation.remove({}, function(err, removedResults) {
  if (err) {
    console.log(err);
  } else {
    console.log('removed vacations');

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


app.listen(port, function() {
  console.log('Server is now listening');
});
