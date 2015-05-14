'use strict';

var Compositor = require('famous/renderers/Compositor');
var UIManager = require('famous/renderers/UIManager');
var Engine = require('famous/engine/Engine');

// Boilerplate
new UIManager(new Worker('worker.bundle.js'), new Compositor(), new Engine());
