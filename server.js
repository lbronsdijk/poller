var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var config     = require('./config.js');
var app        = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// Global error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
