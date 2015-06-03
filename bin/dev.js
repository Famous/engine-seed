#! /usr/local/bin/node

'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var http = require('http');
var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var b = browserify(path.resolve('./src/index.js'), watchify.args);
var w = watchify(b);

var update = function(bundle) {
    var writeStream = fs.createWriteStream(path.resolve('./public/bundle.js'));
    bundle.pipe(writeStream);
}

update(w.bundle());

w.on('update', function (ids) {
    update(w.bundle());
});

var serve = serveStatic(path.normalize('./public/'));

var server = http.createServer(function(req, res){
  serve(req, res, finalhandler(req, res))
});

server.listen(1618, function() {console.log('serving %s on port %d', path.resolve('./public/'), 1618);});
