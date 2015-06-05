#!/usr/bin/env node

'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var http = require('http');
var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var chalk = require('chalk');

var b = browserify(path.resolve('./src/index.js'), watchify.args);
var w = watchify(b);

var bytes, time;
w.on('bytes', function (b) { bytes = b });
w.on('time', function (t) { time = t });

var update = function(bundle) {
    var didError = false;
    var writeStream = fs.createWriteStream(path.resolve('./public/bundle.js'));

    bundle.on('error', function (err) {
        console.error(String(chalk.red(err)));
        didError = true;
        writeStream.end();
    });

    bundle.pipe(writeStream);

    writeStream.on('error', function (err) {
        console.error(chalk.red(err));
    });

    writeStream.on('close', function () {
        if (!didError) {
            console.error(chalk.cyan(bytes) + chalk.grey(' bytes written to ') + chalk.cyan(path.resolve('./public/bundle.js'))
                + ' (' + (time / 1000).toFixed(2) + ' seconds)'
            );
        }
    });
}

update(w.bundle());

w.on('update', function (ids) {
    update(w.bundle());
});

var serve = serveStatic(path.normalize('./public/'));

var server = http.createServer(function(req, res){
  serve(req, res, finalhandler(req, res))
});

server.listen(1618, function() {console.log(chalk.grey('serving ') + chalk.blue(path.resolve('./public/')) + chalk.grey(' on port ') + chalk.blue('1618'));});
