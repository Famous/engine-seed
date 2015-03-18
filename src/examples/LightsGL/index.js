'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Sphere = require('./Sphere');
var Light = require('./Light');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new Sphere(root.addChild());

/**
 * Add two lights (maximum of 4 lights, currently):
 * One blue, spinning horizontally; One green, spinning vertically
 */
var colors = ['blue', 'green'];
var direction = ['horizontal', 'vertical'];
for(var i = 0; i < 2; i++) {
    new Light(root.addChild(), colors[i], direction[i]);
}

