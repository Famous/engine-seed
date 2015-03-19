'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Sphere = require('./Sphere');
var Backdrop = require('./Plane');
var Light = require('./Light');

var ColorPalette = require('famous-utilities').ColorPalette;


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new Sphere(root.addChild());
new Backdrop(root.addChild());

/**
 * Add two lights (maximum of 4 lights, currently).
 * Get a random set of complimentary colors from the
 * color palette for each light
 */
var palette = new ColorPalette();
var colors = palette.getPalette();
for(var i = 0; i < 4; i++) {
    new Light(root.addChild(), colors[i]);
}

