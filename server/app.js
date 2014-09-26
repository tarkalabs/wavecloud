var fs = require('fs'),
    path = require('path'),
    nconf = require('nconf'),
    express = require('express'),
    morgan = require('morgan'),
    errorHandler = require('errorhandler');

nconf.argv().env();
nconf.defaults({'NODE_ENV': 'development'});

var configFile = path.join('config', nconf.get('NODE_ENV')) + '.json';
if ( fs.existsSync(configFile) ) { nconf.file({file: configFile}); }

var app = express();
app.set('port', nconf.get('PORT') || nconf.get('http:port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
if (nconf.get('NODE_ENV') === 'development') {
  app.use(errorHandler());
}

require('./routes')(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port', app.get('port'));
});
