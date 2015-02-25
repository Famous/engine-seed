'use strict';

var Clock = require('famous-core').Clock;
var Box = require('../../fixtures/Box');
var Scene = require('../../fixtures/Scene');
var OriginSpinner = require('./OriginSpinner');

var scene = new Scene();

var columns = 50;
var rows = 6;

for (var r = 0; r < columns; r++) {
    for (var c = 0; c < rows; c++) {
        var x = r/columns;
        var y = c/rows;
        scene.addView(new OriginSpinner(new Box(x.toPrecision(2) + ' ' + y.toPrecision(2)), x, y));
    }
}

var famous = new Clock();

famous.publish(scene, 'body');

module.exports = famous;
