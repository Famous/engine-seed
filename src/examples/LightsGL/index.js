'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Sphere = require('./Sphere');
var Plane = require('./Plane');
var Light = require('./Light');

var ColorPalette = require('famous-utilities').ColorPalette;


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new Sphere(root.addChild());
new Plane(root.addChild());

/**
 * Add two lights (maximum of 4 lights, currently):
 */
var palette = new ColorPalette();
palette.setRandomPalette();
var colors = palette.getPalette();
for(var i = 0; i < 4; i++) {
    new Light(root.addChild(), colors[i]);
}

