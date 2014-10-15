var steam = require('steamAPI').configure('9F050CA7FAA4554B6EC95DBCDB2DECD4');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Trade = require('./models/trade');

mongoose.connect('mongodb://bonsai:bonsai2014@ds043329.mongolab.com:43329/bonsai')

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

var router = express.Router();

router.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
	res.setHeader("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

router.route('/trades')
	.get(function(req, res){

		var trade = new Trade();

		Trade.find(function(err,trade){

			if(err){
				res.send(err)
			}else{
				res.send(trade);
			}

		});

	});

router.get('/items/:steamId', function(req, res){

	steam.getPlayerItems({

		steamid: req.params.steamId

	}, function(err,result){

		res.send(result)

	});
});

router.route('/items')
	.get(function(req, res){
		console.log('niks');
	});

router.get('/', function(req, res){

	console.log('niks');

});


app.use('/api', router);

app.listen(3000);

console.log('listening on 3000');