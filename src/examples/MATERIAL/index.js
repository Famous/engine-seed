var Context = require('famous-core').Context;

//how to deform a mesh???
var Sun = require('./Sun');

//how to load a custom shader???
var backdoor = require('./backdoor');

//loading video
var video = require('./video');

var root = new Context('body');
new Sun(root.addChild());
