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
var bWorker = browserify(path.resolve('./src/worker.js'), watchify.args);
var wWorker = watchify(bWorker);

var bytes, time;
wIndex.on('bytes', function (b) { bytes = b });
wIndex.on('time', function (t) { time = t });
wWorker.on('bytes', function (b) { bytes = b });
wWorker.on('time', function (t) { time = t });

var update = function(bundle, filePath) {
    var didError = false;
    var writeStream = fs.createWriteStream(path.resolve(filePath));

    bundle.on('error', function (err) {
        console.error(String(err));
        didError = true;
        writeStream.end();
    });

    bundle.pipe(writeStream);

     writeStream.on('error', function (err) {
        console.error(err);
    });

    writeStream.on('close', function () {
        if (!didError) {
            console.error(bytes + ' bytes written to ' + path.resolve(filePath)
                + ' (' + (time / 1000).toFixed(2) + ' seconds)'
            );
        }
    });
}

update(wIndex.bundle(), './public/index.bundle.js');
update(wWorker.bundle(), './public/worker.bundle.js');

wIndex.on('update', function (ids) {
    update(wIndex.bundle(), './public/index.bundle.js');
});


wWorker.on('update', function (ids) {
    update(wWorker.bundle(), './public/worker.bundle.js');
});

var serve = serveStatic(path.normalize('./public/'));

var server = http.createServer(function(req, res){
  serve(req, res, finalhandler(req, res))
});

server.listen(1618, function() {console.log('serving %s on port %d', path.resolve('./public/'), 1618);});
