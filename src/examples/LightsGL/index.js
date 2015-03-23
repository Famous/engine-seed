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
    var color = Color.getRandomColor();
    new Light(root.addChild(), color);
    colors.push(color);
}

/**
 * Animate the light color every two seconds
 * to another set of random color values.
 * Color.getRandomColor returns a new Color instance with random values
 * but you can also use Color.getRandomRGB to return just a set of random
 * RGB values -- both will work here, but Color.getRandomColor allows
 * to reference the constructor and modify it, as we did above.
 */
setInterval(function() {
    colors.forEach(function(color) {
        var newColor = Color.getRandomRGB();
        // var newColor = Color.getRandomColor();
        color.changeTo(newColor, { duration: 1000 });
    });
}, 2000);

