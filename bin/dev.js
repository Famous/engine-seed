#! /usr/local/bin/node

'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var http = require('http');
var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var bIndex = browserify(path.resolve('./src/index.js'), watchify.args);
var wIndex = watchify(bIndex);


var updateIndex = function(bundle) {
    var writeStream = fs.createWriteStream(path.resolve('./public/index.bundle.js'));
    bundle.pipe(writeStream);
}

updateIndex(wIndex.bundle());

wIndex.on('update', function (ids) {
    updateIndex(wIndex.bundle());
});

var bWorker = browserify(path.resolve('./src/worker.js'), watchify.args);
var wWorker = watchify(bWorker);

var updateWorker = function(bundle) {
    var writeStream = fs.createWriteStream(path.resolve('./public/worker.bundle.js'));
    bundle.pipe(writeStream);
}

updateWorker(wWorker.bundle());

wWorker.on('update', function (ids) {
    updateWorker(wWorker.bundle());
});

var serve = serveStatic(path.normalize('./public/'));

var server = http.createServer(function(req, res){
  serve(req, res, finalhandler(req, res))
});

server.listen(1618, function() {console.log('serving %s on port %d', path.resolve('./public/'), 1618);});
