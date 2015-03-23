'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Color = require('famous-utilities').Color;
var Sphere = require('./Sphere');
var Backdrop = require('./Plane');
var Light = require('./Light');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new Sphere(root.addChild());
new Backdrop(root.addChild());

/**
 * Add two lights (maximum of 4 lights, currently).
 * Get a random color and save the reference to the constructor
 * to be able to change it later
 */
var colors = [];
for(var i = 0; i < 4; i++) {
    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    var color = new Color(r, g, b);
    colors.push(color);
    new Light(root.addChild(), color);
}

/**
 * Animate the light color every two seconds
 * to another set of random color values.
 */
setInterval(function() {
    colors.forEach(function(color) {
        var r = Math.random() * 255;
        var g = Math.random() * 255;
        var b = Math.random() * 255;
        color.changeTo(r, g, b, { duration: 1000 });
    });
}, 2000);

