var Context = require('famous-core').Context;

//how to deform a mesh???
var deformation = require('./meshDeformation');

//how to load a custom shader???
var backdoor = require('./backdoor');

//loading video 
var video = require('./video');

var root = new Context('body');
new video(root.addChild());
