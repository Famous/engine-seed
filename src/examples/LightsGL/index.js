'use strict';

/**
 * Module dependencies
 */
var Context = require('famous-core').Context;
var Sphere = require('./Sphere');
var Plane = require('./Plane');
var Light = require('./Light');


/**
 * Add the models to the body.
 * It's better to add a single scene into the main root (e.g. body)
 */
var root = new Context('body');
new Sphere(root.addChild());
new Plane(root.addChild());

/**
 * Add two lights (maximum of 4 lights, currently):
 * One blue, spinning horizontally; One green, spinning vertically
 */
var lights = [
    {color: 'blue', direction: 'horizontal'},
    {color: 'purple', direction: 'vertical'}
];
for(var i = 0; i < lights.length; i++) {
    new Light(root.addChild(), lights[i].color, lights[i].direction);
}

