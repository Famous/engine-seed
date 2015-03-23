var Context = require('famous-core').Context;

var vis = require('./visualizer');

//how to deform a mesh???
var Sun = require('./Sun');

//loading video
var video = require('./video');

//interwebgl blending
var blending = require('./blending');

var root = new Context('body');
var test = new blending(root.addChild(), vis);
//vis(root.addChild(), test);
