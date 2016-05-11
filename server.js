//add our dependencies
var express = require('express');
var requestify = require('requestify');

//start our app
var app = express();

app.configure(function(){
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
});

app.set('view engine', 'ejs'); // set up ejs for templating

//main endpoint, returns our ejs page
app.get('/', function(req, res) {

	res.render('index.ejs'); // load the index.ejs file

});

//create an endpoint called weather that connects to the yahoo weather api
app.get('/weather', function (req, res) {
	requestify.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", {
	})
	.then(function(response) {
			// Get the response body
			response.getBody();
			// Get the raw response body
			response.body;
			// parse the data to make it usable
			var data = JSON.parse(response.body);
			//return only relevant subdata
			var data = data.query.results.channel;
			// send the json to user upon request
			res.json(data);
	});
})


app.listen(9000); //listen on port 9000

console.log('server started!');
