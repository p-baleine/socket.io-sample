
/**
 * Module dependencies.
 */

var express = require('express')
  , io = require('socket.io')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.broadcast.emit('new-message', { message: data.message });
    console.log(data);
  });
});

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
