'use strict';

var Compositor = require('famous/renderers/Compositor');
var UIManager = require('famous/renderers/UIManager');
var RequestAnimationFrameLoop = require('famous/render-loops/RequestAnimationFrameLoop');

// Boilerplate
new UIManager(new Worker('worker.bundle.js'), new Compositor(), new RequestAnimationFrameLoop());
